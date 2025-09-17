import express from "express";
import {authValidator} from "../middleware/authValidator.js"
import {roleValidator} from "../middleware/roleValidator.js"
import {getProducts,getFeaturedProducts,getProductById,createProduct,updateProduct,deleteProduct} from "../controller/product.controller.js"
import multer from "multer";
const upload = multer({ dest: "../uploads/" }); 

const router = express.Router();

router.get("/all", authValidator, getProducts);
router.get("/featured", authValidator, getFeaturedProducts);
router.get("/:id", authValidator, getProductById);

router.post("/", authValidator, roleValidator, upload.single("image"), createProduct);
router.patch("/:id", authValidator, roleValidator, updateProduct);
router.delete("/:id", authValidator, roleValidator, deleteProduct);


export default router;