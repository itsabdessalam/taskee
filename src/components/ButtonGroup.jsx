import styled from "styled-components";
import React from "react";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = ({ children, ...props }) => {
  return <StyledButtonGroup {...props}>{children}</StyledButtonGroup>;
};

export default ButtonGroup;
