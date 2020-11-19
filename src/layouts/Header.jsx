import styled from "styled-components";

const StyledHeader = styled.header``;

const Header = ({ children, ...props }) => {
  return <StyledHeader {...props}></StyledHeader>;
};

export default Header;
