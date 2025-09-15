import express from "express"
import {validateCoupon, getCoupon, addCoupon, toggleActive} from "../controller/coupon.controller.js"

const router = express.Router();

router.get("/validate", validateCoupon);
router.get("/:id", getCoupon);
router.post("/", addCoupon);
router.patch("/toggle/active", toggleActive);

export default router;