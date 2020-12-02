import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import {
  Title,
  Input,
  Button,
  Form,
  LocaleSelector,
  ThemeSwitcher,
  Label,
  Radio,
  Checkbox
} from "../components";
import until from "../utils/until";
import { getUser, setUser } from "../utils/auth";
import AuthService from "../services/AuthService";
import ThemeContext from "../context/Theme";
import LocaleContext from "../context/Locale";
import { useForm } from "../hooks";

const span = styled.h4`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 0 0 5px;
`;

const StyledFormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  margin: 10px 0;
`;

const StyledLabelTheme = styled.label`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :before,
  :after {
    content: "";
    width: 12.5px;
    height: 25px;
  }

  ${props => {
    if (props.color === "light") {
      return `
        :before {
          float: left;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background-color: #ffffff;
          border: 0.3px solid #ededed;
          border-right: none;
        }
        
        :after {
          float: right;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          background-color: #6c29f5;
          border: 0.3px solid #ededed;
          border-left: none;
        }  
      `;
    } else {
      return `
        :before {
          float: left;
          border-top-left-radius: 15px;
          border-bottom-left-radius: 15px;
          background-color: #1a202f;
          border: 0.3px solid #ededed;
          border-right: none;
        }
        
        :after {
          float: right;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          background-color: #6c29f5;
          border: 0.3px solid #ededed;
          border-left: none;
        }  
      `;
    }
  }}
`;

const StyledSettings = styled.div`
  .settings {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
    }

    h3 {
      margin-top: 0;
    }

    .label {
      font-size: 14px;
      margin-bottom: 4px;
    }

    .settings__account,
    .settings__customization {
      padding: 24px;
      border-radius: 8px;
      margin-right: 24px;
      border: 1px solid ${({ theme }) => theme.colors.separator};
      ${({ theme }) =>
        theme.mode === "light" && {
          "box-shadow": "0px 1px 100px 10px rgba(226, 232, 240, 0.16)"
        }}
    }

    .settings__account {
      width: 70%;
      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 100%;
        margin: 0;
        margin-bottom: 12px;
      }
    }

    .settings__customization {
      width: 30%;

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 100%;
      }
    }
  }

  .settings__save {
    margin-left: auto;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
      margin-top: 12px;
    }
  }
`;

const SettingsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const { activeLocale, updateLocale } = useContext(LocaleContext);
  const intl = useIntl();
  const {
    _id,
    email,
    firstName,
    lastName,
    language,
    token,
    notificationActivated
  } = getUser();

  const updateSettings = async () => {
    setIsLoading(true);
    setError(null);

    const user = {
      _id,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      notificationActivated: values.notificationActivated,
      language: activeLocale,
      theme: activeTheme
    };

    const [err, result] = await until(AuthService.update(user));

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

    const { data = {} } = result.data || {};

    if (data) {
      const {
        email,
        firstName,
        lastName,
        language,
        notificationActivated,
        theme // if available
      } = data;

      setUser({
        ...getUser(),
        email,
        firstName,
        lastName,
        language,
        notificationActivated,
        theme
      });
      setIsLoading(false);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(updateSettings, {
    _id,
    email,
    firstName,
    lastName,
    language,
    token,
    notificationActivated
  });

  const handleTheme = event => {
    updateTheme(event.target.id);
  };

  return (
    <StyledSettings>
      <Title level={2}>Settings</Title>
      <Form onSubmit={handleSubmit}>
        <div className="settings">
          <div className="settings__account">
            <h3>Account</h3>
            <Label>{intl.formatMessage({ id: "lastname" })}</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={values.lastName}
              onChange={handleChange}
            />
            <Label>{intl.formatMessage({ id: "firstname" })}</Label>
            <Input
              id="name"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
            />
            <Label>{intl.formatMessage({ id: "email" })}</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="settings__customization">
            <h3>Cutomization</h3>
            <Label>{intl.formatMessage({ id: "theme" })}</Label>
            <StyledFormRow>
              <Radio
                name="theme"
                type="radio"
                id="light"
                checked={activeTheme === "light"}
                onChange={handleTheme}
              />
              <StyledLabelTheme htmlFor="light" color="light" />
              <Radio
                name="theme"
                type="radio"
                id="dark"
                checked={activeTheme === "dark"}
                onChange={handleTheme}
              />{" "}
              <StyledLabelTheme htmlFor="dark" color="dark" />
            </StyledFormRow>
            <Label>{intl.formatMessage({ id: "language" })}</Label>
            <StyledFormRow>
              <LocaleSelector />
            </StyledFormRow>
            <Label>Notifications</Label>
            <StyledFormRow>
              <Checkbox
                name="notificationActivated"
                checked={values.notificationActivated}
                onChange={handleChange}
                label={intl.formatMessage({ id: "enableNotifications" })}
              />
            </StyledFormRow>
          </div>
        </div>
        <Button
          title={intl.formatMessage({ id: "save" })}
          width="auto"
          className="settings__save"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : intl.formatMessage({ id: "save" })}
        </Button>
      </Form>
    </StyledSettings>
  );
};

export default SettingsForm;
