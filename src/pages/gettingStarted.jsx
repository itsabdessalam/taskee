import { Button, ButtonGroup, Title, SEO } from "../components";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";
import styled from "styled-components";
import { useIntl } from "react-intl";

const GettingStarted = () => {
  const intl = useIntl();

  const history = useHistory();
  const redirectTo = page => {
    return history.push(page);
  };
  if (isLoggedIn()) return <Redirect to={"/"} />;
  return (
    <Container>
      <SEO title={"Getting Started"} />
      <Title level={2}>{intl.formatMessage({ id: "gettingStarted" })}</Title>
      <ButtonGroup>
        <Button
          onClick={() => redirectTo("/login")}
          aria-label="Login"
          title="Login"
        >
          {intl.formatMessage({ id: "login" })}
        </Button>
        <Button
          onClick={() => redirectTo("/register")}
          aria-label="Register"
          title="Register"
        >
          {intl.formatMessage({ id: "register" })}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  h2 {
    text-align: center;
  }
  width: 40%;
  margin: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 90%;
  }
`;

export default GettingStarted;
