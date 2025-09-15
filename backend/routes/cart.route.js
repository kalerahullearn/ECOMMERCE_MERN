import express from "express"
import { authValidator } from "../middleware/authValidator.js"
import {getCart, updateCart} from "../controller/cart.controller.js"

const router = express.Router();

router.get("/", authValidator, getCart);
router.put("/", authValidator, updateCart);

export default router;