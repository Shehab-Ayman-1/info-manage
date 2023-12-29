import express from "express";
import { GET_CLIENTS_NAMES, GET_CLIENTS_LIST, GET_BILLS, GET_BILL } from "../controllers/bills/GET.js";
import {
	GET_PRODUCT_MOVEMENT,
	GET_MONTHS_SALES,
	GET_MONTHS_WINS,
	GET_TODAY_RESET,
} from "../controllers/bills/GET.js";
import { CREATE_CLIENT } from "../controllers/bills/CREATE.js";
import { PAYMENT, UPDATE_BILL } from "../controllers/bills/UPDATE.js";
import { DELETE_BILL } from "../controllers/bills/DELETE.js";

export const router = express.Router();

// GET
router.get("/get-clients", GET_CLIENTS_NAMES);
router.get("/get-clients-list", GET_CLIENTS_LIST);
router.get("/get-bills", GET_BILLS);
router.get("/get-bill/:id", GET_BILL);

// GET [Analysis]
router.get("/get-product-movement", GET_PRODUCT_MOVEMENT);
router.get("/get-today-reset", GET_TODAY_RESET);
router.get("/get-months-sales", GET_MONTHS_SALES);
router.get("/get-months-wins", GET_MONTHS_WINS);

// CREATE
router.post("/create-client", CREATE_CLIENT);

// UPDATE
router.put("/payment", PAYMENT);
router.put("/update-bill/:billId", UPDATE_BILL);

// DELETE
router.delete("/delete-bill/:id", DELETE_BILL);
