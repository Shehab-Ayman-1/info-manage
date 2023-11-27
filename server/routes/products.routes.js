import express from "express";
import { CREATE_PRODUCT, GET_LIST, GET_PRODUCTS } from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-products", GET_PRODUCTS);
router.get("/get-lists", GET_LIST);

// CREATE
router.post("/create-product", CREATE_PRODUCT);

// UPDATE
router.put("/update-product/:id", CREATE_PRODUCT);

// DELETE
router.delete("/delete-product/:id", CREATE_PRODUCT);
