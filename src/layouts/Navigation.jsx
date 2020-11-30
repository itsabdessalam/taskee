import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import AppContext from "../context/App";
import { Tabs, TabItem, Icon } from "../components";
import Logo from "./../assets/images/taskee-logo.png";

const StyledAppLogo = styled.div`
  height: 90px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.25s;

  .logo__img {
    object-fit: cover;
    object-position: left;
    transition: all 0.25s;
  }

  .logo__text {
    display: block;
    position: relative;
    font-family: "Euclid Flex", "Helvetica", "Arial", sans-serif;
    font-size: 30px;
    font-weight: 500;
    margin-left: 10px;
    letter-spacing: -1px;
    max-width: 86px;
    overflow: hidden;
    transition: all 0.25s;
  }
`;

const StyledCollapseBlock = styled.div`
  position: absolute;
  bottom: 10px;
  right: -12px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  color: #ffffff;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
`;

const Navigation = () => {
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(false);
  const { root, fullPage } = useContext(AppContext);

  const collapseSidebar = () => {
    root && root.classList.add("has-collapsed-navigation");
    setCollapsed(true);
  };

  const unCollapseSidebar = () => {
    if (!collapsed) {
      return;
    }

    root && root.classList.remove("has-collapsed-navigation");
    setCollapsed(false);
  };

  const handleCollapse = () => {
    if (!collapsed) {
      collapseSidebar();
      return;
    }

    unCollapseSidebar();
  };

  useEffect(() => {
    const handleResize = () => {
      unCollapseSidebar();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (fullPage) {
    return null;
  }

  return (
    <Tabs collapsed={collapsed}>
      <StyledAppLogo className="logo">
        <img alt="Taskee" src={Logo} className="logo__img" width={30} />
        <span className="logo__text">taskee</span>
      </StyledAppLogo>
      <TabItem
        to="/dashboard"
        icon="home"
        text={intl.formatMessage({ id: "home" })}
      />
      <TabItem
        to="/notes"
        icon="notes"
        text={intl.formatMessage({ id: "notes" })}
      />
      <TabItem
        to="/calendar"
        icon="calendar"
        text={intl.formatMessage({ id: "calendar" })}
      />
      <TabItem
        to="/notifications"
        icon="alert"
        text={intl.formatMessage({ id: "notifications" })}
      />
      <TabItem
        to="/settings"
        icon="settings"
        text={intl.formatMessage({ id: "settings" })}
      />
      <StyledCollapseBlock className="collapse" onClick={handleCollapse}>
        <Icon name={"chevron-right"} width={14}></Icon>
      </StyledCollapseBlock>
    </Tabs>
  );
};

export default Navigation;
