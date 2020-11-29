import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Navigation } from "../layouts";
import { ProtectedRoute } from "../components";
/* eslint-disable no-unused-vars */
import { Route, Switch, useLocation } from "react-router-dom";
import { Container, Footer, Header } from "../layouts";
import { LocaleProvider } from "../context/Locale";
import { ProtectedRoute, Offline } from "../components";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";
import Notes from "../pages/notes";
import Settings from "../pages/settings";
import Calendar from "../pages/calendar";

const Layout = ({ children, ...props }) => {
  return (
    <>
      <LocaleProvider>
        {!isFullPage(pathname) ? <Header /> : null}
        <Offline />
        <Container className={cssClasses}>
          <Switch>
            <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute>
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
            <Route exact path="/editor-test">
              <EditorTest />
            </Route>
          </Switch>
        </Container>
        {!isFullPage(pathname) ? <Footer /> : null}
      </LocaleProvider>
    </>
  );
};

export default Layout;
