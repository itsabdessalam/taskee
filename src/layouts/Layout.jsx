/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Container, Navigation, Header } from "../layouts";
import { AppProvider } from "../context/App";
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
      </AppProvider>
    </>
  );
};

export default Layout;
