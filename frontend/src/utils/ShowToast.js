import { toast } from "react-toastify";

export const showToast = (response) => {
    response.status == 200 || response.status == 201 ? toast.success(response.data.message):toast.error(response.data.message);
}

export const showErrorToast = (message) => {
    toast.error(message);
}

export const showSuccessToast = (message) => {
    toast.success(message);
}