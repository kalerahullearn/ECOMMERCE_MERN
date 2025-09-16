import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";
import { Order } from "../model/order.model.js"

export const getAnalyticsReport = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();

        const salesData = await Order.aggregate({
            $group: {
                _id: null,
                totalSales: {$sum:1},
                totalRevenu: {$sum:"$totalAmount"}
            }
        })

        res.status(200).json({message: "Analytiocs report fetched successfully", data:});
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Analytics report could not be fetched"})
    }
}