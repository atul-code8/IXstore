import { Router } from "express";
import {
  signUp,
  logIn,
  callback,
  signUpWithGoogle,
} from "../controllers/authController.js";


const router = Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.get('/google', signUpWithGoogle);
router.get('/google/callback', callback);

export default router;
