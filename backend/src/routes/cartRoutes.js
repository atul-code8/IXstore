import { Router } from "express";
import {
  addItemToCart,
  removeItemFromCart,
  listItemsInCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add", auth, addItemToCart);
router.delete("/remove/:productId", auth, removeItemFromCart);
router.get("/list", auth, listItemsInCart);

export default router;
