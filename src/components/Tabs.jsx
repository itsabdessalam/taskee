import styled from "styled-components";
import React from "react";

const StyledTabs = styled.footer`
  &.navigation {
    position: fixed;

    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    top: 0;
    left: 0;
    overflow-x: hidden;
    bottom: unset;
    right: unset;

    width: 210px;
    display: flex;
    background: #ffffff;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    z-index: 1070;

    &--collapsed {
      width: 50px;

      .logo {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tab {
        padding: 0;

        .tab__link {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tab__text {
          display: none;
        }
      }
    }
  }
`;

const Tabs = ({ children, ...props }) => {
  return (
    <StyledTabs
      {...props}
      className={
        "navigation " + (props.collapsed ? "navigation--collapsed" : "")
      }
    >
      {children}
    </StyledTabs>
  );
};

export default Tabs;
