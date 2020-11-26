/* eslint-disable no-unused-vars */
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useContext
} from "react-router-dom";
import { ProtectedRoute } from "../components";
import { Header, Footer, Container } from "../layouts";
import { LocaleProvider } from "../context/Locale";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import GettingStarted from "../pages/gettingStarted";
import Calendar from "../pages/calendar";

const Layout = ({children, ...props}) => {
  const {pathname} = useLocation();
  const fullPages = ["/login", "/register", "/getting-started"];

  const isFullPage = (page) => {
    return fullPages.find((p) => {
      return p === page;
    });
  };

  const cssClasses = isFullPage(pathname) ? "full" : null;

  return (
   <>
     <LocaleProvider>
       {!isFullPage(pathname) ? <Header/> : null}
       <Container className={cssClasses}>
         <Switch>
           <Route exact path="/">
             <Home/>
           </Route>
           <Route exact path="/login">
             <Login/>
           </Route>
           <Route exact path="/register">
             <Register/>
           </Route>
           <Route exact path="/getting-started">
             <GettingStarted/>
           </Route>
           <Route exact path="/calendar">
             <Calendar/>
           </Route>
         </Switch>
       </Container>
       {!isFullPage(pathname) ? <Footer/> : null}
     </LocaleProvider>
   </>
  );
};

export default Layout;
