// Please don't change the pre-written code
// Import the necessary modules here
import { logger } from "./logger.middleware.js";

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Determine status code
  const statusCode = err instanceof customErrorHandler ? err.statusCode : 500;

  // Determine message
  const message =
    err instanceof customErrorHandler
      ? err.message
      : "Oops! Something went wrong... Please try again later!";

  // Log error using Winston
  logger.error({
    level: "error",
    timestamp: new Date().toString(),
    "request URL": req.originalUrl,
    "error message": err.message,
  });

  // Send response
  res.status(statusCode).json({
    success: false,
    message: message,
  });
};