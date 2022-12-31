export const bookStart = () => ({
    type: "BOOK_START"
});
export const bookSuccess = (book) => ({
    type: "BOOK_SUCCESS",
    payload: book,
});
export const bookFailure = () => ({
    type: "BOOK_FAILURE"
});