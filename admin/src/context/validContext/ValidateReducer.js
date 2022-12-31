const ValidateReducer = (state, action) => {
    switch (action.type) {
        case "VALIDATE_START":
            return {
                phone: null,
                isFetching: true,
                error: false,
            };
        case "VALIDATE_SUCCESS":
            return {
                phone: action.payload,
                isFetching: false,
                error: false,
            };
        case "VALIDATE_FAILURE":
            return {
                phone: null,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                phone: null,
                isFetching: false,
                error: false,
            };
        default:
            return { ...state };
    }
}

export default ValidateReducer;