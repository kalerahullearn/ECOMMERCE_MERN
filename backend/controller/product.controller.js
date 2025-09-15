import {Product} from "../model/product.model.js"
import cloudinary from "../util/cloudinary.js"

export const getProductById = async (req, res) => {
    console.log("getProductById");
    res.status(200).json({})
}

export const getFeaturedProducts = async (req, res) => {
    console.log("getFeatiredProducts");
    res.status(200).json({})
}

export const getProducts = async(req, res) => {
    console.log("getProducts");
    res.status(200).json({})
}

export const uploadProductImage = async (imagePath) => {
    var cloudinaryResponse = null;
    if(imagePath){
        cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {folder: "products"});
    }
    return cloudinaryResponse?.secure_url ? cloudinaryResponse?.secure_url : "";
}

export const createProduct = async (req, res) => {
    try {
        const {name, description, category, price, isFeatured} = req.body;
        const cloudinaryImagePath = await uploadProductImage(req.file.path);
        const productCreated = await Product.create({
            name, 
            description, 
            category, 
            price, 
            isFeatured, 
            image: cloudinaryImagePath
        });
        res.status(201).json({message: "Product is saved", data:productCreated});
    }catch (err){
        console.log(err);
        res.status(400).json({message: err.message});
    }  
}

export const updateProduct = async (req, res) => {
    console.log("updateProduct");
    res.status(200).json({})
}

export const deleteProduct = async (req, res) => {
     console.log("deleteProduct");
    res.status(200).json({})
}