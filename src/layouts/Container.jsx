import styled from "styled-components";

const StyledContainer = styled.main`
  margin: 0 auto;
  padding: 15px;
  padding-bottom: 65px;
  min-height: calc(100vh);

  &.full {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    padding-bottom: 15px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 210px;
  }
`;

const Container = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

export default Container;
