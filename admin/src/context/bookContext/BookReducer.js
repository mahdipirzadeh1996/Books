const BookReducer = (state, action) => {
    switch (action.type) {
        case "GET_BOOKS_START":
            return {
                books: [],
                isFetching: true,
                error: false,
            };
        case "GET_BOOKS_SUCCESS":
            return {
                books: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_BOOKS_FAILURE":
            return {
                books: [],
                isFetching: false,
                error: true,
            };

        case "CREATE_BOOK_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "CREATE_BOOK_SUCCESS":
            return {
                ...state,
                isFetching: false,
                error: false,
            };
        case "CREATE_BOOK_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

        case "UPDATE_BOOK_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "UPDATE_BOOK_SUCCESS":
            return {
                ...state,
                isFetching: false,
                error: false,
            };
        case "UPDATE_BOOK_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };

        case "DELETE_BOOK_START":
            return {
                books: {...state},
                isFetching: true,
                error: false,
            };
        case "DELETE_BOOK_SUCCESS":
            return {
                books: {...state},
                isFetching: false,
                error: false,
            };
        case "DELETE_BOOK_FAILURE":
            return {
                books: {...state},
                isFetching: false,
                error: true,
            };
        default:
            return {...state};
    }
}

export default BookReducer;