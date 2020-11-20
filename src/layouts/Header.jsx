import styled from "styled-components";

import { LocaleSelector } from "../components";

const StyledHeader = styled.header``;

const Header = ({ children, ...props }) => {
  return (
    <>
      <StyledHeader {...props}>
        <LocaleSelector></LocaleSelector> {/* only for test purposes */}
      </StyledHeader>
    </>
  );
};

export default Header;
