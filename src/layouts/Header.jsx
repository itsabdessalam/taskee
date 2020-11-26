import styled from "styled-components";

import { LocaleSelector, ThemeSwitcher } from "../components";

const StyledHeader = styled.header``;

const Header = ({ children, ...props }) => {
  return (
    <>
      <StyledHeader {...props}>
        <ThemeSwitcher /> {/* only for test purposes */}
        <LocaleSelector /> {/* only for test purposes */}
      </StyledHeader>
    </>
  );
};

export default Header;
