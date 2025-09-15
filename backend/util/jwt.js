import jwt from "jsonwebtoken";

export const generateAccessToken = async (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role}, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES });
}

export const generateRefreshToken = async (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role}, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES });
}

export const verifyAccessToken = async (accessToken) => {
    jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
}

export const verifyRefreshToken = async (refreshToken) => {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
}