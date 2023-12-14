import express from "express";
import { GET_CLIENTS_NAMES, GET_CLIENTS_LIST, GET_BILLS, GET_BILL } from "../controllers/bills/GET.js";
import { CREATE_CLIENT } from "../controllers/bills/CREATE.js";
import { PAYMENT } from "../controllers/bills/UPDATE.js";
import { DELETE_BILL } from "../controllers/bills/DELETE.js";

export const router = express.Router();

// GET
router.get("/get-clients", GET_CLIENTS_NAMES);
router.get("/get-clients-list", GET_CLIENTS_LIST);
router.get("/get-bills", GET_BILLS);
router.get("/get-bill/:id", GET_BILL);

// CREATE
router.post("/create-client", CREATE_CLIENT);

// UPDATE
router.put("/payment", PAYMENT);

// DELETE
router.delete("/delete-bill/:id", DELETE_BILL);
