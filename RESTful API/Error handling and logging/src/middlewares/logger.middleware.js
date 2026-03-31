// Please don't change the pre-written code
// Import the necessary modules here
import winston from "winston";

export const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => new Date().toString(),
    }),
    winston.format.printf(({ level, timestamp, message, ...meta }) => {
      return JSON.stringify({
        level,
        timestamp,
        ...meta,
        "error message": message,
      });
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});