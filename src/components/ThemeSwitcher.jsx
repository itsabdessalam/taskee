import { useContext } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import ThemeContext from "../context/Theme";
import Button from "./Button";
import Select from "./Select";
import Option from "./Option";

const StyledThemeSwitcher = styled.div`
  width: 100%;
  height: 52px;
  margin-bottom: 12px;
  position: relative;

  select {
    width: 100%;
    height: 100%;
    padding-left: 52px;
    cursor: pointer;
    text-transform: capitalize;
  }

  .theme {
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    height: 32px;
    width: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;

    &::before,
    &::after {
      content: "";
      width: 12px;
      height: 24px;
      border: 0.3px solid ${({ theme }) => theme.colors.separator};
    }

    &::before {
      float: left;
      border-top-left-radius: 15px;
      border-bottom-left-radius: 15px;
      border-right: none;
    }

    &::after {
      float: right;
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      background-color: #6c29f5;
      border-left: none;
    }

    &--light {
      &::before {
        background-color: #ffffff;
      }
    }

    &--dark {
      &::before {
        background-color: #1a202f;
      }
    }
  }
`;

const ThemeSwitcher = () => {
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const intl = useIntl();

  return (
    <StyledThemeSwitcher className="theme__switcher">
      <div className={`theme theme--${activeTheme}`}></div>
      <Select
        value={activeTheme}
        onChange={({ target: { value } }) => updateTheme(value)}
      >
        <Option value="light">Light</Option>
        <Option value="dark">Dark</Option>
      </Select>
    </StyledThemeSwitcher>
  );
};

export default ThemeSwitcher;
