// Please don't change the pre-written code
// Import the necessary modules here
import jwt from 'jsonwebtoken';
import { addUser, confirmLogin } from "../model/user.model.js";

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

export const registerUser = (req, res, next) => {
  const userData = req.body;
  if (userData) {
    let user = addUser(userData);
    res.status(201).send({ status: "success", user });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};

export const loginUser = (req, res) => {
  let status = confirmLogin(req.body);
  if (status && Object.keys(status).length > 0) {
    // Create the JWT token
    const token = jwt.sign(
      { 
        id: status.id,
        email: status.email,
        name: status.name
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    
    // Store the JWT token in a cookie named "jwtToken"
    res.cookie('jwtToken', token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: false, // Set to true in production with HTTPS
      maxAge: 3600000, // 1 hour in milliseconds
      sameSite: 'strict' // Protects against CSRF attacks
    });
    
    res
      .status(200)
      .json({ status: "success", msg: "login successful", token });
  } else {
    res.status(400).json({ status: "failure", msg: "invalid user details" });
  }
};