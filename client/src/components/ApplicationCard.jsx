import React from "react";
import { RiDeleteBin5Line, RiEdit2Line} from "react-icons/ri";
import { FaRobot } from "react-icons/fa";
import { useMemo } from "react";
import AIInsightsModal from "../components/AIInsightsModal";

const ApplicationCard = ({ app, onDelete, onEdit, onAI }) => {
  const statusStyles = {
    Applied: "bg-blue-100 text-blue-600",
    Interview: "bg-yellow-100 text-yellow-700",
    Offer: "bg-green-100 text-green-600",
    Rejected: "bg-red-100 text-red-600",
  };

  function generateLightColor() {
    const r = Math.floor(Math.random() * 106) + 150; // 150–255
    const g = Math.floor(Math.random() * 106) + 150;
    const b = Math.floor(Math.random() * 106) + 150;

    return `rgb(${r}, ${g}, ${b})`;
  }

  const cardColor = useMemo(() => generateLightColor(), []);

  return (
    <div
      className="text-gray-900 rounded-2xl border-2 border-white p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-500 hover:scale-3d"
      style={{ backgroundColor: cardColor }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold ">
            {app.company || "Company Name"}
          </h3>
          <p className="text-sm  mt-0.5">
            {app.role} • {app.jobType}
          </p>
        </div>

        {/* Status */}
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${statusStyles[app.status] || "bg-gray-100 "
            }`}
        >
          {app.status}
        </span>
      </div>

      {/* Divider */}
      <div
        className="my-3 border-t w-full"
        style={{ backgroundColor: cardColor }}
      />
      {/* Notes */}
      {app.notes && <p className="text-sm  line-clamp-2">{app.notes}</p>}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-xs ">Updated just now</p>

        <div className="flex items-center gap-3">
          {/* Edit */}
          <button
            onClick={() => onEdit(app._id)}
            className="p-2 rounded-lg hover:bg-gray-100 text-blue-600"
          >
            <RiEdit2Line size={24} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(app._id)}
            className="p-2 rounded-lg hover:bg-red-100 text-red-500"
          >
            <RiDeleteBin5Line size={24} />
          </button>

          <button
            onClick={() => onAI(app)}
            className="p-2 rounded-lg text-purple-500 hover:bg-purple-100 "
          >
            <FaRobot size={24}/>
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
