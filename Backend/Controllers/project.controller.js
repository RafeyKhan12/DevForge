import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/apiResponse.js";
import { ApiError } from "../Utils/apiError.js";
import { Project } from "../Models/project.model.js";
import { Service } from "../Models/service.model.js";
import { User } from "../Models/users.model.js";

// For Admin Only.

const createProject = asyncHandler(async (req, res) => {
  const { title, status, deadline, serviceName, clientName } = req.body;
  if (!title || !status || !deadline || !serviceName || !clientName) {
  throw new ApiError(400, "All fields are required");
}
  const service = await Service.findOne({ name: serviceName });
  if (!service || service.isActive === false)
    throw new ApiError(404, "Service not available or active");
  const client = await User.findOne({ username: clientName });
  if (!client)
    throw new ApiError(404, "Client with this username does not exist");

  const existingProject = await Project.findOne({
    client: client._id,
    title,
  });
  if (existingProject) throw new ApiError(400, "Project already exists");
  
  const project = await Project.create({
    service: service._id,
    client: client._id,
    title,
    status,
    deadline,
  });
  if (!project) throw new ApiError(500, "Error creating project");
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        project,
      },
      "Project creation successful."
    )
  );
});

const updateProjectStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowedStatus = ["pending", "started", "review", "completed"];
  if (!allowedStatus.includes(status))
    throw new ApiError(400, "Please enter a valid status");
  const project = await Project.findById(id);
  if (!project) throw new ApiError(404, "Project not found");
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
    }
  );
  if (!updatedProject)
    throw new ApiError(500, "Error updating project, try again later.");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        updatedProject,
      },
      "Project update successful"
    )
  );
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByIdAndDelete(id);
  if (!project) throw new ApiError(404, "Project does not exist");

  return res
    .status(200)
    .json(new ApiResponse(200, "Project deletion successful"));
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  if (projects.length === 0) throw new ApiError(404, "No projects found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        projects,
      },
      "All projects fetched successfully"
    )
  );
});

// For Client(Read only)

const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clientId = req.user._id;

  const project = await Project.findOne({ _id: id, client: clientId }).lean();
  if (!project) throw new ApiError(404, "Project does not exist");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        project,
      },
      "Project fetched successfully"
    )
  );
});

const getAllClientProjects = asyncHandler(async (req, res) => {
  const clientId = req.user._id;
  const projects = await Project.find({ client: clientId }).lean();
  if (projects.length === 0) throw new ApiError(404, "No projects found");

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        projects,
      },
      "All Projects fetched successfully."
    )
  );
});

export {
  createProject,
  updateProjectStatus,
  deleteProject,
  getAllProjects,
  getProject,
  getAllClientProjects,
};
