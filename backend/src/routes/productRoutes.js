import { Router } from "express";
import auth from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce",
    allowed_formats: ["jpg", "jpeg", "png", "avif"],
  },
});

const upload = multer({ storage });

const router = Router();

router.get("/list", getProducts);
router.get("/:product_id", getProductById);
router.put("/:product_id", auth, updateProduct);
router.delete("/:product_id", auth, deleteProduct);
router.post(
  "/create",
  auth,
  authorization(["admin"]),
  upload.array("images", 10),
  createProduct
);

export default router;
