import { Tabs, TabItem } from "../components";
import Icon from "../components/Icon";
import styled from "styled-components";
import { useState } from "react";
import logo from "./../assets/images/taskee_full_black.png";
import logoDark from "./../assets/images/taskee_full_white.png";
import logoSmall from "./../assets/images/taskee_icon.png";

const StyledAppLogo = styled.div`
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.screens.md}) {
    display: none;
  }
`;

const StyledNoteButton = styled.div`
  height: 100%;
  box-shadow: 0 0 50px rgba(0 0 0 / 8%);
  @media (min-width: ${({ theme }) => theme.screens.md}) {
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
    background: ${({ theme }) => theme.colors.primary.base};
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
  color: ${({ theme }) => theme.colors.gray.light};
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    color: ${({ theme }) => theme.colors.gray.dark};
  }

  @media (max-width: ${({ theme }) => theme.screens.md}) {
    display: none;
  }
`;

const Footer = () => {
  const [collapse, setCollapse] = useState(false);
  const [collapseIcon, setCollapseIcon] = useState("chevron-left");

  const collapseSideBar = () => {
    let sideBar = document.getElementsByClassName("nav");
    let sideBarText = document.getElementsByClassName("tab__text");
    let logo = document.getElementsByClassName("logo__app");
    let collapseText = document.getElementsByClassName("collapse__text");

    if (!collapse) {
      collapseText[0].style.display = "none";
      setCollapseIcon("chevron-right");
      for (let i = 0; i < sideBarText.length; i++) {
        sideBarText[i].style.display = "none";
      }

      sideBar[0].style.width = "50px";
      setCollapse(true);
      return;
    }

    sideBar[0].style.width = "20%";
    collapseText[0].style.display = "flex";
    setCollapseIcon("chevron-left");
    for (let i = 0; i < sideBarText.length; i++) {
      sideBarText[i].style.display = "flex";
    }

    logo[0].style.display = "flex";
    setCollapse(false);
  };

  return (
    <Tabs>
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
          /*<img
          alt="Taskee"
          src={logoDark}
          className="logo__app"
          width={130}
          height={45.19}
          />*/
          <img
            alt="Taskee"
            src={logoSmall}
            className="logo__app"
            width={21.02}
            height={25.19}
          />
        )}
      </StyledAppLogo>
      <TabItem to="/dashboard" icon="home" text="Home" />
      <TabItem to="/notes" icon="notes" text="Notes" />
      <StyledNoteButton className="button">
        <button className="button__container">
          <Icon className="button__icon--white" name={"plus"} width="24px" />
        </button>
      </StyledNoteButton>
      <TabItem to="/calendar" icon="calendar" text="Calendar" />
      <TabItem to="/settings" icon="settings" text="Settings" />
      <StyledCollapseBlock className="collapse" onClick={collapseSideBar}>
        <Icon className="collapse__icon" name={collapseIcon} width="24px" />
        <span className={"collapse__text"}>Collapse</span>
      </StyledCollapseBlock>
    </Tabs>
  );
};

export default Footer;
