import {Product} from "../model/product.model.js"
import {uploadProductImage} from "../util/cloudinary.js"
import { addCache, getCache, removeCache } from "../util/redis.js";

export const getProductById = async (req, res) => {
    const {id:productId} = req.params;
    const productById = await Product.findById(productId);
    res.status(200).json({message: "Product is fetched", data: productById});
}

export const getFeaturedProducts = async (req, res) => {
    
    try {
        let featuredProducts = await getCache("featured");
        if(featuredProducts) return featuredProducts;

        featuredProducts = await Product.find({
            isFeatured: "true"
        });
        res.status(200).json({message: "Featured Products are fetched", data: featuredProducts});
    } catch(err){
        res.status(200).json({message: err.message});
    }
}

export const getProducts = async(req, res) => {
    const products = await Product.find();
    res.status(200).json({message: "Products are fetched", data: products});
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
        removeCache("featured");
        res.status(201).json({message: "Product is saved", data:productCreated});
    }catch (err){
        console.log(err);
        res.status(400).json({message: err.message});
    }  
}

export const updateProduct = async (req, res) => {
    
    try {
        const {id} = req.params;
        const {name, description, category, price, isFeatured} = req.body;
        const existingProduct = await Product.findById(id);
        
        existingProduct.name= name || existingProduct.name;
        existingProduct.description= description || existingProduct.description;
        existingProduct.category= category || existingProduct.category;
        existingProduct.price= price || existingProduct.price;
        existingProduct.isFeatured= isFeatured || existingProduct.isFeatured;

        const productUpdated = await existingProduct.save();
        removeCache("featured");
        res.status(200).send({message: "Product is updated", data: productUpdated});
    } catch(err){
        console.error(err);
        res.status(400).send({message: err.message});
    }
}

export const deleteProduct = async (req, res) => {
    
    try {
        const {id} = req.params;
        const productDeleted = Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product is deleted", data:productDeleted});
    } catch(err){
        res.status(400).json({message: err.message});
    }
}