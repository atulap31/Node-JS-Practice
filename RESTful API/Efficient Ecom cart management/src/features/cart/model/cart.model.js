// Please don't change the pre-written code
// Import the necessary modules here

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Check if the product already exists in the user's cart
  const existingCartItem = cartItems.find(
    (item) => item.userId === userId && item.productId === productId
  );

  if (existingCartItem) {
    // Update quantity if product already exists
    existingCartItem.quantity += Number(quantity);
    return existingCartItem;
  } else {
    // Add new item to cart
    const newCartItem = new cartModel(userId, productId, quantity);
    cartItems.push(newCartItem);
    return newCartItem;
  }
};

export const removeFromCart = (userId, cartItemId) => {
  // Find the index of the cart item
  const itemIndex = cartItems.findIndex(
    (item) => item.id === parseInt(cartItemId) && item.userId === userId
  );

  if (itemIndex !== -1) {
    // Remove the item from the cart
    const removedItem = cartItems.splice(itemIndex, 1)[0];
    return { success: true, removedItem };
  } else {
    return { success: false, message: "Cart item not found" };
  }
};