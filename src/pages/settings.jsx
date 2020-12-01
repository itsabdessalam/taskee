import React, { useContext, useEffect, useState } from "react";
import Form from "../components/Form";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import { getUserLogged, setUserLogged } from "../utils/auth";
import AuthService from "../services/AuthService";
import ThemeContext from "../context/Theme";
import LocaleContext from "../context/Locale";

const StyledFormContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: flex-start;
`;

const StyledFormSubtitle = styled.h4`
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

const StyledRadioInput = styled.input`
  display: flex;
  align-content: center;
  height: 25px;
  margin: 0;
  padding: 0;
`;

const StyledLabel = styled.label`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  margin: 0 0 5px;
`;

let languages = {
  data: [
    {
      language: "French",
      option: "fr"
    },
    {
      language: "English",
      option: "en"
    }
  ]
};

const Settings = () => {
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const { updateLocale } = useContext(LocaleContext);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    notificationActivated: false
  });

  useEffect(() => {
    let data = getUserLogged();
    setUser(data);
  }, []);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleTheme = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.id
    });
    updateTheme(event.target.id);
  };

  const handleLanguage = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
    updateLocale(event.target.value);
    setUserLogged(user);
  };

  const handleNotification = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.checked
    });
    setUserLogged(user);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setUserLogged(user);

    let payload = {
      _id: user._id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
      notificationActivated: user.notificationActivated,
      language: user.language
    };

    AuthService.update(payload, user.token).then(response => {
      //todo add flash message
    });
  };

  return (
    <>
      <h3>Settings</h3>
      <StyledFormContainer>
        <Form onSubmit={handleSubmit}>
          <StyledLabel>Nom</StyledLabel>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleChange}
          />
          <StyledLabel>Prénom</StyledLabel>
          <Input
            id="name"
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleChange}
          />
          <StyledLabel>Email</StyledLabel>
          <Input
            id="email"
            name="email"
            type="text"
            value={user.email}
            onChange={handleChange}
          />
          <StyledFormSubtitle>Theme</StyledFormSubtitle>
          <StyledFormRow>
            <StyledLabelTheme htmlFor="light" color="light" />
            <StyledRadioInput
              name="theme"
              type="radio"
              id="light"
              checked={activeTheme === "light"}
              onChange={handleTheme}
            />
            <StyledLabelTheme htmlFor="dark" color="dark" />
            <StyledRadioInput
              name="theme"
              type="radio"
              id="dark"
              checked={activeTheme === "dark"}
              onChange={handleTheme}
            />
          </StyledFormRow>
          <StyledLabel>Language</StyledLabel>
          <StyledFormRow>
            <select
              name="language"
              value={user.language}
              onChange={handleLanguage}
            >
              {languages.data.map((item, i) => (
                <option value={item.option} key={i}>
                  {item.language}
                </option>
              ))}
            </select>
          </StyledFormRow>
          <StyledFormSubtitle>Notifications</StyledFormSubtitle>
          <StyledFormRow>
            <span>Enable notifications</span>
            <input
              name="notificationActivated"
              type="checkbox"
              checked={user.notificationActivated}
              onChange={handleNotification}
            />
          </StyledFormRow>
          <Button>Save modifications</Button>
        </Form>
      </StyledFormContainer>
    </>
  );
};

export default Settings;
