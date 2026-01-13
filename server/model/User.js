import mongoose from "mongoose";

// this schema is used to create a new user -> take name, email and password from the user and return the user data with timestamp
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
