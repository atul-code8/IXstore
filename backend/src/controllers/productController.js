import Product, { find, findById } from '../models/Product';

const getProducts = async (req, res) => {
    const products = await find({});
    res.json(products);
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
    const { name, price, description, imageUrl, countInStock } = req.body;
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

export default { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
