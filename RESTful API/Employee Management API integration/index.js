import express from "express";
import cors from "cors";
import empRoutes from "./routes/employee.route.js";
const app = express();

// Enable CORS for all routes
app.use(cors());

// You can also configure CORS more specifically if needed:
// app.use(cors({
//   origin: 'http://127.0.0.1:5500', // or the port where your Live Server runs
//   credentials: true
// }));

app.use("/api/v1/emp", empRoutes);

export default app;