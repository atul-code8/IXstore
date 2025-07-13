import Cart from "../models/Cart.js";

const addItemToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const userId = req.user.id;

    if (!product || !quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Invalid product ID or quantity" });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }

      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{ product, quantity }],
      });
    }

    return res.status(201).json({
      success: true,
      message: "Item added/updated in cart",
      data: cart,
    });
  } catch (err) {
    console.error("Add to cart error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: err.message,
    });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(404)
        .json({ success: true, data: [], message: "Cart is empty" });
    }

    const itemIndex = cart.items.findIndex((item) => {
      const itemProductId = item.product._id
        ? item.product._id.toString()
        : item.product.toString();
      return itemProductId === productId;
    });

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (err) {
    console.error("Remove from cart error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: err.message,
    });
  }
};

const listItemsInCart = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const userId = req.user.id;
    const cart = await Cart.findOne({ userId })
      .populate("items.product")
      .lean();

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Cart items retrieved successfully",
      data: cart.items,
    });
  } catch (err) {
    console.error("Error retrieving cart:", err.message);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve items from cart",
      error: err.message,
    });
  }
};

export { addItemToCart, removeItemFromCart, listItemsInCart };
