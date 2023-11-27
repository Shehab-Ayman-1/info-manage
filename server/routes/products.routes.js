import express from "express";
import { GET_LIST, GET_CATEGORIES, GET_COMPANIES, GET_PRODUCTS } from "../controllers/index.js";
import { CREATE_CATEGORY, CREATE_COMPANY, CREATE_PRODUCTS } from "../controllers/index.js";
import {} from "../controllers/index.js";
import {} from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-lists", GET_LIST);
router.get("/get-categories", GET_CATEGORIES);
router.get("/get-companies", GET_COMPANIES);
router.get("/get-products", GET_PRODUCTS);

// CREATE
router.post("/create-category", CREATE_CATEGORY);
router.post("/create-company", CREATE_COMPANY);
router.post("/create-products", CREATE_PRODUCTS);

// UPDATE
router.put("/update-product/:id", CREATE_PRODUCTS);

// DELETE
router.delete("/delete-product/:id", CREATE_PRODUCTS);
