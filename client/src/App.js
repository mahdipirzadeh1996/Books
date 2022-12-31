import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ValidateContext } from "./context/validContext/ValidateContext";
import { StatusContext } from "./context/statusContext/StatusContext";

import './App.css';
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Auth from "./pages/auth/Auth";
import Validate from "./pages/validate/Validate";
import SearchEngin from "./pages/search/SearchEngin";
import Blocked from "./pages/blocked/Blocked";
import BookItem from "./pages/bookItem/BookItem";
import BookDemo from "./pages/bookDemo/BookDemo";
import NotFound from "./pages/notFound/NotFound";

function App() {
  const [block, setBlock] = useState(false);

  const { phone } = useContext(ValidateContext);
  //const phone = true;
  const { status } = useContext(StatusContext);

  useEffect(() => {
    if (status === 0) {
      setBlock(false);
    } else if (status === 1) {
      setBlock(true);
    }
  }, [status]);

  return (
    <Router>
      <Switch>

        <Route path={"/"} exact>
          <Home />
        </Route>
        <Route path="/books">
          <Home type={"books"} />
        </Route>
        <Route path="/articles">
          <Home type={"articles"} />
        </Route>

        <Route path={"/register"}>
          <Redirect />
        </Route>
        <Route path={"/auth"}>
          <Auth />
        </Route>
        <Route path={"/validate"}>
          <Validate />
        </Route>


        <Route path={"/blocked"}>
          {block ? <Blocked /> : <Redirect to={"/"} />}
        </Route>

        <Route path={"/bookdemo"}>
          <BookDemo />
        </Route>
        <Route path={"/book/:name"}>
          <BookItem />
        </Route>
        <Route path={"/search"}>
          <SearchEngin />
        </Route>

        {/* <Route path={"/"} exact>
          {phone ? !block ? <Home /> : <Redirect to={"/blocked"} /> : <Redirect to={"/auth"} />}
        </Route> */}

        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
