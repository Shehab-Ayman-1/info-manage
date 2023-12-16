import express from "express";
// GET
import { GET_TABLES_LIST, GET_BALANCES, GET_PROFILE } from "../controllers/index.js";
import { GET_PRODUCTS_LIST, GET_SUPPLIERS_LIST, GET_SEARCH_LIST } from "../controllers/index.js";
import { GET_NEEDED_PRODUCTS, GET_LESS_BUYS } from "../controllers/index.js";
import { GET_PRODUCTS_BY_DATE } from "../controllers/index.js";

// CREATE
import { CREATE_CATEGORY, CREATE_COMPANY, CREATE_PRODUCTS, CREATE_SUPPLIER } from "../controllers/index.js";

// UPDATE
import { BUY_PRODUCTS, SALE_PRODUCTS, EDIT_PRICE, TRANSFER_PRODUCTS } from "../controllers/index.js";

// DELETE
import { DELETE_PRODUCT } from "../controllers/index.js";

export const router = express.Router();

// GET
router.get("/get-products-list", GET_PRODUCTS_LIST);
router.get("/get-suppliers-list", GET_SUPPLIERS_LIST);
router.get("/get-table-list", GET_TABLES_LIST);
router.get("/get-search-list", GET_SEARCH_LIST);
router.get("/get-balances", GET_BALANCES);
router.get("/get-profile/:companyId/:productId", GET_PROFILE);

// GET [Analysis]
router.get("/get-needed-products", GET_NEEDED_PRODUCTS);
router.get("/get-less-buys", GET_LESS_BUYS);
router.get("/get-products-by-date", GET_PRODUCTS_BY_DATE);

// CREATE
router.post("/create-category", CREATE_CATEGORY);
router.post("/create-company", CREATE_COMPANY);
router.post("/create-products", CREATE_PRODUCTS);
router.post("/create-supplier", CREATE_SUPPLIER);

// UPDATE
router.put("/buy-products", BUY_PRODUCTS);
router.put("/sale-products", SALE_PRODUCTS);
router.put("/edit-price/:companyId/:productId", EDIT_PRICE);
router.put("/transfer-products/:process", TRANSFER_PRODUCTS);

// DELETE
router.delete("/delete-product/:companyId/:productId", DELETE_PRODUCT);
