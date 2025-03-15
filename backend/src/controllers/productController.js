import Product from '../models/Product.js';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from '../cloudinary/config.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ecommerce',
      allowed_formats: ['jpg', 'jpeg', 'png'],
    },
  });
const upload = multer({ storage });

const getProducts = async (req, res) => {
    const page = Math.max(Number(req.query.page) || 1, 1);  // Ensure page is at least 1
    const limit = Math.max(Number(req.query.limit) || 10, 1);  // Ensure limit is at least 1
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      totalProducts,
      totalPages,
      currentPage: page,
      products,
    });
};

const getProductById = async (req, res) => {
    const product = await findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const createProduct = async (req, res) => {
    const { name, price, description, countInStock } = req.body;
    const imageUrl = req.file.path;
    const product = new Product({
        name,
        price,
        description,
        imageUrl,
        countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
    const { name, price, description, imageUrl, countInStock } = req.body;
    const product = await findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

const deleteProduct = async (req, res) => {
    const product = await findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, upload };
