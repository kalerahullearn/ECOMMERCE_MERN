import jwt from "jsonwebtoken";
import { getCookie } from "../util/cookie.js";

export const authValidator = async (req, res, next) => {
    
    try {
        const accessToken = getCookie(req, "accessToken");
        if(!accessToken) throw new Error("User is not authorized");

        const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        console.log(decodedAccessToken);
        req.user = decodedAccessToken;
        next();
    } catch(err) {
        console.log(err);
        res.status(400).send({message: err.message});
    }
}