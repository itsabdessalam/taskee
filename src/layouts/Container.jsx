import styled from "styled-components";

const StyledContainer = styled.main`
  margin: 0 auto;
  padding: 15px;
  min-height: calc(100vh);
  transition: margin 0.4s;

  &.full {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    padding-bottom: 15px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 210px;

    &.has-collapsed-navigation {
      margin-left: 54px;
    }
  }
`;

const Container = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

export default Container;
