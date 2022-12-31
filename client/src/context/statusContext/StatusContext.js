import React, { useEffect, createContext, useReducer } from "react";

import StatusReducer from "./StatusReducer";
import { checkStatus } from "./apiCalls";

const INITIAL_STATE = {
    status: null,
    isFetching: false,
    error: false,
};

export const StatusContext = createContext(INITIAL_STATE);

export const StatusContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StatusReducer, INITIAL_STATE);

    useEffect(() => {
        checkStatus(dispatch);
    }, []);

    return (
        <StatusContext.Provider
            value={{ 
                status: state.status, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
            }}
        >
            {children}
        </StatusContext.Provider>
    )
}