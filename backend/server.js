import express from "express"
import dotenv from "dotenv"
dotenv.config();

const router = express.Router();
const app = express();
app.use(express.json());

router.get("/api/v1/health", (req, res) => {
    res.status(200).json({message: "Server is up and running"});
})

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`Server started on port ${PORT}`)
})
