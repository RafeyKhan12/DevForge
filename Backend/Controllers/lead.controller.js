import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import { Lead } from "../Models/lead.model.js";

// For Everyone except admin (common-sense)
const createLead = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    throw new ApiError(400, "All fields are required");
  }
  const lead = await Lead.create({
    name: name,
    email: email,
    message: message,
  });
  if (!lead)
    throw new ApiError(500, "Could not create a lead. Please try again later.");
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        lead,
      },
      "Lead created Successfully"
    )
  );
});

// For Admin
const getAllLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find();
  if (leads.length === 0) throw new ApiError(404, "Leads not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        leads,
      },
      "All leads fetched successfully"
    )
  );
});

const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  if(!status) throw new ApiError(400, "Status is required");
  const lead = await Lead.findOneAndUpdate(
    {
      _id: id,
    },
    {
      status,
    },
    {
      new: true,
    }
  );
  if (!lead) throw new ApiError(404, "Lead not found");
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        lead,
      },
      "Lead Updated successfully"
    )
  );
});
export { createLead, updateLeadStatus, getAllLeads };
