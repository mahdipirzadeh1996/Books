import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/login/Login";
import App from "./App";
import NotFound from "./pages/notFound/NotFound";

const LoginRoute = () => {
    return (
        <Router>
            <Switch>
                <Route path='/login'>
                    <Login />
                </Route>
                <Route exact path='/'>
                    <App />
                </Route>
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    );
};

export default LoginRoute;