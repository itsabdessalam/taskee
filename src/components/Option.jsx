import styled from "styled-components";
import React from "react";

const StyledOption = styled.option``;

const Option = ({ children, ...props }) => {
  return <StyledOption {...props}>{children}</StyledOption>;
};

export default Option;
