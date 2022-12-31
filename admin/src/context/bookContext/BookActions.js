export const getBooksStart = () => ({
    type: "GET_BOOKS_START"
});
export const getBooksSuccess = (books) => ({
    type: "GET_BOOKS_SUCCESS",
    payload: books
});
export const getBooksFailure = () => ({
    type: "GET_BOOKS_FAILURE"
});
////////////////////////////////////////////
export const createBookStart = () => ({
    type: "CREATE_BOOK_START"
});
export const createBookSuccess = (book) => ({
    type: "CREATE_BOOK_SUCCESS",
    payload: book
});
export const createBookFailure = () => ({
    type: "CREATE_BOOK_FAILURE"
});
////////////////////////////////////////////
export const updateBookStart = () => ({
    type: "UPDATE_BOOK_START"
});
export const updateBookSuccess = (book) => ({
    type: "UPDATE_BOOK_SUCCESS",
    payload: book
});
export const updateBookFailure = () => ({
    type: "UPDATE_BOOK_FAILURE"
});
////////////////////////////////////////////
export const deleteBookStart = () => ({
    type: "DELETE_BOOK_START"
});
export const deleteBookSuccess = (id) => ({
    type: "DELETE_BOOK_SUCCESS",
    payload: id
});
export const deleteBookFailure = () => ({
    type: "DELETE_BOOK_FAILURE"
});