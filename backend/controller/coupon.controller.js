import {Coupon} from "../model/coupon.model.js"


export const getCouponsByUserId = async (req, res) => {
    const couponsByUserId = await Coupon.find({
        userId: req.user.id
    });
    res.status(200).json({message: "Coupon is fetched", data: couponsByUserId});
}

export const validateCoupon = async (req, res) => {
    try {
        const {code}  = req.body;
        const couponByCode = await Coupon.findOne({code, userId: req.user.id});
        if(!couponByCode) throw new Error("Coupon code not found");
        if(!couponByCode.isActive) throw new Error("Coupon code is not active");
        if(couponByCode.expirationDate < new Date()) throw new Error("Coupon code is expired");

        couponByCode.isActive = false;
        await couponByCode.save();
        res.status(200).json({message: "Coupon is valid", data: couponByCode})
    } catch(err){
        console.error(err);
        res.status(400).json({message: err.message})
    }
}


export const getCoupons = async (req, res) => {
    const coupons = Coupon.find();
    res.status(200).json({message: "Coupons are fetched", data: coupons});
}

export const addCoupon = async (req, res) => {
    
    try {
        const userId = req.user.id;
        const {code, discountPercentage, expirationDate:expirationDateString, isActive} = req.body;
        console.log(expirationDateString);
        const expirationDate = new Date(expirationDateString);
        console.log(expirationDate);
        const couponCreated = await Coupon.create(
            {
                code, 
                discountPercentage, 
                expirationDate:expirationDate, 
                isActive,
                userId
            }
        )

        res.status(201).json({message: "Coupon is added for user", data: couponCreated});
    } catch(err) {
        console.error(err)
        res.status(400).json({message: err.message});
    }
}

export const toggleActive = async (req, res) => {

}