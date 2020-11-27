import styled from "styled-components";

import Link from "./Link";
import Icon from "./Icon";

const StyledTabItem = styled.div`
  width: 100%;
  height: 100%;
  min-height: 48px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;

  .tab__link {
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column-reverse;
    color: ${({ theme }) => theme.colors.muted};
    box-shadow: 0px 0px 50px rgba(0 0 0 / 8%);
    &.link--active,
    &.link--partially-active {
      color: ${({ theme }) => theme.colors.text};
    }
  }

  .tab__text {
    font-size: 10px;
  }

  .tab__icon {
    width: 20px;
    height: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 48px;
    .tab__link {
      width: 100%;
      justify-content: flex-start;
      box-shadow: none;
      display: flex;
      flex-direction: row;
    }

    .tab__text {
      margin-left: 12px;
      font-size: 15px;
    }
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
