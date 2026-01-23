import React from "react";
import API from "../services/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ApplicationForm = ({ onSuccess, onClose, initialData, title, state }) => {
  const [form, setForm] = useState({
      company: "",
      role: "",
      status: "Applied",
      jobType: "Full time",
      jobLink: "",
      notes: "",
    }
  );

  useEffect(() => {
    if(initialData){
      setForm({
        company: initialData.company || "",
        role: initialData.role || "",
        status: initialData.status || "Applied",
        jobType: initialData.jobType || "Full time",
        jobLink: initialData.jobLink || "",
        notes: initialData.notes || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    // Handle form input changes
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;
      if (initialData) {
        res = await API.put(`/applications/${initialData._id}`, form);
      } else {
        res = await API.post("/applications", form);
      }
      onSuccess(res.data.application ?? res.data);
      setForm({
        company: "",
        role: "",
        status: "Applied",
        jobType: "Full time",
        jobLink: "",
        notes: "",
      });
      toast.success(`Application ${state} Successfully 🎉`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      onClose();
    } catch (error) {
      toast.error("Failed to Submit Application", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xl bg-opacity-50 flex justify-center items-center ">
      <div className="bg-white p-6 shadow w-full max-w-xl max-h-xl min-h-[55%]  rounded-2xl flex flex-col justify-around ">
        <h2 className=" mb-4 text-4xl font-extrabold text-[#363636]">
          {title} 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="company"
            value={form.company}
            placeholder="Company"
            className="w-full border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="role"
            value={form.role}
            placeholder="Role"
            className="w-full border p-2 rounded-xl"
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            className="w-full border p-2 rounded-xl"
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <select
            name="jobType"
            value={form.jobType}
            className="w-full border p-2 rounded-xl"
            onChange={handleChange}
          >
            <option>Full time</option>
            <option>Internship</option>
            <option>Part time</option>
          </select>

          <input
            name="jobLink"
            value={form.jobLink}
            placeholder="Job Link (optional)"
            className="w-full border p-2 rounded-xl"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            className="w-full  border p-2  rounded-xl"
            onChange={handleChange}
          />

          <div className="flex justify-between ">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-1 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out transform "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-1 rounded-xl hover:bg-blue-800 transition-all duration-300 ease-in-out transform "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
