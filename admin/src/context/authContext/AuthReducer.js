const AuthReducer = (state, action) => {
    switch (action.type) {
        case "AUTH_START":
            return {
                phone: null,
                isFetching: true,
                error: false,
            };
        case "AUTH_SUCCESS":
            return {
                phone: action.payload,
                isFetching: false,
                error: false,
            };
        case "AUTH_FAILURE":
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

export default AuthReducer;