// Please don't change the pre-written code
// Import the necessary modules here
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key'; // Must match the secret used in user.controller.js

const jwtAuth = (req, res, next) => {
  // Write your code here
  try {
    // Get the token from the cookie
    const token = req.cookies.jwtToken;
    
    // Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        msg: 'No token provided. Access denied.' 
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Attach user information to the request object for use in routes
    req.user = decoded;
    
    // Token is valid, proceed to the next middleware/route handler
    next();
  } catch (error) {
    // Handle different JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false, 
        msg: 'Invalid token. Access denied.' 
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        msg: 'Token expired. Please login again.' 
      });
    } else {
      return res.status(401).json({ 
        success: false, 
        msg: 'Authentication failed.' 
      });
    }
  }
};

export default jwtAuth;