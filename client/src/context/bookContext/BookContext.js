import React, { createContext, useReducer } from "react";

import BookReducer from "./BookReducer";

const INITIAL_STATE = {
    book: null,
    isFetching: false,
    error: false,
};

export const BookContext = createContext(INITIAL_STATE);

export const BookContextProvider = ({ children }) => {
    const [state, dispatchh] = useReducer(BookReducer, INITIAL_STATE);

    return (
        <BookContext.Provider
            value={{ 
                book: state.book, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatchh
            }}
        >
            {children}
        </BookContext.Provider>
    )
}