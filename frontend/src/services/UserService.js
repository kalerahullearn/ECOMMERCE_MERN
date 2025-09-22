import axios from "../lib/axios"
import { getErrResponse } from "../utils/Utils";

export const signupUser = async (userToRegister) => {
    try{
        const res = await axios.post("/api/v1/auth/register", userToRegister);
        return { status: res.status, data: res.data };
    }catch(err){
       return getErrResponse(err);
    }
}

export const login = async (login) => {
    try{
        const res = await axios.post("/api/v1/auth/login", login);
        return { status: res.status, data: res.data };
    }catch(err){
       return getErrResponse(err);
    }
}