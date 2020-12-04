import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useIntl } from "react-intl";

import { useForm } from "../hooks";
import until from "../utils/until";
import { handleLogin, isLoggedIn } from "../utils/auth";
import getLanguage from "../utils/language";

import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Link from "./Link";

import AuthService from "../services/AuthService";

import LocaleContext from "../context/Locale";
import ThemeContext from "../context/Theme";

const RegisterForm = () => {
  const intl = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeLocale, updateLocale } = useContext(LocaleContext);
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const registerDisabled = true;

  const setUserSettings = user => {
    updateTheme(user.theme ? user.theme : "light");
    updateLocale(user.language ? user.language : "en");
  };

  useEffect(() => {
    updateLocale(getLanguage());
  }, []);

  const register = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      language: activeLocale
    };

    const [err, result] = await until(AuthService.register(user));

    if (err) {
      setError({
        message: err.message
      });
      setIsLoading(false);
    }
    if (result && result.data.errors) {
      setError({
        message: "Invalid credentials provided"
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

  const { values, handleChange, handleSubmit } = useForm(register, {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    language: ""
  });

  if (isLoggedIn()) return <Redirect to="/" />;

  return (
    <Container>
      <Title level={2}>{intl.formatMessage({ id: "registerTitle" })}</Title>
      {!registerDisabled && (
        <Form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            type="text"
            placeholder={"john"}
            label={"First Name"}
            onChange={handleChange}
            value={values.firstName}
            required
          />
          <Input
            name="lastName"
            type="text"
            placeholder={"doe"}
            label={"Last Name"}
            onChange={handleChange}
            value={values.lastName}
            required
          />
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
              : intl.formatMessage({ id: "register" })}
          </Button>
          <Link to="/login">{intl.formatMessage({ id: "loginLink" })}</Link>
        </Form>
      )}

      <div className="register__message">
        <p>{intl.formatMessage({ id: "registerDisabled" })}</p>
        <Link to="/login">{intl.formatMessage({ id: "loginLink" })}</Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  h2 {
    text-align: center;
  }
  width: 40%;
  margin: auto;

  .register__message {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 50%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 90%;
  }
`;

export default RegisterForm;
