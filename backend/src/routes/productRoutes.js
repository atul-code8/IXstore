import { Router } from "express";
import auth from "../middleware/auth.js";
import authorization from "../middleware/authorization.js";
import { createProduct, getProducts, upload} from "../controllers/productController.js";

const router = Router();

router.get("/list", auth, getProducts);
router.post("/create", auth, authorization(['admin']), upload.single('imageUrl'), createProduct);

export default router;
