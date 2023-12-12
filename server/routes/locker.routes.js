import express from "express";
import { GET_LOCKER_DETAILS } from "../controllers/locker/GET.js";
import { APPEND_TO_LOCKER } from "../controllers/locker/CREATE.js";

export const router = express.Router();

// GET
router.get("/get-locker-prices", GET_LOCKER_DETAILS);

// CREATE
router.post("/append-to-locker", APPEND_TO_LOCKER);

// UPDATE

// DELETE
