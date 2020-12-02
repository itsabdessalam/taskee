import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import AppContext from "../context/App";
import { Tabs, TabItem, Icon, Logout } from "../components";
import Logo from "./../assets/images/taskee-logo.png";

const StyledAppLogo = styled.div`
  height: 90px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.25s ease;

  .logo__img {
    object-fit: cover;
    object-position: left;
    transition: all 0.25s ease;
  }

  .logo__text {
    display: block;
    position: relative;
    font-family: ${({ theme }) => theme.fonts.logo};
    font-size: 30px;
    font-weight: 500;
    margin-left: 10px;
    letter-spacing: -1px;
    max-width: 86px;
    overflow: hidden;
    transition: all 0.25s ease;
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

const StyledTabs = styled(Tabs)`
  &.navigation {
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
    min-width: 54px;
    width: 210px;
    background-color: ${({ theme }) => theme.colors.navigation};
    border-right: 1px solid ${({ theme }) => theme.colors.separator};
    transform: translate3d(0, 0, 0);
    transition: width 0.25s ease;
    z-index: 1070;

    .navigation__footer {
      display: block;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .navigation__body {
        flex: 1;
      }
    }

    .collapse {
      svg {
        transform: rotate(180deg);
      }
    }

    &--collapsed {
      width: 54px;

      .logo {
        padding: 8px 12px;

        .logo__text {
          max-width: 0;
          margin: 0;
        }
      }

      .tab {
        .tab__text {
          display: none;
        }
      }

      .collapse {
        svg {
          transform: rotate(0deg);
        }
      }
    }

    &:hover {
      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        .collapse {
          display: flex;
        }
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 100%;
      height: 50px;
      top: unset;
      bottom: 0;
      left: 0;
      display: flex;
      border-top: 1px solid #edf2f7;
      z-index: 1100;

      .navigation__footer {
        display: none;
      }

      .navigation__body {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .logo {
        display: none;
      }

      .tab {
        padding: 0;

        .tab__link {
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .tab__text {
          margin: 0;
          margin-top: 2px;
          font-size: 11px;
        }
      }
    }
  }
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
    <StyledTabs
      className={"navigation " + (collapsed ? "navigation--collapsed" : "")}
    >
      <StyledAppLogo className="logo">
        <img alt="Taskee" src={Logo} className="logo__img" width={30} />
        <span className="logo__text">taskee</span>
      </StyledAppLogo>
      <div className="navigation__body">
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
      </div>
      <div className="navigation__footer">
        <Logout />
      </div>
      <StyledCollapseBlock className="collapse" onClick={handleCollapse}>
        <Icon name="chevron-right" width={14} />
      </StyledCollapseBlock>
    </StyledTabs>
  );
};

export default Navigation;
