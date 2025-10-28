import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { authenticate } from "./middleware/authMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  const publicRoutes = [
    "/api/users/register",
    "/api/users/login"
  ];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  return authenticate(req, res, next);
});

app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("Error del servidor:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
  });
});

export default app;
