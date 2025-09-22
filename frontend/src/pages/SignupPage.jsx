import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { signupUser } from "../services/UserService";
import { showErrorToast, showToast } from "../utils/ShowToast";
import { Link, useNavigate } from "react-router-dom";
import { isSuccess } from "../utils/Utils";

export const SignupPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    async function handleSubmit(e){
        e.preventDefault();
        console.log(formData);
        if(formData.password != formData.confirmPassword){
            showErrorToast("Passwords does not match");
            return;
        }
        const res = await signupUser(formData);
        showToast(res);
        if(isSuccess(res)) navigate("/login")
    }

    function handleFieldChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <Header />
            <section className="flex justify-center items-center py-20">
                <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left">Full Name</label>
                        <input type="text" className="w-full border rounded px-3 py-2" placeholder="Your Name"
                        name="name" 
                        value={formData?.name} 
                        onChange={handleFieldChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left">Email</label>
                        <input type="email" className="w-full border rounded px-3 py-2" placeholder="you@example.com" 
                        name="email"
                        value={formData?.email}
                        onChange={handleFieldChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left">Password</label>
                        <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" 
                        name="password"
                        value={formData?.password}
                        onChange={handleFieldChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-left">Confirm Password</label>
                        <input type="password" className="w-full border rounded px-3 py-2 mb-4" placeholder="Confirm Password"
                        name="confirmPassword" 
                        value={formData?.confirmPassword}
                        onChange={handleFieldChange}/>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-500">Sign Up</button>
                </form>
                <p className="mt-4 text-center text-gray-600">Already have an account? <Link className="text-indigo-600" to={"/login"}>Login</Link></p>
                </div>
            </section>

            <Footer />
        </div>
    );
}