import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, TabItem } from "../components";
import Icon from "../components/Icon";
import logo from "./../assets/images/taskee_full_black.png";
import logoIcon from "./../assets/images/taskee_icon.png";

const StyledAppLogo = styled.div`
  height: 150px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const StyledNoteButton = styled.div`
  height: 100%;
  box-shadow: 0 0 50px rgba(0 0 0 / 8%);
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
  .button__container {
    outline: none;
    cursor: pointer;
    position: relative;
    border: none;
    border-radius: 50%;
    width: 43px;
    height: 88%;
    background: ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
    box-shadow: 5px 0 5px -5px #333;
    .button__icon {
      &--white {
        color: #fff;
      }
    }
  }
`;

const StyledCollapseBlock = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

//todo update component with the theme switcher and translation
const Footer = () => {
  const [collapse, setCollapse] = useState(false);
  const [collapseIcon, setCollapseIcon] = useState("chevron-left");

  //toggle sidebar on/off
  const collapseSideBar = () => {
    if (!collapse) {
      setCollapseIcon("chevron-right");
      setCollapse(true);
      return;
    }
    setCollapseIcon("chevron-left");
    setCollapse(false);
  };

  return (
    <Tabs toggle={collapse}>
      <StyledAppLogo className="logo">
        {!collapse ? (
          <img
            alt="Taskee"
            src={logo}
            className="logo__app"
            width={130}
            height={45.19}
          />
        ) : (
          <img
            alt="Taskee"
            src={logoIcon}
            className="logo__app"
            width={21.02}
            height={25.19}
          />
        )}
      </StyledAppLogo>
      <TabItem to="/dashboard" icon="home" text="Home" toggle={collapse} />
      <TabItem to="/notes" icon="notes" text="Notes" toggle={collapse} />
      <StyledNoteButton className="button">
        <button className="button__container">
          <Icon className="button__icon--white" name={"plus"} width="24px" />
        </button>
      </StyledNoteButton>
      <TabItem
        to="/calendar"
        icon="calendar"
        text="Calendar"
        toggle={collapse}
      />
      <TabItem
        to="/settings"
        icon="settings"
        text="Settings"
        toggle={collapse}
      />
      <StyledCollapseBlock className="collapse" onClick={collapseSideBar}>
        {!collapse ? (
          <>
            <Icon className="collapse__icon" name={collapseIcon} width="24px" />
            <span className={"collapse__text"}>Collapse</span>
          </>
        ) : (
          <Icon className="collapse__icon" name={collapseIcon} width="24px" />
        )}
      </StyledCollapseBlock>
    </Tabs>
  );
};

export default Footer;
