import { getAllUsers } from "../../user/model/user.model.js";

let id = 3;
const products = [
  { id: 1, name: "iphone", price: 100000 },
  { id: 2, name: "oneplus", price: 50000 },
  { id: 3, name: "samsung", price: 60000 },
];

export const fetchAllProducts = () => {
  return products;
};

export const rateProductModel = (productId, userId, rating) => {
  // Convert parameters to numbers if they come as strings
  productId = parseInt(productId);
  userId = parseInt(userId);
  rating = parseFloat(rating);
  
  const user = getAllUsers().find((user) => {
    return user.id == userId;
  });
  
  if (!user) {
    return { status: false, res: "User not found" };
  }
  
  const product = products.find((product) => {
    return product.id == productId;
  });
  
  if (!product) {
    return { status: false, res: "Product not found" };
  }

  // Ensure rating is within valid range
  if (rating < 0 || rating > 5) {
    return { status: false, res: "Rating should be between 0 and 5" };
  }

  if (!product.ratings) {
    product.ratings = [];
    product.ratings.push({ userId, rating });
  } else {
    const existingRatingIndex = product.ratings.findIndex((r) => {
      return r.userId == userId;
    });
    
    if (existingRatingIndex >= 0) {
      // Update existing rating
      product.ratings[existingRatingIndex] = { userId, rating };
    } else {
      // Add new rating
      product.ratings.push({ userId, rating });
    }
  }
  
  return { status: true, res: product };
};