import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookies from "cookie-parser";
import { DBconnection, corsOrigins } from "./configs/index.js";
import { users, locker, products, bills } from "./routes/index.js";
import axios from "axios";

// Configs
dotenv.config();
export const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors(corsOrigins));
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes

// app.use("/*", (req, res, next) => setTimeout(next, 1000));
const MINUTES = 1000 * 60 * 1;
setInterval(() => axios.get("https://info-manage-client.vercel.app", MINUTES));
app.use("/api/users", users);
app.use("/api/locker", locker);
app.use("/api/products", products);
app.use("/api/bills", bills);
app.use("/*", (req, res) =>
	res.status(500).json({ status: 500, method: req.method, url: req.url, error: "Wronge path." })
);

// MongoDB
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Running On [http://localhost:${PORT}] 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disabled 😢`));

// Server
app.listen(PORT);
