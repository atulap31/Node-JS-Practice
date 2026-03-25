// Please don't change the pre-written code
// Import the necessary modules here
import { addToCart, removeFromCart } from "../model/cart.model.js";

export const addToCartController = (req, res) => {
  // Get productId and quantity from query parameters
  const { productId, quantity } = req.query;
  
  // Get userId from JWT middleware (set in jwtAuth)
  const userId = req.userId;
  
  // Input validation
  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      msg: "Product ID and quantity are required as query parameters"
    });
  }
  
  // Validate quantity is a positive number
  const parsedQuantity = Number(quantity);
  if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({
      success: false,
      msg: "Quantity must be a positive number"
    });
  }
  
  // Validate productId is a number
  const parsedProductId = Number(productId);
  if (isNaN(parsedProductId) || parsedProductId <= 0) {
    return res.status(400).json({
      success: false,
      msg: "Product ID must be a valid positive number"
    });
  }
  
  // Add item to cart
  const cartItem = addToCart(userId, parsedProductId, parsedQuantity);
  
  res.status(201).json({
    success: true,
    message: "Item added to cart successfully",
    cartItem
  });
};

export const removeFromCartController = (req, res) => {
  // Get itemId from route parameters
  const { itemId } = req.params;
  
  // Get userId from JWT middleware
  const userId = req.userId;
  
  // Input validation
  if (!itemId) {
    return res.status(400).json({
      success: false,
      msg: "Cart item ID is required"
    });
  }
  
  // Validate itemId is a number
  const parsedItemId = Number(itemId);
  if (isNaN(parsedItemId) || parsedItemId <= 0) {
    return res.status(400).json({
      success: false,
      msg: "Cart item ID must be a valid positive number"
    });
  }
  
  // Remove item from cart
  const result = removeFromCart(userId, parsedItemId);
  
  if (result.success) {
    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      removedItem: result.removedItem
    });
  } else {
    res.status(404).json({
      success: false,
      msg: result.message
    });
  }
};