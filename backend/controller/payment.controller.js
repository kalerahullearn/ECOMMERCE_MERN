import { Coupon } from "../model/coupon.model.js";
import { User } from "../model/user.model.js"


export const checkoutSuccess = async(req, res) => {
    
    try {
        const {sessionId} = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if(session.payment_status == "paid"){
            if(session.metadata.couponCode){
                await Coupon.findOneAndUpdate({
                    code: session.metadata.couponCode,
                    userId: session.metadata.userId
                },{
                    isActive: false
                });
            }

            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user: session.metadata.userId,
                stripeSessionId: sessionId,
                totalAmount: session.amount_total / 100,
                products: products.map(product => {
                    return {
                        product: product.id,
                        quantity: product.quantity,
                        price: product.price
                    }
                })
            });
            await newOrder.save();
        }

        res.status(200).json({message: "Order created successfully", orderId: newOrder._id})
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Payment is not successful"})
    }
}

export const createCheckoutSession = async (req, res) => {
    
    try {
        const userById = User.findById(req.user.id);
        const cartItems = userById.cartItems;
        const { couponCode } = req.body;
        let totalAmount = 0;
        const lineItems = cartItems.map(cartItem => { 
            const amount = Math.round(product.price * 100);
            totalAmount += cartItem.quantity * amount;

            return {
                price_data:{
                    currency: "usd",
                    product_data: {
                        name: cartItem.name,
                        image: [cartItem.image]
                    },
                    unit_amount: amount
                }
            }
        });

        if(couponCode){
            const couponByUserId = Coupon.findOne({
                userId: req.user.id,
                code: couponCode,
                isActive: true,
            });
            if(couponByUserId){
                totalAmount = totalAmount * ((100-couponByUserId.discountPercentage)/100)
            }
        }

        const session = await stripe.checkout.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon ? [
                {
                    coupon: await createStripeCoupon(coupon.discountPercentage)
                }
            ] : [],
            metadata: {
                userId: req.user.id,
                couponCode: couponCode || ""
            }
        });

        if(totalAmount >= 2000){
            await createNewCoupon(req.user.id)
        }
        res.status(200).json({message: "Order is successful", id:session.id, totalAmount: totalAmount/100})
    } catch (error) {
        res.status(400).json({message: error.message});
    }

}


const createNewCoupon = async(userId) => {
    const newCoupon = new Coupon({
        code: "GIFT"+Math.random().toString(36).substring(2,8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: userId
    });
    await newCoupon.save();
}

const createStripeCoupon = async (discountPercentage) => {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "Once"
    });
    return coupon.id;
}