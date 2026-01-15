import { Router } from "express";
import { verifyTokens } from "../Middlewares/auth.middleware.js";
import { isAdmin } from "../Middlewares/admin.middleware.js";

import {
  createService,
  updateService,
  deleteService,
  getService,
  getAllServices,
} from "../Controllers/service.controller.js";

const router = Router();

router.post("/create-service", verifyTokens, isAdmin, createService);
router.put("/update-service/:id", verifyTokens, isAdmin, updateService);
router.delete("/delete-service/:id", verifyTokens, isAdmin, deleteService);
router.get("/get-service/:id", verifyTokens, isAdmin, getService);
router.get("/get-all-services", verifyTokens, getAllServices);

export default router;
