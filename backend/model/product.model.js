import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    isFeatured: {
        type: String,
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

export const Product = mongoose.model("Product", productSchema);