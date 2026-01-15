import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import { Service } from "../Models/service.model.js";

// For Admin only

const createService = asyncHandler(async (req, res) => {
  const { name, description, pricing } = req.body;
  if (!name || !description || pricing === undefined)
    throw new ApiError(301, "All fields are required");

  const existingService = await Service.findOne({ name });
  if (existingService) throw new ApiError(400, "Service already exists");

  const service = await Service.create({
    name,
    description,
    pricing,
  });

  if (!service) throw new ApiError(500, "Unexpected error occured");

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        service,
      },
      "Service created successfully"
    )
  );
});

const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, pricing, isActive } = req.body;
  if (name === undefined && description === undefined && pricing === undefined && isActive === undefined)
    throw new ApiError(400, "Atleast one field is required");
  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, "Service does not exist");
  const updatedService = await Service.findByIdAndUpdate(
    id,
    {
      name,
      description,
      pricing,
      isActive,
    },
    {
      new: true,
    }
  );
  if (!updatedService)
    throw new ApiError(
      500,
      "Unexpected error occured. Please try again later."
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        updatedService,
      },
      "Service updated successfully"
    )
  );
});

const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, "Service not found");

  await Service.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, "Service deleted successfully"));
});

const getService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const service = await Service.findById(id);
  if (!service) throw new ApiError(404, "Service not found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        service,
      },
      "Service fetched successfully"
    )
  );
});

const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  if (!services) throw new ApiError(404, "No services found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        services,
      },
      "All services fetched successfully"
    )
  );
});

export {
  createService,
  updateService,
  deleteService,
  getService,
  getAllServices,
};
