export const isSuccess = (response) => {
    return response.status == 200 || response.status == 201;
}