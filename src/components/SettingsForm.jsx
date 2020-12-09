import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { useForm } from "../hooks";
import {
  Title,
  Input,
  Button,
  Form,
  LocaleSelector,
  ThemeSwitcher,
  Label,
  Checkbox,
  Logout
} from "../components";

import { getUser, setUser } from "../utils/auth";
import AuthService from "../services/AuthService";
import ThemeContext from "../context/Theme";
import LocaleContext from "../context/Locale";

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
  const [status, setStatus] = useState({
    loading: false,
    error: ""
  });
  const { activeTheme } = useContext(ThemeContext);
  const { activeLocale } = useContext(LocaleContext);
  const intl = useIntl();
  const user = getUser();
  const { formData, handleOnChange } = useForm({ ...user });

  const handleServerResponse = (response, err) => {
    if (response) {
      const { data = {} } = response.data || {};

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
          ...user,
          email,
          firstName,
          lastName,
          language,
          notificationActivated,
          ...(theme ? { theme } : { theme: activeTheme })
        });
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
      _id: user._id,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      notificationActivated: formData.notificationActivated,
      language: activeLocale,
      theme: activeTheme
    };

    AuthService.update(payload)
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
    return () => {
      setStatus({});
    };
  }, []);

  return (
    <StyledSettings>
      <Title level={2}>{intl.formatMessage({ id: "settings" })}</Title>
      {status.error ? <p className="error">{status.error}</p> : null}
      <Form onSubmit={handleOnSubmit}>
        <div className="settings">
          <div className="settings__account">
            <h3>{intl.formatMessage({ id: "account" })}</h3>
            <Label>{intl.formatMessage({ id: "lastname" })}</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleOnChange}
            />
            <Label>{intl.formatMessage({ id: "firstname" })}</Label>
            <Input
              id="name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleOnChange}
            />
            <Label>{intl.formatMessage({ id: "email" })}</Label>
            <Input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="settings__customization">
            <h3>{intl.formatMessage({ id: "customization" })}</h3>
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
                checked={formData.notificationActivated}
                onChange={handleOnChange}
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
            disabled={status.loading}
          >
            {status.loading
              ? intl.formatMessage({ id: "loading" })
              : intl.formatMessage({ id: "save" })}
          </Button>
        </div>
      </Form>
    </StyledSettings>
  );
};

export default SettingsForm;
