import React from "react";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";

const ApplicationCard = ({ app, onDelete, onEdit }) => {
  const statusStyles = {
    Applied: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {app.company || "Company Name"}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {app.role} • {app.jobType}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyles[app.status] || "bg-gray-100 text-gray-600"}`}
        >
          {app.status}
        </span>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-gray-100" />

      {/* Notes */}
      {app.notes && (
        <p className="text-sm text-gray-600 line-clamp-2">{app.notes}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs text-gray-400">Updated just now</p>

        <div className="flex items-center gap-3">
          {/* Edit */}
          <button 
          onClick={() => onEdit(app._id)}
          className="p-2 rounded-lg hover:bg-gray-100 text-blue-600">
            <RiEdit2Line size={24}/>
          </button>

          {/* Delete */}
          <button 
          onClick={() => onDelete(app._id)}
          className="p-2 rounded-lg hover:bg-red-100 text-red-500">
            <RiDeleteBin5Line size={24}/>
          </button>

          {/* View Job */}
          {app.jobLink && (
            <a
              href={app.jobLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium px-4 py-1.5 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              View Job
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
