import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookies from "cookie-parser";
import { DBconnection, corsOrigins } from "./configs/index.js";
import { products, users } from "./routes/index.js";

// Configs
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors(corsOrigins));
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api/users", users);
app.use("/api/products", products);

// MongoDB
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Running On [http://localhost:${PORT}] 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disabled 😢`));

// Server
app.listen(PORT);
