import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();
import authRoutes from "./routes/auth.route.js"
import { connectDb } from "./util/db.js";
import productRoutes from "./routes/product.route.js"
// import cartRoutes from "./routes/cart.route.js"


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/cart", cartRoutes);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connectDb(MONGO_URI).then(() => {
    console.log(`Database is connected`);
    app.listen(PORT, (req, res) => {
        console.log(`Server started on port ${PORT}`)
    })
})

