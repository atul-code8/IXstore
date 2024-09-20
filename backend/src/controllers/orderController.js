import Order, { findById, find } from '../models/Order';

const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

const getOrderById = async (req, res) => {
    const order = await findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

const updateOrderToPaid = async (req, res) => {
    const order = await findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

const getMyOrders = async (req, res) => {
    const orders = await find({ user: req.user._id });
    res.json(orders);
};

const getOrders = async (req, res) => {
    const orders = await find({}).populate('user', 'id name');
    res.json(orders);
};

export default { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };
