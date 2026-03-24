// Please don't change the pre-written code
// Import the necessary modules here

export const formValidationMiddleware = (req, res, next) => {
  // Write your code here
  const { name, email, mobile } = req.body;
  
  // Validation checks
  const errors = {};
  
  // Name validation (same as controller)
  if (name == null || name.length < 5) {
    errors.name = "enter valid name of length greater than 4";
  }
  
  // Only validate email if it's provided in the request
  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }
  }
  
  // Mobile validation (same as controller)
  if (mobile == null || mobile.length < 10) {
    errors.mobile = "enter valid mobile number of 10 digits";
  }
  
  // If there are validation errors, return 401 with errors
  if (Object.keys(errors).length > 0) {
    return res.status(401).send(errors);
  }
  
  // If validation passes, proceed to next middleware/controller
  next();
};