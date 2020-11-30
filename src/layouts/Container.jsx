import { useContext } from "react";
import styled from "styled-components";
import classNames from "classnames";
import AppContext from "../context/App";

const StyledContainer = styled.main`
  margin: 0 auto;
  padding: 32px;
  min-height: 100vh;
  transition: margin 0.25s, width 0.25s;
  overflow-y: scroll;
  height: 100vh;

  &.full {
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: 100vh;
    padding-bottom: 15px;
  }

  &.editor {
    padding: 0;

    .note {
      width: calc(100% - 470px);

      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: calc(100vh - 65px);
    padding-bottom: 65px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 210px;
  }
`;

const Container = ({ children, className, ...props }) => {
  const { fullPage, editorMode } = useContext(AppContext);
  const cssClasses = classNames({
    className,
    full: fullPage,
    editor: editorMode
  });

  return (
    <StyledContainer className={cssClasses} {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;
