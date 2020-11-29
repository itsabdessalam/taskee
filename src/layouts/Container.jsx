import styled from "styled-components";

const StyledContainer = styled.main`
  margin: 0 auto;
  padding: 32px;
  min-height: 100vh;
  transition: margin 0.4s;

  &.full {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 15px;
  }

  &.editor {
    padding: 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - 65px);
    padding-bottom: 65px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 210px;
  }
`;

const Container = ({ children, ...props }) => (
  <StyledContainer {...props}>{children}</StyledContainer>
);

export default Container;
