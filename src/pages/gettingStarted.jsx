import { Button, ButtonGroup, Title, SEO } from "../components";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

const GettingStarted = () => {
  const history = useHistory();
  const redirectTo = page => {
    return history.push(page);
  };
  if (isLoggedIn()) return <Redirect to={"/"} />;
  return (
    <>
      <SEO title={"Getting Started"} />
      <Title level={2}>Getting Started</Title>
      <ButtonGroup>
        <Button
          onClick={() => redirectTo("/login")}
          aria-label="Login"
          title="Login"
        >
          Login
        </Button>
        <Button
          onClick={() => redirectTo("/register")}
          aria-label="Register"
          title="Register"
        >
          Register
        </Button>
      </ButtonGroup>
    </>
  );
};

export default GettingStarted;
