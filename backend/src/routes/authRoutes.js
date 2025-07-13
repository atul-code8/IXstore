import { Router } from "express";
import { signUp, logIn, google, verifyToken } from "../controllers/authController.js";

const router = Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.post('/google', google);
router.get('/verify', verifyToken);

export default router;