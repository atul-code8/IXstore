import { Router } from "express";
import {
  addItemToCart,
  deleteItemFromCart,
  listItemsInCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/add", auth, addItemToCart);
router.delete("/:productId", auth, deleteItemFromCart);
router.get("/list", auth, listItemsInCart);

export default router;
