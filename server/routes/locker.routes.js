import express from "express";
import { GET_LOCKER_DETAILS, GET_NOTIFIES, GET_TOTAL_CASH } from "../controllers/locker/GET.js";
import { APPEND_TO_LOCKER } from "../controllers/locker/CREATE.js";

export const router = express.Router();

// GET
router.get("/get-locker-details", GET_LOCKER_DETAILS);
router.get("/get-total-cash", GET_TOTAL_CASH);
router.get("/get-notifies", GET_NOTIFIES);

// CREATE
router.post("/append-to-locker", APPEND_TO_LOCKER);
