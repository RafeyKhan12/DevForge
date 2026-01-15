import { Router } from "express";
import { verifyTokens } from "../Middlewares/auth.middleware.js";
import { isAdmin } from "../Middlewares/admin.middleware.js";

import { createLead, updateLeadStatus, getAllLeads } from "../Controllers/lead.controller.js";

const router = Router();

router.post("/create-lead", createLead);
router.put("/update-lead-status/:id", verifyTokens, isAdmin, updateLeadStatus);
router.get("/get-leads", verifyTokens, isAdmin, getAllLeads);

export default router