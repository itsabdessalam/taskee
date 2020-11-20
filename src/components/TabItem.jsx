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
    flex-direction: column-reverse;
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
`;

const TabItem = ({ children, to, text, icon, ...props }) => {
  return (
    <StyledTabItem className="tab">
      <Link className="tab__link" to={to}>
        <span className="tab__text">{text}</span>
        <Icon name={icon} className="tab__icon" width="18px"></Icon>
      </Link>
    </StyledTabItem>
  );
};

export default TabItem;
