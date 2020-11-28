import { useState, useEffect } from "react";
import styled from "styled-components";
import { Tabs, TabItem, Icon } from "../components";
import logo from "./../assets/images/taskee-logo.png";

const StyledAppLogo = styled.div`
  height: 90px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: width 0.4s;

  .logo__img {
    object-fit: cover;
    object-position: left;
    transition: width 0.4s;
  }

  .logo__text {
    display: block;
    position: relative;
    font-family: "Euclid Flex", "Helvetica", "Arial", sans-serif;
    font-size: 30px;
    font-weight: 500;
    margin-left: 10px;
    letter-spacing: -1px;
    width: 86px;
    transition: width 0.4s;
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
  const [main, setMain] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const main = document.querySelector("#app main");

    if (document.querySelector("#app main")) {
      setMain(document.querySelector("#app main"));
    }
  }, []);

  const collapseSidebar = () => {
    main.classList.add("has-collapsed-navigation");
    setCollapsed(true);
  };

  const unCollapseSidebar = () => {
    if (!collapsed) {
      return;
    }

    main.classList.remove("has-collapsed-navigation");
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

  return (
    <Tabs collapsed={collapsed}>
      <StyledAppLogo className="logo">
        <img alt="Taskee" src={logo} className="logo__img" width={30} />
        <span className="logo__text">taskee</span>
      </StyledAppLogo>
      <TabItem to="/dashboard" icon="home" text="Home" />
      <TabItem to="/notes" icon="notes" text="Notes" />
      <TabItem to="/calendar" icon="calendar" text="Calendar" />
      <TabItem to="/settings" icon="settings" text="Settings" />
      <StyledCollapseBlock className="collapse" onClick={handleCollapse}>
        <Icon name={"chevron-right"} width={14}></Icon>
      </StyledCollapseBlock>
    </Tabs>
  );
};

export default Navigation;