import { GraduationCap } from "lucide-react";
import type { homePage } from "@/content/pages";

export function EducationOverview({ data }: { readonly data: typeof homePage.education }) {
  return (
    <section id="about" className="section shell education-section">
      <div className="education-heading">
        <p className="eyebrow">{data.eyebrow}</p>
        <h2>
          {data.title}
          <br />
          <span className="blue">{data.highlightedTitle}</span>
        </h2>
        <p>
          {data.summary.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <a className="text-link" href={data.link} target="_blank" rel="noreferrer">
          {data.linkLabel} <GraduationCap size={18} />
        </a>
      </div>
      <div className="education-details">
        <p className="education-lead">{data.lead}</p>
        <p>{data.description}</p>
        <div className="education-cells">
          {data.cells.map((cell) => (
            <div key={cell.number}>
              <span>{cell.number}</span>
              <h3>{cell.title}</h3>
              <p>{cell.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
