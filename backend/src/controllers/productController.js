import Product from "../models/Product.js";

const getProducts = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1); // Ensure page is at least 1
  const limit = Math.max(Number(req.query.limit) || 10, 1); // Ensure limit is at least 1
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
  const product = await Product.findById(req.params.product_id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

const createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    countInStock,
    colors,
    sizes,
    highlights,
    details,
    brand,
    target_audience,
  } = req.body;

  const imageFiles = req.files;

  if (!imageFiles || imageFiles.length === 0) {
    return res.status(400).json({ message: "At least one image is required" });
  }

  const images = imageFiles.map((file) => ({
    src: file.path,
    alt: name,
  }));

  const product = new Product({
    name,
    price,
    description,
    countInStock,
    details,
    highlights,
    colors,
    sizes,
    images,
    brand,
    target_audience,
  });

  const createdProduct = await product.save();
  res.status(201).json({
    message: "Product created successfully",
    product: createdProduct,
  });
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
    res.status(404).json({ message: "Product not found" });
  }
};

const deleteProduct = async (req, res) => {
  const product = await findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
