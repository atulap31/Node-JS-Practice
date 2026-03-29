// Please don't change the pre-written code
// Import the necessary modules here
import fs from "fs";
// Write your code here

export const loggerMiddleware = async (req, res, next) => {
  // Write your code here
  const fsPromise = fs.promises;
  
  // Check if the request URL includes "/api/user" (the specific route we want to log)
  if (req.originalUrl.includes("/api/user")) {
    // Format: timestamp :- URL - {"key":"value"}
    const logData = `${new Date().toString()} :- ${req.originalUrl} - ${JSON.stringify(req.body)}\n`;
    
    try {
      await fsPromise.appendFile("log.txt", logData);
    } catch (err) {
      console.log(err);
    }
  }
  
  // Call next to continue the request flow
  next();
};

export default loggerMiddleware;