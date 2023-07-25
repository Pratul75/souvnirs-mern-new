const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
};
exports.success = (data) => {
    const response = { ...defaultResponseObject };
    response.data = data;
    return response;
};
exports.error = (e) => {
    const response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    return response;
};