import mongoose from "mongoose";

const leadModel = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["new", "contacted", "accepted", "rejected"],
      default: "new"
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", leadModel);
