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
  Checkbox,
  Logout
} from "../components";
import until from "../utils/until";
import { getUser, setUser } from "../utils/auth";
import AuthService from "../services/AuthService";
import ThemeContext from "../context/Theme";
import LocaleContext from "../context/Locale";
import { useForm } from "../hooks";

const StyledSettings = styled.div`
  .settings {
    width: 100%;

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
      margin-bottom: 12px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.colors.separator};

      ${({ theme }) =>
        theme.mode === "light" && {
          "box-shadow": "0px 1px 100px 10px rgba(226, 232, 240, 0.16)"
        }}
    }
  }

  .settings__actions {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 24px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
    }

    .settings__logout {
      width: auto;
      padding: 0;

      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: auto;
        height: 48px;
        padding: 12px 24px;
        background-color: ${({ theme }) => theme.colors.itemBackground};
        color: ${({ theme }) => theme.colors.itemColor};
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 100%;

        button {
          width: 100%;
        }
      }
    }

    .settings__save {
      width: auto;
      margin-left: 12px;

      @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 100%;
        margin-left: 0;
        margin-top: 12px;
      }
    }

    .settings__row {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: flex-start;
      align-items: center;
      margin: 10px 0;
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

    const { data = {} } = (result && result.data) || {};

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

  return (
    <StyledSettings>
      <Title level={2}>Settings</Title>
      <Form onSubmit={handleSubmit}>
        <div className="settings">
          <div className="settings__account">
            <h3>{intl.formatMessage({ id: "account" })}</h3>
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
            <h3>Customization</h3>
            <Label>{intl.formatMessage({ id: "theme" })}</Label>
            <div className="settings__row">
              <ThemeSwitcher />
            </div>
            <Label>{intl.formatMessage({ id: "language" })}</Label>
            <div className="settings__row">
              <LocaleSelector />
            </div>
            <Label>Notifications</Label>
            <div className="settings__row">
              <Checkbox
                name="notificationActivated"
                checked={values.notificationActivated}
                onChange={handleChange}
                label={intl.formatMessage({ id: "enableNotifications" })}
              />
            </div>
          </div>
        </div>
        <div className="settings__actions">
          <Logout className="settings__action settings__logout" />
          <Button
            title={intl.formatMessage({ id: "save" })}
            width="auto"
            className="settings__action settings__save"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : intl.formatMessage({ id: "save" })}
          </Button>
        </div>
      </Form>
    </StyledSettings>
  );
};

export default SettingsForm;
