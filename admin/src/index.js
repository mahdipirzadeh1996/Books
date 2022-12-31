import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { UserContextProvider } from "./context/userContext/UserContext";
import { BookContextProvider } from './context/bookContext/BookContext';
import { ListContextProvider } from './context/listContext/ListContext';

import "./index.css";

window.$url = "http://localhost:8800/";

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <UserContextProvider>
                <BookContextProvider>
                    <ListContextProvider>
                        <App />
                    </ListContextProvider>
                </BookContextProvider>
            </UserContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
