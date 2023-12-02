import express from "express";
import { GET_LISTS, GET_CATEGORIES, GET_COMPANIES, GET_PRODUCTS, GET_SUPPLIERS_LISTS, GET_TABLES_LISTS } from "../controllers/index.js";
import { CREATE_CATEGORY, CREATE_COMPANY, CREATE_PRODUCTS, CREATE_SUPPLIER } from "../controllers/index.js";
import { BUY_PRODUCTS, SALE_PRODUCTS } from "../controllers/index.js";
import {} from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-lists", GET_LISTS);
router.get("/get-suppliers-list", GET_SUPPLIERS_LISTS);
router.get("/get-table-lists", GET_TABLES_LISTS);
router.get("/get-categories", GET_CATEGORIES);
router.get("/get-companies", GET_COMPANIES);
router.get("/get-products", GET_PRODUCTS);

// CREATE
router.post("/create-category", CREATE_CATEGORY);
router.post("/create-company", CREATE_COMPANY);
router.post("/create-products", CREATE_PRODUCTS);
router.post("/create-supplier", CREATE_SUPPLIER);

// UPDATE
router.put("/update-product/:id", CREATE_PRODUCTS);
router.put("/buy-products", BUY_PRODUCTS);
router.put("/sale-products", SALE_PRODUCTS);

// DELETE
router.delete("/delete-product/:id", CREATE_PRODUCTS);
