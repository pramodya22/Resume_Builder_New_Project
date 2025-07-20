import React, { useContext, useState } from "react";
import { ResumeProvider, ResumeContext } from "./context/ResumeContext";
import InputField from "./components/InputField";
import SectionEntry from "./components/SectionEntry";
import ResumePreview from "./components/ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const App = () => (
  <ResumeProvider>
    <MainApp />
  </ResumeProvider>
);

const MainApp = () => {
  const {
    resumeData,
    updatePersonal,
    updateSocial,
    updateEntry,
    addEntry,
    removeEntry,
    resetAll,
    updateProfileImage,
    updateSkills,
    updateCertifications,
    updateTemplate,
  } = useContext(ResumeContext);
  const [theme, setTheme] = useState("light");

  const downloadPDF = () => {
    const el = document.getElementById("resume-preview");
    html2canvas(el, { scale: 2 }).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(img, "PNG", 0, 0, w, h);
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-center text-indigo-600 dark:text-indigo-300 mb-8">
          Resume Builder
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button onClick={downloadPDF} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Download PDF</button>
          <button onClick={resetAll} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">Reset</button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <select value={resumeData.template} onChange={(e) => updateTemplate(e.target.value)} className="px-4 py-2 rounded border">
            <option value="template1">Classic</option>
            <option value="template2">Modern</option>
            <option value="template3">Elegant</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Side view */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Personal Info</h2>
            <InputField label="Name" value={resumeData.personal.name} onChange={(v) => updatePersonal("name", v)} />
            <InputField label="Email" value={resumeData.personal.email} onChange={(v) => updatePersonal("email", v)} />
            <InputField label="Phone" value={resumeData.personal.phone} onChange={(v) => updatePersonal("phone", v)} />
            <InputField label="Summary" value={resumeData.personal.summary} onChange={(v) => updatePersonal("summary", v)} />
            <InputField label="LinkedIn URL" value={resumeData.social.linkedin} onChange={(v) => updateSocial("linkedin", v)} />
            <InputField label="GitHub URL" value={resumeData.social.github} onChange={(v) => updateSocial("github", v)} />
            <InputField label="Twitter URL" value={resumeData.social.twitter} onChange={(v) => updateSocial("twitter", v)} />

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Profile Photo</label>
              <input type="file" accept="image/*" onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  const r = new FileReader();
                  r.onload = (ev) => updateProfileImage(ev.target.result);
                  r.readAsDataURL(f);
                }
              }} />
            </div>

            <InputField label="Skills (comma separated)" value={resumeData.skills.join(", ")} onChange={(v) => updateSkills(v.split(",").map(s => s.trim()))} />
            <InputField label="Certifications (comma separated)" value={resumeData.certifications.join(", ")} onChange={(v) => updateCertifications(v.split(",").map(c => c.trim()))} />

            <SectionEntry type="Education" entries={resumeData.education} updateEntry={updateEntry} addEntry={addEntry} removeEntry={removeEntry} />
            <SectionEntry type="Work" entries={resumeData.work} updateEntry={updateEntry} addEntry={addEntry} removeEntry={removeEntry} />
          </div>

          {/* Preview Side view */}
          <ResumePreview resumeData={resumeData} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default App;
