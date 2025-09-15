import express from "express";
import {authValidator} from "../middleware/authValidator.js"
import {roleValidator} from "../middleware/roleValidator.js"

const outer = express.Router();


router.get("/all", authValidator, getProducts);
router.get("/:id", authValidator, getProductById);

router.post("/", authValidator, roleValidator, createProduct);
router.patch("/", authValidator, roleValidator, updateProduct);