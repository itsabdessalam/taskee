/* eslint-disable no-unused-vars */
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../components";

import { Header, Footer, Container } from "../layouts";

import Home from "../pages/home";
import Login from "../pages/login";

const Layout = ({ children, ...props }) => {
  const location = useLocation();
  const fullPages = ["/login"];

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
        </Switch>
      </Container>
      {!isFullPage(currentPage) ? <Footer /> : null}
    </>
  );
};

export default Layout;
