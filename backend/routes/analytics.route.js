
import express from "express"
import {getAnalyticsReport} from "../controller/analytics.controller.js"
import { authValidator } from "../middleware/authValidator.js";
import { roleValidator } from "../middleware/roleValidator.js";

const router = express.Router();



router.get("/", authValidator, roleValidator, getAnalyticsReport)



export default router;