import { Product } from "../model/product.model.js";
import { User } from "../model/user.model.js";
import { Order } from "../model/order.model.js"

export const getAnalyticsReport = async (req, res) => {
    try {
        const startDate = new Date(Date.now() * 24 * 60 * 60 * 1000);
        const endDate = new Date();
        
        const salesData = getSalesData(startDate, endDate);
        const analyticsData = await getAnalyticsData();


        res.status(200).json({message: "Analytiocs report fetched successfully", data:{
            analyticsData,
            salesData
        }});
    } catch(err){
        console.log(err)
        res.status(500).json({message: "Analytics report could not be fetched"})
    }   

}

const getSalesData = async(startDate, endDate) => {
    
    const dailySalesData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                },
            },
        },
        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
                sales: {$sum: 1},
                revenue: {$sum: "$totalAmount"}
            }
        },
        {$sort: {_id:1}},
    ]);

    const dateArray = getDateArrayInRange(startDate, endDate);
    return dateArray.map(date => {
        const foundData = dailySalesData.find(item => item._id === date);
        return {
            date,
            sales: foundData.sales || 0,
            revenue: foundData.revenue || 0,

        }
    });
}

const getDateArrayInRange = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate <= endDate) {
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

const getAnalyticsData = async () => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate({
        $group: {
            _id: null,
            totalSales: {$sum:1},
            totalRevenu: {$sum:"$totalAmount"}
        }
    })

    const {totalSales, totalRevenue} = salesData[0] || {totalSales:0, totalRevenue:0};

    return {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue
    }
}