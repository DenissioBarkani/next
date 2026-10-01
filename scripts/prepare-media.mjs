import { access, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_ROOT = path.join(ROOT, "media-source", "projects");
const OUTPUT_ROOT = path.join(ROOT, "public", "projects");
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".m4v", ".webm"]);
const args = process.argv.slice(2);
const force = args.includes("--force");
const requestedSlugs = args.filter((argument) => argument !== "--force");

function run(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { stdio: ["ignore", "inherit", "pipe"] });
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += chunk;
      process.stderr.write(chunk);
    });
    child.on("error", (error) => reject(error));
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} завершился с кодом ${code}. ${stderr.trim()}`));
    });
  });
}

function capture(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, { stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => reject(error));
    child.on("close", (code) => {
      if (code === 0) resolve(stdout);
      else reject(new Error(`${command} завершился с кодом ${code}. ${stderr.trim()}`));
    });
  });
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function needsUpdate(inputPath, outputPaths) {
  if (force || !(await Promise.all(outputPaths.map(exists))).every(Boolean)) return true;
  const inputStats = await stat(inputPath);
  const outputStats = await Promise.all(outputPaths.map((outputPath) => stat(outputPath)));
  return outputStats.some((output) => output.mtimeMs < inputStats.mtimeMs);
}

async function findFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findFiles(entryPath);
    return entry.isFile() ? [entryPath] : [];
  }));
  return nested.flat();
}

async function probeVideo(filePath) {
  const result = await capture("ffprobe", [
    "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,duration", "-of", "json", filePath,
  ]);
  const stream = JSON.parse(result).streams?.[0];
  if (!stream?.width || !stream?.height) throw new Error(`Не удалось определить размеры: ${path.relative(ROOT, filePath)}`);
  return {
    width: Number(stream.width),
    height: Number(stream.height),
    ...(stream.duration ? { duration: Number(stream.duration) } : {}),
  };
}

function publicPath(filePath) {
  return `/${path.relative(path.join(ROOT, "public"), filePath).split(path.sep).join("/")}`;
}

function outputBase(sourcePath, projectSourcePath, projectOutputPath) {
  const relative = path.relative(projectSourcePath, sourcePath);
  return path.join(projectOutputPath, relative.slice(0, -path.extname(relative).length));
}

function assertNoOutputCollisions(files, projectSourcePath, projectOutputPath) {
  const outputs = new Map();
  for (const sourcePath of files) {
    const extension = path.extname(sourcePath).toLowerCase();
    const base = outputBase(sourcePath, projectSourcePath, projectOutputPath);
    const targets = IMAGE_EXTENSIONS.has(extension) ? [`${base}.webp`] : [`${base}.mp4`, `${base}-poster.webp`];
    for (const target of targets) {
      const current = outputs.get(target);
      if (current) throw new Error(`Два исходника создадут один файл: ${path.relative(ROOT, current)} и ${path.relative(ROOT, sourcePath)}`);
      outputs.set(target, sourcePath);
    }
  }
}

async function prepareImage(sourcePath, targetPath) {
  if (!(await needsUpdate(sourcePath, [targetPath]))) return false;
  await mkdir(path.dirname(targetPath), { recursive: true });
  await sharp(sourcePath)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(targetPath);
  return true;
}

async function prepareVideo(sourcePath, targetPath, posterPath) {
  if (!(await needsUpdate(sourcePath, [targetPath, posterPath]))) return false;
  await mkdir(path.dirname(targetPath), { recursive: true });
  await run("ffmpeg", [
    "-y", "-i", sourcePath, "-map_metadata", "-1",
    "-vf", "scale='min(1920,iw)':-2:flags=lanczos,fps=30",
    "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", targetPath,
  ]);
  await run("ffmpeg", [
    "-y", "-ss", "0.25", "-i", targetPath, "-frames:v", "1",
    "-vf", "scale='min(1600,iw)':-2:flags=lanczos", "-c:v", "libwebp", "-q:v", "80", posterPath,
  ]);
  return true;
}

async function verifyVideoTools() {
  try {
    await Promise.all([capture("ffmpeg", ["-version"]), capture("ffprobe", ["-version"])]);
  } catch {
    throw new Error("Не найден FFmpeg. Он нужен только для видео: установите его и убедитесь, что команды ffmpeg и ffprobe доступны в PATH. Подробности: docs/media.md");
  }
}

async function getProjectSlugs() {
  if (!(await exists(SOURCE_ROOT))) return [];
  const entries = await readdir(SOURCE_ROOT, { withFileTypes: true });
  const slugs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  if (requestedSlugs.length === 0) return slugs;
  const unknown = requestedSlugs.filter((slug) => !slugs.includes(slug));
  if (unknown.length > 0) throw new Error(`Нет исходников для проекта: ${unknown.join(", ")}`);
  return requestedSlugs;
}

async function prepareProject(slug) {
  const projectSourcePath = path.join(SOURCE_ROOT, slug);
  const projectOutputPath = path.join(OUTPUT_ROOT, slug);
  const allFiles = await findFiles(projectSourcePath);
  const files = allFiles.filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension);
  });
  const unsupported = allFiles.filter((filePath) => !files.includes(filePath));
  if (unsupported.length > 0) console.warn(`Пропущены неподдерживаемые файлы в ${slug}: ${unsupported.map((filePath) => path.basename(filePath)).join(", ")}`);
  if (files.length === 0) {
    console.warn(`В ${slug} нет поддерживаемых изображений или видео.`);
    return;
  }

  assertNoOutputCollisions(files, projectSourcePath, projectOutputPath);
  if (files.some((filePath) => VIDEO_EXTENSIONS.has(path.extname(filePath).toLowerCase()))) await verifyVideoTools();
  const manifest = [];
  let changed = 0;
  for (const sourcePath of files) {
    const extension = path.extname(sourcePath).toLowerCase();
    const base = outputBase(sourcePath, projectSourcePath, projectOutputPath);
    if (IMAGE_EXTENSIONS.has(extension)) {
      const targetPath = `${base}.webp`;
      if (await prepareImage(sourcePath, targetPath)) changed += 1;
      const metadata = await sharp(targetPath).metadata();
      if (!metadata.width || !metadata.height) throw new Error(`Не удалось определить размеры: ${path.relative(ROOT, targetPath)}`);
      manifest.push({ type: "image", src: publicPath(targetPath), width: metadata.width, height: metadata.height });
    } else {
      const targetPath = `${base}.mp4`;
      const posterPath = `${base}-poster.webp`;
      if (await prepareVideo(sourcePath, targetPath, posterPath)) changed += 1;
      manifest.push({ type: "video", src: publicPath(targetPath), poster: publicPath(posterPath), ...(await probeVideo(targetPath)) });
    }
  }

  await writeFile(path.join(projectSourcePath, "media-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`${slug}: готово, обновлено файлов: ${changed}. Черновик данных: media-source/projects/${slug}/media-manifest.json`);
}

async function main() {
  const slugs = await getProjectSlugs();
  if (slugs.length === 0) {
    console.log("Создайте папку media-source/projects/<slug>/, положите в неё исходники и повторите команду.");
    return;
  }
  for (const slug of slugs) await prepareProject(slug);
}

main().catch((error) => {
  console.error(`\nОшибка подготовки медиа: ${error.message}`);
  process.exitCode = 1;
});
