import { GraduationCap } from "lucide-react";
import { homePage } from "@/content/pages";

export function EducationOverview() {
  const { education } = homePage;
  return (
    <section id="about" className="section shell education-section">
      <div className="education-heading">
        <p className="eyebrow">{education.eyebrow}</p>
        <h2>
          {education.title}
          <br />
          <span className="blue">{education.highlightedTitle}</span>
        </h2>
        <p>
          {education.summary.split("\n").map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <a className="text-link" href={education.link} target="_blank" rel="noreferrer">
          {education.linkLabel} <GraduationCap size={18} />
        </a>
      </div>
      <div className="education-details">
        <p className="education-lead">{education.lead}</p>
        <p>{education.description}</p>
        <div className="education-cells">
          {education.cells.map((cell) => (
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
