import { Router } from "express";
import {
  signUp,
  logIn,
  logOut,
  getUser,
  // logInWithGoogle,
  // oauthCallback,
} from "../controllers/authController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.get("/user", auth, getUser);
router.post("/logout", logOut);
// router.get("/oauth", logInWithGoogle);
// router.get('/callback', oauthCallback);

export default router;
