import express from "express"
import { loginUser, logoutUser, registerUser } from "../controller/auth.controller.js";
import { tokenValidator } from "../middleware/tokenValidator.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", tokenValidator, logoutUser);


export default router;
