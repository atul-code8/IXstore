import Cart from "../models/Cart.js";

const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid product ID or quantity" });
    }

    const cart = await Cart.findOne({ userId });

    if (cart) {
      const existingItem = cart.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
      return res.status(201).json({ message: "Item added/updated in cart", cart });
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });
      return res.status(201).json({ message: "Item added to new cart", cart: newCart });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to add item to cart", error: err.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    return res.status(200).json({ message: "Item deleted from cart", cart });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to delete item from cart", error: err.message });
  }
};

const listItemsInCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ message: "Cart items retrieved successfully", items: cart.items });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to retrieve items from cart", error: err.message });
  }
};


export { addItemToCart, deleteItemFromCart, listItemsInCart };
