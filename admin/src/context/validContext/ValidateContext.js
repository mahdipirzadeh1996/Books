import React, { createContext, useReducer, useEffect } from "react";

import ValidateReducer from "./ValidateReducer";

const INITIAL_STATE = {
    phone: JSON.parse(localStorage.getItem("phone")) || null,
    isFetching: false,
    error: false,
};

export const ValidateContext = createContext(INITIAL_STATE);

export const ValidateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ValidateReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("phone", JSON.stringify(state.phone));
    }, [state.phone]);

    return (
        <ValidateContext.Provider
            value={{
                phone: state.phone,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </ValidateContext.Provider>
    )
}