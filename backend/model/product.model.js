import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    isFeatured: {
        type: boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    }
}, {timestamp: true});

export default Product = mongoose.model("Product", productSchema);