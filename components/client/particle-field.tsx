"use client";

import { useEffect, useRef } from "react";

type Rgb = readonly [number, number, number];
type Particle = { x: number; y: number; vx: number; vy: number; z: number; phase: number };
type PointerState = { x: number; y: number; strength: number };
type Ripple = { x: number; y: number; age: number };
type Signal = { a: number; b: number; t: number };

const colors = {
  node: [107, 130, 205],
  link: [76, 91, 255],
  signal: [151, 94, 255],
} as const satisfies Record<string, Rgb>;

const baseSpeed = 0.22;
const pointerRadius = 220;
const rippleLifetime = 90;

const rgb = ([red, green, blue]: Rgb) => `rgb(${red}, ${green}, ${blue})`;
const rgba = ([red, green, blue]: Rgb, alpha: number) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`;

function blend(from: Rgb, to: Rgb, amount: number): Rgb {
  const t = Math.max(0, Math.min(1, amount));
  return [
    Math.round(from[0] + (to[0] - from[0]) * t),
    Math.round(from[1] + (to[1] - from[1]) * t),
    Math.round(from[2] + (to[2] - from[2]) * t),
  ];
}

function countFor(width: number, height: number) {
  return Math.min(170, Math.max(28, Math.round((width * height) / 9000)));
}

function linkDistance(width: number) {
  return width < 640 ? 115 : 160;
}

function makeParticle(width: number, height: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const z = 0.25 + Math.random() * 0.75;
  const speed = baseSpeed * (0.4 + z);
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    z,
    phase: Math.random() * Math.PI * 2,
  };
}

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let ripples: Ripple[] = [];
    let signals: Signal[] = [];
    let pointer: PointerState | null = null;
    let targetPointerStrength = 0;
    let parallaxX = 0;
    let parallaxY = 0;
    let elapsed = 0;
    let lastFrame = 0;
    let animationId = 0;
    let positionsX = new Float32Array();
    let positionsY = new Float32Array();

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const scrollFade = 1 - 0.45 * Math.min(1, window.scrollY / Math.max(1, height));
      const maxDistance = linkDistance(width);
      const activeEdges: number[] = [];

      particles.forEach((particle, index) => {
        positionsX[index] = particle.x - parallaxX * particle.z;
        positionsY[index] = particle.y - parallaxY * particle.z;
      });

      context.lineWidth = 1;
      context.strokeStyle = rgb(colors.link);
      for (let a = 0; a < particles.length; a += 1) {
        for (let b = a + 1; b < particles.length; b += 1) {
          const dx = positionsX[a] - positionsX[b];
          const dy = positionsY[a] - positionsY[b];
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared > maxDistance * maxDistance) continue;
          const closeness = 1 - Math.sqrt(distanceSquared) / maxDistance;
          context.globalAlpha =
            closeness * 0.7 * Math.min(particles[a].z, particles[b].z) * scrollFade;
          context.beginPath();
          context.moveTo(positionsX[a], positionsY[a]);
          context.lineTo(positionsX[b], positionsY[b]);
          context.stroke();
          if (closeness > 0.3) activeEdges.push(a, b);
        }
      }

      const strength = pointer?.strength ?? 0;
      const activePointer = pointer;
      if (activePointer && strength > 0.01) {
        const glow = context.createRadialGradient(
          activePointer.x,
          activePointer.y,
          0,
          activePointer.x,
          activePointer.y,
          308,
        );
        glow.addColorStop(0, rgba(colors.link, 0.16 * strength * scrollFade));
        glow.addColorStop(1, rgba(colors.link, 0));
        context.globalAlpha = 1;
        context.fillStyle = glow;
        context.fillRect(activePointer.x - 308, activePointer.y - 308, 616, 616);
        context.strokeStyle = rgb(colors.signal);
        particles.forEach((_, index) => {
          const distance = Math.hypot(
            positionsX[index] - activePointer.x,
            positionsY[index] - activePointer.y,
          );
          if (distance > pointerRadius) return;
          context.globalAlpha = (1 - distance / pointerRadius) * 0.8 * strength * scrollFade;
          context.beginPath();
          context.moveTo(positionsX[index], positionsY[index]);
          context.lineTo(activePointer.x, activePointer.y);
          context.stroke();
        });
      }

      particles.forEach((particle, index) => {
        const influence =
          pointer && strength > 0.01
            ? Math.max(
                0,
                1 -
                  Math.hypot(positionsX[index] - pointer.x, positionsY[index] - pointer.y) /
                    pointerRadius,
              ) * strength
            : 0;
        const radius = 0.8 + particle.z * 1.7 + influence * 1.8;
        const halo = Math.max(influence, (particle.z - 0.8) * 1.5);
        if (halo > 0.05) {
          context.globalAlpha = halo * 0.22 * scrollFade;
          context.fillStyle = rgb(colors.link);
          context.beginPath();
          context.arc(positionsX[index], positionsY[index], radius * 3.2, 0, Math.PI * 2);
          context.fill();
        }
        context.globalAlpha = Math.min(1, 0.35 + particle.z * 0.6 + influence * 0.5) * scrollFade;
        context.fillStyle = rgb(blend(colors.node, colors.link, influence));
        context.beginPath();
        context.arc(positionsX[index], positionsY[index], radius, 0, Math.PI * 2);
        context.fill();
      });

      if (animationId && activeEdges.length && signals.length < 14 && Math.random() < 0.06) {
        const edge = Math.floor(Math.random() * (activeEdges.length / 2)) * 2;
        const [a, b] =
          Math.random() < 0.5
            ? [activeEdges[edge], activeEdges[edge + 1]]
            : [activeEdges[edge + 1], activeEdges[edge]];
        signals.push({ a, b, t: 0 });
      }

      context.fillStyle = rgb(colors.signal);
      for (let index = signals.length - 1; index >= 0; index -= 1) {
        const signal = signals[index];
        if (
          signal.a >= particles.length ||
          signal.b >= particles.length ||
          Math.hypot(
            positionsX[signal.a] - positionsX[signal.b],
            positionsY[signal.a] - positionsY[signal.b],
          ) > maxDistance
        ) {
          signals.splice(index, 1);
          continue;
        }
        const x = positionsX[signal.a] + (positionsX[signal.b] - positionsX[signal.a]) * signal.t;
        const y = positionsY[signal.a] + (positionsY[signal.b] - positionsY[signal.a]) * signal.t;
        const opacity = Math.sin(signal.t * Math.PI);
        context.globalAlpha = 0.18 * opacity * scrollFade;
        context.beginPath();
        context.arc(x, y, 6, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 0.95 * opacity * scrollFade;
        context.beginPath();
        context.arc(x, y, 1.6, 0, Math.PI * 2);
        context.fill();
      }

      context.lineWidth = 1.2;
      context.strokeStyle = rgb(colors.link);
      ripples.forEach((ripple) => {
        context.globalAlpha = (1 - ripple.age / rippleLifetime) ** 2 * 0.5 * scrollFade;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.age * 9, 0, Math.PI * 2);
        context.stroke();
      });
      context.globalAlpha = 1;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const requestedCount = countFor(width, height);
      particles = particles.slice(0, requestedCount);
      while (particles.length < requestedCount) particles.push(makeParticle(width, height));
      positionsX = new Float32Array(particles.length);
      positionsY = new Float32Array(particles.length);
      signals = [];
      draw();
    };

    const animate = (time: number) => {
      const delta = Math.min(time - lastFrame, 50) / (1000 / 60);
      lastFrame = time;
      elapsed += delta;
      if (pointer) {
        pointer.strength += (targetPointerStrength - pointer.strength) * Math.min(1, 0.08 * delta);
        if (targetPointerStrength === 0 && pointer.strength < 0.01) pointer = null;
      }
      const targetX = pointer ? (pointer.x - width / 2) * 0.035 * pointer.strength : 0;
      const targetY = pointer ? (pointer.y - height / 2) * 0.035 * pointer.strength : 0;
      parallaxX += (targetX - parallaxX) * Math.min(1, 0.05 * delta);
      parallaxY += (targetY - parallaxY) * Math.min(1, 0.05 * delta);
      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        ripples[index].age += delta;
        if (ripples[index].age > rippleLifetime) ripples.splice(index, 1);
      }
      signals.forEach((signal) => {
        signal.t += delta / 70;
      });
      signals = signals.filter((signal) => signal.t < 1);

      const damping = 0.96 ** delta;
      particles.forEach((particle) => {
        const drift = 0.004 * delta;
        particle.vx += Math.cos(elapsed * 0.01 + particle.phase) * drift;
        particle.vy += Math.sin(elapsed * 0.013 + particle.phase * 1.3) * drift;
        if (pointer && pointer.strength > 0) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 0.001 && distance < pointerRadius) {
            const force =
              (1 - distance / pointerRadius) ** 2 * 0.35 * pointer.strength * particle.z * delta;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }
        ripples.forEach((ripple) => {
          const dx = particle.x - ripple.x;
          const dy = particle.y - ripple.y;
          const distance = Math.hypot(dx, dy);
          const difference = Math.abs(distance - ripple.age * 9);
          if (distance > 0.001 && difference < 40) {
            const force = (1 - difference / 40) * (1 - ripple.age / rippleLifetime) * 0.6 * delta;
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        });
        const maxSpeed = baseSpeed * (0.4 + particle.z);
        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > maxSpeed) {
          const overflow = (speed - maxSpeed) * (1 - damping);
          particle.vx -= (particle.vx / speed) * overflow;
          particle.vy -= (particle.vy / speed) * overflow;
        } else if (speed > 0.0001 && speed < maxSpeed * 0.5) {
          particle.vx *= 1.02;
          particle.vy *= 1.02;
        }
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        if (particle.x < -40) particle.x = width + 40;
        else if (particle.x > width + 40) particle.x = -40;
        if (particle.y < -40) particle.y = height + 40;
        else if (particle.y > height + 40) particle.y = -40;
      });
      draw();
      animationId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (animationId || reducedMotion.matches || document.hidden) return;
      lastFrame = performance.now();
      animationId = window.requestAnimationFrame(animate);
    };
    const stop = () => {
      if (!animationId) return;
      window.cancelAnimationFrame(animationId);
      animationId = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (!animationId) return;
      pointer = pointer
        ? { ...pointer, x: event.clientX, y: event.clientY }
        : { x: event.clientX, y: event.clientY, strength: 0 };
      targetPointerStrength = 1;
    };
    const onEnd = (event: PointerEvent) => {
      if (
        (event.type === "pointerout" && event.relatedTarget) ||
        (event.type === "pointerup" && event.pointerType === "mouse")
      )
        return;
      targetPointerStrength = 0;
    };
    const onDown = (event: PointerEvent) => {
      if (!animationId || event.button !== 0) return;
      if (ripples.length >= 4) ripples.shift();
      ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        pointer = null;
        ripples = [];
        signals = [];
        parallaxX = 0;
        parallaxY = 0;
        draw();
      } else start();
    };

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onEnd, { passive: true });
    window.addEventListener("pointercancel", onEnd, { passive: true });
    document.addEventListener("pointerout", onEnd, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
      document.removeEventListener("pointerout", onEnd);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
