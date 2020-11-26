import styled from "styled-components";

import Link from "./Link";
import Icon from "./Icon";

const StyledTabItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;

  .tab__link {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.gray.light};
    box-shadow: 0px 0px 50px rgba(0 0 0 / 8%);
    &.link--active,
    &.link--partially-active {
      color: ${({ theme }) => theme.colors.gray.dark};
    }
  }

  .tab__text {
    font-size: 10px;
    margin-top: 2px;
  }

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    height: 40px;
    .tab__link {
      width: 50%;
      justify-content: flex-start;
      box-shadow: none;
      display: flex;
      flex-direction: row;
    }

    .tab__text {
      margin-left: 5px;
      font-size: 14px;
    }
  }
`;

const TabItem = ({ children, to, text, icon, ...props }) => {
  return (
    <StyledTabItem className="tab">
      <Link className="tab__link" to={to}>
        <Icon name={icon} className="tab__icon" width="18px"></Icon>
        {!props.toggle && <span className="tab__text">{text}</span>}
      </Link>
    </StyledTabItem>
  );
};

export default TabItem;
