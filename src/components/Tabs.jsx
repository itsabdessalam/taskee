import styled from "styled-components";
import React from "react";

const StyledTabs = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  width: 100%;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.screens.md};
  margin: 0 auto;
  z-index: 1070;
  transition: width 0.5s ease;
  -moz-transition: width 0.5s ease;
  -webkit-transition: width 0.5s ease;
  -o-transition: width 0.5s ease;
  @media (min-width: ${({ theme }) => theme.screens.md}) {
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    top: 0;
    left: 0;
    overflow-x: hidden;
    bottom: unset;
    right: unset;
    ${(props) => {
      if (props.toggle) {
        return `
          width: 50px;
        `;
      } else {
        return `
          width: 20%;
        `;
      }
    }}
  }
`;

const Tabs = ({ children, ...props }) => {
  return (
    <StyledTabs {...props} className="nav">
      {children}
    </StyledTabs>
  );
};

export default Tabs;
