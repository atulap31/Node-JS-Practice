// Import the necessary modules here
import ProductModel from '../models/product.model.js';

export default class ProductController {
  getProducts = (req, res) => {
    // Write your code here
    const productModel = new ProductModel();
    const products = productModel.fetchProducts();
    
    // Set custom headers for server-side customization
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('X-Custom-Header', 'Product-List-Fetched');
    
    res.status(200).json(products);
  };
}