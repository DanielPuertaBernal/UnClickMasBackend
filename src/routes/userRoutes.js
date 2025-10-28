import express from "express";
import { userController } from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/points", authenticate, userController.addPoints);
router.get("/leaderboard", userController.leaderboard);

export default router;
