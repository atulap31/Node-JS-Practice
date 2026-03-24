// Please don't change the pre-written code
// Import the necessary modules here

export const generateRandomNumber = (req, res, next) => {
  const randomNumber = Math.floor(Math.random() * 10) + 1;

  // Write your code here to set the randomNumber as a cookie with a 1-day expiration.
  // Set the random number as a cookie
  res.cookie("randomNumber", randomNumber, {
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
  });

  // Keep the existing attemptsLeft cookie
  res.cookie("attemptsLeft", 2, {
    maxAge: 1 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  
  next();
};