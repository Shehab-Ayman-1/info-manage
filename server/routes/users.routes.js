import express from "express";
import { LOGIN, REGISTER } from "../controllers/index.js";

export const router = express.Router();

// AUTH
router.post("/register", REGISTER);
router.post("/login", LOGIN);

// GET

// CREATE

// UPDATE

// DELETE
