import { Router } from "express";
import {
  createIntent,
  createSession,
  sessionStatus,
} from "../controllers/paymentController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/create-checkout-intent", auth, createIntent);

router.post("/create-checkout-session", auth, createSession);

router.get("/session-status", auth, sessionStatus);

export default router;
