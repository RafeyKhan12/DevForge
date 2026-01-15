import mongoose from "mongoose";

const projectModel = new mongoose.Schema(
  {
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: true,
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "started", "review", "completed"],
      default: "pending"
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectModel);
