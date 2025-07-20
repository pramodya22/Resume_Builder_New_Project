import { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

const defaultData = {
  personal: { name: "", email: "", phone: "", summary: "", photo: "" },
  social: { linkedin: "", github: "", twitter: "" },
  education: [{ title: "", institution: "", duration: "", description: "" }],
  work: [{ title: "", institution: "", duration: "", description: "" }],
  skills: [],
  certifications: [],
  template: "template1",
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem("resumeData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonal = (field, value) =>
    setResumeData({ ...resumeData, personal: { ...resumeData.personal, [field]: value } });
  const updateSocial = (field, value) =>
    setResumeData({ ...resumeData, social: { ...resumeData.social, [field]: value } });
  const updateEntry = (type, idx, field, value) => {
    const updated = resumeData[type].map((e, i) =>
      i === idx ? { ...e, [field]: value } : e
    );
    setResumeData({ ...resumeData, [type]: updated });
  };
  const addEntry = (type) =>
    setResumeData({
      ..resumeData,
      [type]: [...resumeData[type], { title: "", institution: "", duration: "", description: "" }],
    });
  const removeEntry = (type, idx) => {
    if (resumeData[type].length > 1) {
      setResumeData({
        ..resumeData,
        [type]: resumeData[type].filter((_, i) => i !== idx),
      });
    }
  };
  const updateProfileImage = (photo) =>
    setResumeData({ ...resumeData, personal: { ...resumeData.personal, photo } });
  const updateSkills = (skills) => setResumeData({ ...resumeData, skills });
  const updateCertifications = (certs) => setResumeData({ ...resumeData, certifications: certs });
  const updateTemplate = (template) => setResumeData({ ...resumeData, template });
  const resetAll = () => {
    localStorage.removeItem("resumeData");
    setResumeData(defaultData);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonal,
        updateSocial,
        updateEntry,
        addEntry,
        removeEntry,
        updateProfileImage,
        updateSkills,
        updateCertifications,
        updateTemplate,
        resetAll,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};
