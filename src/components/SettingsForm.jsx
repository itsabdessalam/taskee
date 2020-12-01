import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
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
import { getUserLogged, setUserLogged } from "../utils/auth";
import AuthService from "../services/AuthService";
import ThemeContext from "../context/Theme";
import LocaleContext from "../context/Locale";

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

const SettingsForm = () => {
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
      notificationActivated: user.notificationActivated
        ? user.notificationActivated
        : false,
      language: user.language
    };

    console.log("toto", payload);

    // AuthService.update(payload, user.token).then(response => {
    //   //todo add flash message
    // });
  };

  return (
    <>
      <Title level={2}>Settings</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Nom</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          value={user.lastName}
          onChange={handleChange}
        />
        <Label>Prénom</Label>
        <Input
          id="name"
          name="firstName"
          type="text"
          value={user.firstName}
          onChange={handleChange}
        />
        <Label>Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          value={user.email}
          onChange={handleChange}
        />
        <span>Theme</span>
        <StyledFormRow>
          <StyledLabelTheme htmlFor="light" color="light" />
          <Radio
            name="theme"
            type="radio"
            id="light"
            checked={activeTheme === "light"}
            onChange={handleTheme}
          />
          <StyledLabelTheme htmlFor="dark" color="dark" />
          <Radio
            name="theme"
            type="radio"
            id="dark"
            checked={activeTheme === "dark"}
            onChange={handleTheme}
          />
        </StyledFormRow>
        <Label>Language</Label>
        <StyledFormRow>
          <LocaleSelector />
        </StyledFormRow>
        <span>Notifications</span>
        <StyledFormRow>
          <span>Enable notifications</span>

          <Checkbox
            name="notificationActivated"
            type="checkbox"
            checked={user.notificationActivated}
            onChange={handleNotification}
          />
        </StyledFormRow>
        <Button>Save modifications</Button>
      </Form>
    </>
  );
};

export default SettingsForm;
