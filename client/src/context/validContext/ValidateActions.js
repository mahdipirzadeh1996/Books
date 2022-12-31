export const validateStart = () => ({
    type: "VALIDATE_START"
});
export const validateSuccess = (phone) => ({
    type: "VALIDATE_SUCCESS",
    payload: phone,
});
export const validateFailure = () => ({
    type: "VALIDATE_FAILURE"
});

//LOGOUT
export const logout = () => ({
    type: "LOGOUT",
});