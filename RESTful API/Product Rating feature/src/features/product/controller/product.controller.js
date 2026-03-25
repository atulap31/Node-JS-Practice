import { fetchAllProducts, rateProductModel } from "../model/product.model.js";

export const getAllProducts = (req, res, next) => {
  const products = fetchAllProducts();
  res.json({ success: true, products });
};
export const getOneProduct = (req, res, next) => {
  res.json({ success: true, msg: "getOneProduct working" });
};
export const addProduct = (req, res, next) => {
  res.json({ success: true, msg: "addProduct working" });
};

export const rateProduct = (req, res, next) => {
  // Get parameters from query
  let { userId, productId, rating } = req.query;
  
  // Convert string parameters to numbers
  userId = parseInt(userId);
  productId = parseInt(productId);
  rating = parseFloat(rating);
  
  // Check if any required parameter is missing or invalid
  if (isNaN(userId) || isNaN(productId) || isNaN(rating)) {
    return res.status(400).json({ 
      success: false, 
      msg: "Invalid input parameters. userId, productId, and rating are required." 
    });
  }
  
  // Validate rating range (0-5)
  if (rating < 0 || rating > 5) {
    return res.status(400).json({ 
      success: false, 
      msg: "Rating should be between 0 and 5" 
    });
  }
  
  // Call the model function with numeric values
  const modelResp = rateProductModel(productId, userId, rating);
  
  if (modelResp.status) {
    return res.json({ 
      success: true, 
      msg: modelResp.res 
    });
  } else {
    return res.status(400).json({ 
      success: false, 
      msg: modelResp.res 
    });
  }
};