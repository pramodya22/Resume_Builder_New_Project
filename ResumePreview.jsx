import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const templates = {
  template1: {
    wrapper: "p-6 rounded-xl shadow border",
    header: "text-indigo-800",
    sectionTitle: "text-indigo-700",
    badgeBg: "bg-indigo-100",
    badgeText: "text-indigo-700",
  },
  template2: {
    wrapper: "p-8 rounded shadow-lg border-l-4 border-indigo-600",
    header: "text-white bg-indigo-600 p-4 rounded-t",
    sectionTitle: "text-indigo-600",
    badgeBg: "bg-indigo-200",
    badgeText: "text-indigo-800",
  },
  template3: {
    wrapper: "p-6 rounded-xl shadow-md border bg-gray-50",
    header: "text-gray-900",
    sectionTitle: "text-gray-800",
    badgeBg: "bg-gray-200",
    badgeText: "text-gray-900",
  },
};

const ResumePreview = ({ resumeData, theme }) => {
  const t = templates[resumeData.template];
  return (
    <div
      id="resume-preview"
      className={`${theme === "dark" ? "dark" : ""}`}
    >
      <div className={`${t.wrapper} ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {resumeData.personal.photo && (
            <img src={resumeData.personal.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500" />
          )}
          <div className="text-center lg:text-left">
            <h1 className={`text-3xl font-bold ${t.header}`}>{resumeData.personal.name}</h1>
            <p className="mt-1">{resumeData.personal.email} | {resumeData.personal.phone}</p>
            <p className="italic mt-3">{resumeData.personal.summary}</p>

            <div className="flex justify-center lg:justify-start gap-4 mt-3 text-lg">
              {resumeData.social.linkedin && <a href={resumeData.social.linkedin}><FaLinkedin /></a>}
              {resumeData.social.github && <a href={resumeData.social.github}><FaGithub /></a>}
              {resumeData.social.twitter && <a href={resumeData.social.twitter}><FaTwitter /></a>}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {resumeData.skills.length > 0 && (
          <div className="mb-4">
            <h2 className={`text-xl font-semibold mb-2 ${t.sectionTitle}`}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((s, i) => (
                <span key={i} className={`px-3 py-1 rounded-full text-sm ${t.badgeBg} ${t.badgeText}`}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {resumeData.certifications.length > 0 && (
          <div className="mb-4">
            <h2 className={`text-xl font-semibold mb-2 ${t.sectionTitle}`}>Certifications</h2>
            <ul className="list-disc pl-5">
              {resumeData.certifications.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </div>
        )}

        <div className="mb-4">
          <h2 className={`text-xl font-semibold mb-2 ${t.sectionTitle}`}>Education</h2>
          {resumeData.education.map((e, i) => (
            <div key={i} className="mb-2">
              <h3 className="font-medium">{e.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{e.institution} | {e.duration}</p>
              {e.description && <p className="text-sm">{e.description}</p>}
            </div>
          ))}
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-2 ${t.sectionTitle}`}>Work Experience</h2>
          {resumeData.work.map((w, i) => (
            <div key={i} className="mb-3">
              <h3 className="font-medium">{w.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{w.institution} | {w.duration}</p>
              <ul className="list-disc pl-5 text-sm whitespace-pre-line">
                {w.description.split("\n").map((line, j) => <li key={j}>{line.replace(/^- /, "")}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ResumePreview;