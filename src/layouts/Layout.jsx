/* eslint-disable no-unused-vars */
import { Route, Switch, Redirect } from "react-router-dom";
import { Container, Navigation } from "../layouts";
import { ProtectedRoute, Offline } from "../components";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";
import Notes from "../pages/notes";
import Settings from "../pages/settings";
import Calendar from "../pages/calendar";

const Layout = ({ children, ...props }) => {
  return (
    <>
      <Navigation />
      <Offline />
      <Container>
        <Switch>
          <Route exact path="/">
            <Redirect to="/notes" />
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
          <ProtectedRoute exact path="/settings">
            <Settings />
          </ProtectedRoute>
          <ProtectedRoute exact path="/calendar">
            <Calendar />
          </ProtectedRoute>
          <Redirect to="/notes" /> {/* please keep it last */}
        </Switch>
      </Container>
    </>
  );
};

export default Layout;
