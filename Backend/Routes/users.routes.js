import { Router } from "express";
import { verifyTokens } from "../Middlewares/auth.middleware.js";
import { isAdmin } from "../Middlewares/admin.middleware.js";

import {
  createAccount,
  userLogIn,
  userLogOut,
  editAccount,
  deleteAccount,
  getUser,
  getAllUsers,
  refreshAccessToken,
  getMe,
} from "../Controllers/users.controller.js";

const router = Router();

router.post("/register", createAccount);
router.post("/log-in", userLogIn);
router.post("/log-out", verifyTokens ,userLogOut);
router.put("/edit-profile", verifyTokens, editAccount);
router.delete("/delete-account", verifyTokens, deleteAccount);
router.get("/get-user/:id", verifyTokens, isAdmin, getUser);
router.get("/get-all-users", verifyTokens, isAdmin, getAllUsers);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", verifyTokens, getMe);

export default router;
