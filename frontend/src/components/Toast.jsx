import { toast, ToastContainer } from "react-toastify";

export const Toast = () => {
    
    return (
        <ToastContainer
                position="top-center"   // position of the toasts
                autoClose={3000}       // auto close in 3s
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    );
}