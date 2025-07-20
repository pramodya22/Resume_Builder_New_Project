import React, { useState } from "react";
import { ResumeContext } from "./ResumeContext";

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personal: { name: "", email: "", phone: "", summary: "", photo: "" },
    social: { linkedin: "", github: "", twitter: "" },
    skills: [],
    certifications: [],
    courses: [],
    languages: [],
    education: [],
    work: [],
    template: "template1",
    color: "#4F46E5", 
  });

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const updateSocial = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
  };

  const updateSkills = (skills) => setResumeData(prev => ({ ...prev, skills }));
  const updateCertifications = (certifications) => setResumeData(prev => ({ ...prev, certifications }));
  const updateCourses = (courses) => setResumeData(prev => ({ ...prev, courses }));
  const updateLanguages = (languages) => setResumeData(prev => ({ ...prev, languages }));
  const updateProfileImage = (photo) => setResumeData(prev => ({ ...prev, personal: { ...prev.personal, photo } }));
  const updateEntry = (section, index, field, value) => {
    const updatedSection = [...resumeData[section]];
    updatedSection[index][field] = value;
    setResumeData(prev => ({ ...prev, [section]: updatedSection }));
  };
  const addEntry = (section) => {
    const newEntry = { title: "", institution: "", duration: "", description: "" };
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newEntry] }));
  };
  const removeEntry = (section, index) => {
    const updated = resumeData[section].filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, [section]: updated }));
  };
  const updateTemplate = (template) => setResumeData(prev => ({ ...prev, template }));
  const updateColor = (color) => setResumeData(prev => ({ ...prev, color }));
  const resetAll = () => {
    setResumeData({
      personal: { name: "", email: "", phone: "", summary: "", photo: "" },
      social: { linkedin: "", github: "", twitter: "" },
      skills: [],
      certifications: [],
      courses: [],
      languages: [],
      education: [],
      work: [],
      template: "template1",
      color: "#4F46E5",
    });
  };

  return (
    <ResumeContext.Provider value={{
      resumeData, updatePersonal, updateSocial, updateSkills, updateCertifications, updateCourses,
      updateLanguages, updateProfileImage, updateEntry, addEntry, removeEntry, updateTemplate, updateColor, resetAll,
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
