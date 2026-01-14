import mongoose from "mongoose";

// this schema is used to create a new application -> take user id, company, role, job type, status, job link and notes from the user and return the application data with timestamp
const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    company: {
      type: String,
      required: true,
      trim: true
    },

    role: {
      type: String,
      required: true,
      trim: true
    },

    jobType: {
      type: String,
      enum: ["Internship", "Full time", "Part time"],
      default: "Full-time"
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied"
    },

    jobLink: {
      type: String
    },

    notes: {
      type: String
    },

    aiInsights: {
      summary: String,
      skills: [String],
      resumeTips: [String],
      followUpMessage: String,
      generatedAt: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
