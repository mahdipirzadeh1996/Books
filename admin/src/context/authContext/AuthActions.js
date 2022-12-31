export const authStart = () => ({
    type: "AUTH_START"
});
export const authSuccess = (phone) => ({
    type: "AUTH_SUCCESS",
    payload: phone,
});
export const authFailure = () => ({
    type: "AUTH_FAILURE"
});

//LOGOUT
export const logout = () => ({
    type: "LOGOUT",
});