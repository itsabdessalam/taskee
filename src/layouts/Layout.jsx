import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import classNames from "classnames";
import { Container, Navigation, Header } from "../layouts";
import { AppProvider } from "../context/App";
import { SEO, ProtectedRoute } from "../components";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";
import Notes from "../pages/notes";
import EditorTest from "../pages/editorTest";
import Settings from "../pages/settings";
import Calendar from "../pages/calendar";

const Layout = ({ children, ...props }) => {
  return (
    <>
      <AppProvider>
        <Navigation />
        <Container>
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
            <ProtectedRoute exact path="/notes/:id">
              <Notes />
            </ProtectedRoute>
            <Route exact path="/editor-test">
              <EditorTest />
            </Route>
            <ProtectedRoute exact path="/settings">
              <Settings />
            </ProtectedRoute>
            <ProtectedRoute exact path="/calendar">
              <Calendar />
            </ProtectedRoute>
            <Redirect to="/notes" /> {/* please keep it last */}
          </Switch>
        </Container>
      </AppProvider>
    </>
  );
};

export default Layout;
