export const isSuccess = (response) => {
    return response.status == 200 || response.status == 201;
}

export const getErrResponse = (err) => {
    if (err.response) {
        // Server responded with 400, 401, 500 etc
        return { status: err.response.status, data: err.response.data };
    } else if (err.request) {
        // Request was made but no response received
        return { status: 0, data: { message: "No response from server" } };
    } else {
        // Something else went wrong
        return { status: -1, data: { message: err.message } };
    }
    return {};
}