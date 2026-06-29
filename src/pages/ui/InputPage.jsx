import React, { useState } from "react";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right.mjs";
import User from "lucide-react/dist/esm/icons/user.mjs";
import Mail from "lucide-react/dist/esm/icons/mail.mjs";
import Lock from "lucide-react/dist/esm/icons/lock.mjs";
import Upload from "lucide-react/dist/esm/icons/upload.mjs";

const FormElements = () => {
  const [gender, setGender] = useState("male");
  const [skills, setSkills] = useState(["react"]);
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState(true);

  const handleSkillChange = (skill) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Form Elements
        </h1>

        <div className="mt-1 flex items-center text-sm text-slate-500">
          <span>Dashboard</span>
          <ChevronRight size={16} className="mx-1" />
          <span>Forms</span>
          <ChevronRight size={16} className="mx-1" />
          <span className="font-medium text-slate-700">
            Form Elements
          </span>
        </div>
      </div>

      {/* Basic Inputs */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Basic Inputs
          </h2>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="email"
                placeholder="example@mail.com"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3 text-slate-400"
              />

              <input
                type="password"
                placeholder="********"
                className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Country
            </label>

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Country</option>
              <option>Bangladesh</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Nepal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Textarea
          </h2>
        </div>

        <div className="p-5">
          <textarea
            rows="5"
            placeholder="Write something..."
            className="w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Radio Buttons */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Radio Buttons
          </h2>
        </div>

        <div className="flex gap-6 p-5">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Male
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Female
          </label>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Checkboxes
          </h2>
        </div>

        <div className="flex flex-wrap gap-5 p-5">
          {["react", "vue", "angular", "laravel"].map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={skills.includes(skill)}
                onChange={() => handleSkillChange(skill)}
              />

              {skill}
            </label>
          ))}
        </div>
      </div>

      {/* Multi Select */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Multi Select
          </h2>
        </div>

        <div className="p-5">
          <select
            multiple
            className="h-40 w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none"
          >
            <option>Laravel</option>
            <option>React</option>
            <option>Vue</option>
            <option>Node.js</option>
            <option>Next.js</option>
            <option>Tailwind CSS</option>
          </select>
        </div>
      </div>

      {/* Toggle */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Toggle Switch
          </h2>
        </div>

        <div className="p-5">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
            />

            <span>Active Status</span>
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div className="rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            File Upload
          </h2>
        </div>

        <div className="p-5">
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-8 justify-center hover:bg-slate-50">
            <Upload size={18} />
            Upload File

            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button className="rounded-lg border border-slate-300 px-5 py-2.5">
          Cancel
        </button>

        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default FormElements;