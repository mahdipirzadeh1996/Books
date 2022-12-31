export const listStart = () => ({
    type: "LIST_START"
});
export const listSuccess = (lists) => ({
    type: "LIST_SUCCESS",
    payload: lists,
});
export const listFailure = () => ({
    type: "LIST_FAILURE"
});