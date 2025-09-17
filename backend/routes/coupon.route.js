import express from "express"
import {validateCoupon, getCouponsByUserId, addCoupon, toggleActive} from "../controller/coupon.controller.js"
import { authValidator } from "../middleware/authValidator.js";
import { roleValidator } from "../middleware/roleValidator.js";

const router = express.Router();

router.get("/validate", authValidator, validateCoupon);
router.get("/",  authValidator, getCouponsByUserId);
router.post("/",  authValidator, roleValidator, addCoupon);
router.patch("/toggle/active",  authValidator, authValidator, toggleActive);

export default router;