import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Header = () => {
    return (
        <nav className="bg-white shadow-md">
                <div className="container mx-auto flex justify-between items-center p-4">
                <a href="index.html" className="text-2xl font-bold text-indigo-600">My Shop</a>
                <div>
                    <a href="login.html" className="text-gray-700 hover:text-indigo-600 px-4">Login</a>
                </div>
                </div>
            </nav>
    );
}