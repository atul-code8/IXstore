import { Router } from "express";
import { signUp, logIn, google } from "../controllers/authController.js";

const router = Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.post('/google', google);

export default router;