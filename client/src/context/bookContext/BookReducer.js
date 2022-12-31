const BookReducer = (state, action) => {
    switch (action.type) {
        case "BOOK_START":
            return {
                book: null,
                isFetching: true,
                error: false,
            };
        case "BOOK_SUCCESS":
            return {
                book: action.payload,
                isFetching: false,
                error: false,
            };
        case "BOOK_FAILURE":
            return {
                book: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default BookReducer;