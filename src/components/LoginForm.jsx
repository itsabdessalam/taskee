import { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "../hooks";
import styled from "styled-components";
import { useIntl } from "react-intl";
import getLanguage from "../utils/language";
import { handleAuth, isLoggedIn } from "../utils/auth";
import AuthService from "../services/AuthService";
import LocaleContext from "../context/Locale";
import ThemeContext from "../context/Theme";

import Form from "./Form";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
import Link from "./Link";

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

const LoginForm = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: ""
  });
  const { activeLocale, updateLocale } = useContext(LocaleContext);
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const intl = useIntl();
  const { formData, handleOnChange } = useForm({
    email: "",
    password: ""
  });

  const setUserSettings = user => {
    updateTheme(user.theme ? user.theme : "light");
    updateLocale(user.language ? user.language : "en");
  };

  const handleServerResponse = (response, err) => {
    if (response) {
      const { data = {} } = (response && response.data) || {};

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
      email: formData.email,
      password: formData.password
    };

    AuthService.login(payload)
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

  if (isLoggedIn()) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Title level={2}>{intl.formatMessage({ id: "loginTitle" })}</Title>
      <Form onSubmit={handleOnSubmit}>
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
            : intl.formatMessage({ id: "login" })}
        </Button>
        <Link to="/register">{intl.formatMessage({ id: "registerLink" })}</Link>
      </Form>
    </Container>
  );
};

export default LoginForm;
