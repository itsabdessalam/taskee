/* eslint-disable no-unused-vars */
import { Route, Switch, useLocation } from "react-router-dom";
import { Container, Navigation, Header } from "../layouts";
import { ThemeProvider } from "../context/Theme";
import { LocaleProvider } from "../context/Locale";
import { ProtectedRoute } from "../components";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";
import CreateNote from "../pages/createNote";
import Notes from "../pages/notes";
import EditorTest from "../pages/editorTest";

const Layout = ({ children, ...props }) => {
  const { pathname } = useLocation();
  const fullPages = ["/login", "/register", "/getting-started"];

  const isFullPage = page => {
    return fullPages.find(p => {
      return p === page;
    });
  };

  const cssClasses = isFullPage(pathname) ? "full" : null;

  return (
    <>
      <LocaleProvider>
        <ThemeProvider>
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
              <ProtectedRoute exact path="/notes">
                <Notes />
              </ProtectedRoute>
              <ProtectedRoute exact path="/notes/new">
                <CreateNote />
              </ProtectedRoute>
              <ProtectedRoute exact path="/notes/:id">
                <Notes />
              </ProtectedRoute>
            </Switch>
          </Container>
          {!isFullPage(pathname) ? <Navigation /> : null}
        </ThemeProvider>
      </LocaleProvider>
    </>
  );
};

export default Layout;
