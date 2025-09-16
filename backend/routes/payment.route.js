import express from "express"
import {createCheckoutSession, checkoutSuccess} from "../controller/payment.controller.js";
import {authValidator} from "../middleware/authValidator.js"
const router = express.Router();

router.post("/create-checkout-session", authValidator, createCheckoutSession);
router.post("/checkout-success", authValidator, checkoutSuccess);

export default router;