import express from "express"
import { getMe, loginUser, logoutUser, registerUser } from "../controller/auth.controller.js";
import { authValidator } from "../middleware/authValidator.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authValidator, logoutUser);
router.post("/me", authValidator, getMe);


export default router;
