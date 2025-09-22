import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/UserService";
import { isSuccess } from "../utils/Utils";
import { showToast } from "../utils/ShowToast";
import { setUser } from "../redux/userRedux";
import { useDispatch } from "react-redux";

export const LoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    
    async function handleFormSubmit(e){
        e.preventDefault();
        const loginDetails = {email, password};
        const res = await login(loginDetails);
        showToast(res);
        if(isSuccess(res)) {
            dispatch(setUser(res.data));
            navigate("/");
        }
    }

    return (
        <section className="flex justify-center items-center py-20">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Email</label>
                <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" 
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 mb-2 text-left">Password</label>
                <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" 
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">Login</button>
            </form>
            <p className="mt-4 text-center text-gray-600">Don't have an account? <Link className="text-indigo-600" to={"/signup"}>Sign Up</Link></p>
            </div>
        </section>
    );
}