import { Router } from "express";
import auth from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
  upload,
} from "../controllers/productController.js";

const router = Router();

router.get("/list", auth, getProducts);
router.get("/:product_id", auth, getProductById);
router.put("/:product_id", auth, updateProduct);
router.delete("/:product_id", auth, deleteProduct);
router.post(
  "/create",
  auth,
  authorization(["admin"]),
  upload.single("imageUrl"),
  createProduct
);

export default router;
