import styled from "styled-components";

import Link from "./Link";
import Icon from "./Icon";

const StyledTabItem = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.25s;

  .tab__link {
    padding: 8px;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    color: ${({ theme }) => theme.colors.muted};

    &.link--active,
    &.link--partially-active {
      color: #334155;

      @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        background-color: #edf2f7;
      }
    }
  }

  .tab__text {
    display: block;
    font-size: 15px;
    margin-left: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    min-width: 0px;
  }

  .tab__icon {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin: 0;
    transition: all 0.25s;
  }
`;

const TabItem = ({ children, to, text, icon, ...props }) => {
  return (
    <StyledTabItem className="tab">
      <Link className="tab__link" to={to}>
        <Icon name={icon} className="tab__icon"></Icon>
        <span className="tab__text">{text}</span>
      </Link>
    </StyledTabItem>
  );
};

export default TabItem;
