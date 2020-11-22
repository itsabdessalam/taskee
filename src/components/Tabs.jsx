import styled from "styled-components";

const StyledTabs = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #ffffff;
  align-items: center;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.screens.md};
  margin: 0 auto;
  z-index: 1070;
  transition: width 0.5s;
  -moz-transition: width 0.5s;
  -webkit-transition: width 0.5s;
  -o-transition: width 0.5s;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    width: 20%;
    top: 0;
    left: 0;
    overflow-x: hidden;
    bottom: unset;
    right: unset;
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
