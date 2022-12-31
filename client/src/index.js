import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext/AuthContext';
import { ValidateContextProvider } from "./context/validContext/ValidateContext";
import { StatusContextProvider } from "./context/statusContext/StatusContext";
import { ListContextProvider } from "./context/listContext/ListContext";
import { BookContextProvider } from "./context/bookContext/BookContext";

window.$secret = 78951236;
window.$domain = "https://medibooks.ir/api/uploads/";
window.$api = "https://medibooks.ir/api";

ReactDOM.render(
  <AuthContextProvider>
    <ValidateContextProvider>
      <StatusContextProvider>
        <ListContextProvider>
          <BookContextProvider>
            <App />
          </BookContextProvider>
        </ListContextProvider>
      </StatusContextProvider>
    </ValidateContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);