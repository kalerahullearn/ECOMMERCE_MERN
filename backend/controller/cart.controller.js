        
import {getUserById} from "./auth.controller.js"

export const getCart = async (req, res) => {
    const userById = await getUserById(req.user.id);
    res.status(200).json({message: "Cart is fetched successfully", data: userById.cartItems})
}

export const updateCart = async (req, res) => {
    try {
        const userById = await getUserById(req.user.id);

        const {quantity, product} = req.body;
        let cartItems = userById.cartItems || [];
        const cartProduct = cartItems.find(cartItem => cartItem.product == product);
        if(cartProduct) {
            cartProduct.quantity += quantity;
            if(cartProduct.quantity <= 0) cartItems = cartItems.find(cartItem => cartItem.product != product);
        } else{
            cartItems.push({quantity: 1, product});
        }
        
        userById.cartItems = cartItems;
        userById.save();

        res.status(200).json({message: "Cart is updated successfully", data: userById.cartItems});
    } catch(err){
        console.log(err);
        res.status(400).json({message: err.message})
    }
}