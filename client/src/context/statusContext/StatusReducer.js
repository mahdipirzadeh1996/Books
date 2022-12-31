const StatusReducer = (state, action) => {
    switch (action.type) {
        case "STATUS_START":
            return {
                status: null,
                isFetching: true,
                error: false,
            };
        case "STATUS_SUCCESS":
            return {
                status: action.payload,
                isFetching: false,
                error: false,
            };
        case "STATUS_FAILURE":
            return {
                status: null,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
}

export default StatusReducer;