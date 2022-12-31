const ListReducer = (state, action) => {
    switch (action.type) {
        case "LIST_START":
            return {
                lists: null,
                isFetching: true,
                error: false,
            };
        case "LIST_SUCCESS":
            return {
                lists: action.payload,
                isFetching: false,
                error: false,
            };
        case "LIST_FAILURE":
            return {
                lists: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default ListReducer;