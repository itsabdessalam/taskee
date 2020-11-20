import { Button, Title } from "../components";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import ButtonGroup from "../components/ButtonGroup";

const GettingStarted = () => {
  const history = useHistory();
  const redirectTo = (page) => {
    return history.push(page);
  };
  if (isLoggedIn()) return <Redirect to={"/"}/>;
  return (
   <>
     <Title level={2}>Getting Started</Title>
     <ButtonGroup>
       <Button onClick={() => redirectTo("/login")}>Login</Button>
       <Button onClick={() => redirectTo("/register")}>Register</Button>
     </ButtonGroup>
   </>
  );

};

export default GettingStarted;
