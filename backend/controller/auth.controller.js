import {User} from "../model/user.model.js"
import { addTokenCookie, clearCookie } from "../util/cookie.js";
import {generateAccessToken, generateRefreshToken} from "../util/jwt.js"
import redis, { addCache, removeCache } from "../util/redis.js"

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const userToSave = new User({name, email, password});
        const userSaved = await userToSave.save();
        res.status(201).send({message: "User is registered", data: userSaved});
    } catch(err){
        res.status(400).send({message: err.message});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userByEmail = await User.findOne({email: email});
        if(!userByEmail) throw new Error("Username or password is incorrect");
        
        const isMatch = await userByEmail.comparePassword(password);
        if(!isMatch) throw new Error("Username or password in incorrect");

        const accessToken = generateAccessToken(userByEmail);
        const refreshToken = generateRefreshToken(userByEmail);
        await addTokenCookie(res, accessToken, refreshToken);

        addCache(userByEmail, refreshToken, 7 * 24 * 60 * 60);

        res.status(200).send({message: "User is logged in successfully"});
    } catch(err) {
        res.status(401).json({message: err.message});   
    }
}

export const logoutUser = async(req, res) => {
    try {
        const user = req.user;
        await clearCookie(res);
        await removeCache(user.email);

        res.status(200).json({message: "User is logged out successfully"});   
    } catch (err) {
        res.status(400).json({message: err.message});   
    }
    
}

