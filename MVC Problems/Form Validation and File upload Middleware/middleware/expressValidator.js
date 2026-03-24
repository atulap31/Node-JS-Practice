// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from "express-validator";

export const formValidation = async (req, res, next) => {
  // Write your code here
  
  // Define validation rules
  await body('name')
    .notEmpty()
    .withMessage('Name is required')
    .run(req);
    
  await body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .run(req);
    
  await body('image')
    .custom((value, { req }) => {
      return req.file !== undefined;
    })
    .withMessage('Profile image is required')
    .run(req);
  
  // Check for validation errors
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  next();
};