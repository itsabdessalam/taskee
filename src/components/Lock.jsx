import {isLoggedIn} from "../utils/auth";
import {useHistory, Redirect} from "react-router-dom";
import ButtonGroup from "./ButtonGroup";
import React from "react";
import Title from "./Title";
import {Button} from "./index";

const LockButton = () => {
  const history = useHistory();
  const redirectTo = (page) => {
    return history.push(page);
  };
  if (isLoggedIn()) return <Redirect to={"/"}/>;
  return (
   <>
     <Title level={2}>Login or Register</Title>
     <ButtonGroup>
       <Button onClick={() => redirectTo("/login")}>Login</Button>
       <Button onClick={() => redirectTo("/register")}>Register</Button>
     </ButtonGroup>
   </>
  );

};

export default LockButton;