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
import Calendar from "../pages/calendar";

const Layout = ({ children, ...props }) => {
  const { pathname } = useLocation();
  const fullPages = ["/login", "/register", "/getting-started"];

  const isFullPage = page => {
    return fullPages.find(p => {
      return p === page;
    });
  };

  const cssClasses = [
    ...(isFullPage(pathname) ? ["full"] : []),
    ...(pathname.indexOf("/notes/") !== -1 ? ["editor"] : [])
  ].join(" ");
  return (
    <>
      <LocaleProvider>
        <ThemeProvider>
          {!isFullPage(pathname) ? <Navigation /> : null}
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
              <ProtectedRoute exact path="/calendar">
                <Calendar />
              </ProtectedRoute>
            </Switch>
          </Container>
        </ThemeProvider>
      </LocaleProvider>
    </>
  );
};

export default Layout;
