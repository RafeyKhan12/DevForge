import { Router } from "express";
import { verifyTokens } from "../Middlewares/auth.middleware.js";
import { isAdmin } from "../Middlewares/admin.middleware.js";
import { isClient } from "../Middlewares/client.middleware.js";
 
import {
  createProject,
  updateProjectStatus,
  deleteProject,
  getAllProjects,
  getProject,
  getAllClientProjects,
} from "../Controllers/project.controller.js";

const router = Router();

router.post("/create-project", verifyTokens, isAdmin, createProject);
router.put("/update-project-status/:id", verifyTokens, isAdmin, updateProjectStatus);
router.delete("/delete-project/:id", verifyTokens, isAdmin, deleteProject);
router.get("/get-all-projects", verifyTokens, isAdmin, getAllProjects);
router.get("/get-project/:id", verifyTokens, isClient, getProject);
router.get("/get-client-projects", verifyTokens, isClient, getAllClientProjects);

export default router;