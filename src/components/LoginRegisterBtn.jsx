import {isLoggedIn} from "../utils/auth";
import {useHistory, Redirect} from "react-router-dom";
import ButtonGroup from "./ButtonGroup";
import React from "react";
import {Button} from "./index";

const LoginRegisterBtn = () => {
  const history = useHistory();
  const redirectTo = (page) => {
    return history.push(page);
  };
  if (isLoggedIn()) return <Redirect to={"/"}/>;
  return (
   <>
     <ButtonGroup>
       <Button onClick={() => redirectTo("/login")}>Login</Button>
       <Button onClick={() => redirectTo("/register")}>Register</Button>
     </ButtonGroup>
   </>
  );

};

export default LoginRegisterBtn;