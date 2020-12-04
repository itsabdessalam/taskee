import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "../hooks";
import until from "../utils/until";
import styled from "styled-components";
import { useIntl } from "react-intl";
import getLanguage from "../utils/language";

import { handleLogin, isLoggedIn } from "../utils/auth";
import AuthService from "../services/AuthService";
import LocaleContext from "../context/Locale";
import ThemeContext from "../context/Theme";

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
import Link from "./Link";

const LoginForm = () => {
  const intl = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeLocale, updateLocale } = useContext(LocaleContext);
  const { activeTheme, updateTheme } = useContext(ThemeContext);

  const setUserSettings = user => {
    updateTheme(user.theme ? user.theme : "light");
    updateLocale(user.language ? user.language : "en");
  };

  useEffect(() => {
    updateLocale(getLanguage());
  }, []);

  const auth = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      email: values.email,
      password: values.password
    };

    const [err, result] = await until(AuthService.login(user));

    if (err) {
      setError({
        message: err.message
      });
      setIsLoading(false);
    }

    if (result && result.data.errors) {
      setError({
        message: intl.formatMessage({ id: "invalidCredentials" })
      });
      setIsLoading(false);
    }

    const { data = {} } = (result && result.data) || {};

    if (data && data.user && data.token) {
      handleLogin({
        ...data.user,
        token: data.token
      });
      setUserSettings(data.user);
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(auth, {
    email: "",
    password: ""
  });

  if (isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Title level={2}>{intl.formatMessage({ id: "loginTitle" })}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="text"
          placeholder={"john.doe@email.com"}
          label={"Email"}
          onChange={handleChange}
          value={values.email}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder={"••••••••••"}
          label={"Password"}
          onChange={handleChange}
          value={values.password}
          required
        />
        {error ? <p className="error">{error.message}</p> : null}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? intl.formatMessage({ id: "loginLoading" })
            : intl.formatMessage({ id: "login" })}
        </Button>
        <Link to="/register">{intl.formatMessage({ id: "registerLink" })}</Link>
      </Form>
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

export default LoginForm;
