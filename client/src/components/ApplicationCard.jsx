import React from "react";

const ApplicationCard = ({ app }) => {
  return (
    <div
      key={app._id}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 transition-all hover:shadow-md hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{app.company}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{app.role}</p>
        </div>

        {/* Status Pill */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
        ${
          app.status === "Applied"
            ? "bg-blue-100 text-blue-600"
            : app.status === "Interview"
            ? "bg-yellow-100 text-yellow-600"
            : app.status === "Offer"
            ? "bg-green-100 text-green-600"
            : "bg-gray-100 text-gray-600"
        }
      `}
        >
          {app.status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-gray-100" />

      {/* Footer buttons / link */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Updated just now</p>

        {app.jobLink && (
          <a
            href={app.jobLink}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium px-3 py-1 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition"
          >
            View Job
          </a>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
