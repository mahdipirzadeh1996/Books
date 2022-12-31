import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import List from "./pages/list/List";
import NewListItem from "./pages/newListItem/NewListItem";
import ListItem from "./pages/listItem/ListItem";
import NotFound from "./pages/notFound/NotFound";
import Auth from "./pages/auth/Auth";
import Validate from "./pages/validate/Validate";

function App() {
    const [wrong, setWrong] = useState(false);
    const [login, setLogin] = useState(true);
    //const {user} = useContext(AuthContext);
    const pathname = window.location.pathname;

    useEffect(() => {
        console.log(pathname);

        if (pathname !== '/' && pathname !== '/users' && pathname !== '/books' && pathname !== '/product' && pathname !== '/newproduct' && pathname !== '/lists' && pathname !== '/newlistitem' && pathname !== '/listitem' && pathname !== '/auth' && pathname !== '/validate') {
            setWrong(true)
        }
    }, [])

    return (
        <Router>
            <Switch>
                {wrong ?
                    <Route path='*' component={NotFound} />
                    :
                    login ?
                        <>
                            <Redirect to={"/auth"} />
                            <Route exact path="/auth">
                                <Auth />
                            </Route>
                            <Route exact path="/validate">
                                <Validate />
                            </Route>
                        </>
                        :
                        <>
                            <Topbar />
                            <div className="container">
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route path="/users">
                                    <UserList />
                                </Route>
                                <Route path="/user/:userId">
                                    <User />
                                </Route>
                                <Route path="/books">
                                    <ProductList />
                                </Route>
                                <Route path="/product">
                                    <Product />
                                </Route>
                                <Route path="/newproduct">
                                    <NewProduct />
                                </Route>
                                <Route path="/lists">
                                    <List />
                                </Route>
                                <Route path="/newlistitem">
                                    <NewListItem />
                                </Route>
                                <Route path="/listitem">
                                    <ListItem />
                                </Route>
                                <Sidebar />
                            </div>
                        </>
                }
            </Switch>
        </Router>
    );
}

export default App;