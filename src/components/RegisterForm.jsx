import { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useForm } from "../hooks";
import { handleAuth, isLoggedIn } from "../utils/auth";
import getLanguage from "../utils/language";

import Title from "./Title";
import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Link from "./Link";

import AuthService from "../services/AuthService";

import LocaleContext from "../context/Locale";
import ThemeContext from "../context/Theme";

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

const RegisterForm = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: ""
  });
  const { activeLocale, updateLocale } = useContext(LocaleContext);
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const intl = useIntl();
  const { formData, handleOnChange } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    language: ""
  });

  const registerDisabled = true;

  const setUserSettings = user => {
    updateTheme(user.theme ? user.theme : "light");
    updateLocale(user.language ? user.language : "en");
  };

  const handleServerResponse = (response, err) => {
    if (response) {
      const { data = {} } = response.data || {};

      if (data && data.user && data.token) {
        handleAuth({
          ...data.user,
          token: data.token
        });
        setUserSettings(data.user);
      }
    } else if (err) {
      setStatus({
        error: err.message
      });
    }
  };

  const handleOnSubmit = event => {
    event.preventDefault();
    setStatus(prevStatus => ({ ...prevStatus, loading: true }));

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      language: activeLocale
    };

    AuthService.register(payload)
      .then(response => {
        handleServerResponse(response, null);
      })
      .catch(error => {
        handleServerResponse(null, error);
      })
      .finally(() => {
        setStatus(prevStatus => ({ ...prevStatus, loading: false }));
      });
  };

  useEffect(() => {
    updateLocale(getLanguage());

    return () => {
      setStatus({});
    };
  }, []);

  if (isLoggedIn()) return <Redirect to="/" />;

  return (
    <Container>
      <Title level={2}>{intl.formatMessage({ id: "registerTitle" })}</Title>
      {!registerDisabled && (
        <Form onSubmit={handleOnSubmit}>
          <Input
            name="firstName"
            type="text"
            placeholder={"john"}
            label={"First Name"}
            onChange={handleOnChange}
            value={formData.firstName}
            required
          />
          <Input
            name="lastName"
            type="text"
            placeholder={"doe"}
            label={"Last Name"}
            onChange={handleOnChange}
            value={formData.lastName}
            required
          />
          <Input
            name="email"
            type="text"
            placeholder={"john.doe@email.com"}
            label={"Email"}
            onChange={handleOnChange}
            value={formData.email}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder={"••••••••••"}
            label={"Password"}
            onChange={handleOnChange}
            value={formData.password}
            required
          />
          {status.error ? <p className="error">{status.error}</p> : null}
          <Button type="submit" disabled={status.loading}>
            {status.loading
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

export default RegisterForm;
