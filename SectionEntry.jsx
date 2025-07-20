import React from "react";
import InputField from "./InputField";

export default function SectionEntry({ type, entries, updateEntry, addEntry, removeEntry }) {
  const lower = type.toLowerCase();
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3 dark:text-gray-200">{type}</h3>
      {entries.map((e, i) => (
        <div key={i} className="border p-4 rounded mb-4 bg-gray-50 dark:bg-gray-700">
          <InputField label="Title" value={e.title} onChange={(v) => updateEntry(lower, i, "title", v)} />
          <InputField label="Institution/Company" value={e.institution} onChange={(v) => updateEntry(lower, i, "institution", v)} />
          <InputField label="Duration" value={e.duration} onChange={(v) => updateEntry(lower, i, "duration", v)} />
          <InputField label="Description" value={e.description} onChange={(v) => updateEntry(lower, i, "description", v)} />
          <button onClick={() => removeEntry(lower, i)} className="text-red-500 text-sm mt-2 hover:underline">Remove</button>
        </div>
      ))}
      <button onClick={() => addEntry(lower)} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Add {type}
      </button>
    </div>
  );
}
