import styled from "styled-components";
import React from "react";

const StyledTabs = styled.div`
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

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      z-index: 1100;
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

const Tabs = ({ children, collapsed, ...props }) => {
  return (
    <StyledTabs
      className={"navigation " + (collapsed ? "navigation--collapsed" : "")}
    >
      {children}
    </StyledTabs>
  );
};

export default Tabs;
