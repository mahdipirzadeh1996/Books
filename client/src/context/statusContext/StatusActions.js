export const statusStart = () => ({
    type: "STATUS_START"
});
export const statusSuccess = (status) => ({
    type: "STATUS_SUCCESS",
    payload: status,
});
export const statusFailure = () => ({
    type: "STATUS_FAILURE"
});