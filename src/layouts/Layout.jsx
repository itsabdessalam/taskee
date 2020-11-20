import { Route, Switch, useLocation } from "react-router-dom";

import { Container, Footer, Header } from "../layouts";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";

const Layout = ({ children, ...props }) => {
  const location = useLocation();
  const fullPages = ["/login", "/register", "/getting-started"];

  const isFullPage = (page) => {
    return fullPages.find((p) => {
      return p === page;
    });
  };
  const currentPage = location.pathname;
  const cssClasses = isFullPage(currentPage) ? "full" : null;

  return (
    <>
      {!isFullPage(currentPage) ? <Header /> : null}
      <Container className={cssClasses}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/getting-started">
            <GettingStarted />
          </Route>
        </Switch>
      </Container>
      {!isFullPage(currentPage) ? <Footer /> : null}
    </>
  );
};

export default Layout;
