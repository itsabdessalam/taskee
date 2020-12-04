import { useHistory } from "react-router-dom";
import { useIntl } from "react-intl";
import classNames from "classnames";
import styled from "styled-components";
import Button from "./Button";
import Icon from "./Icon";

import { logout } from "../utils/auth";

const StyledLogout = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  transition: all 0.25s ease;

  .logout__button {
    padding: 8px;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.muted};
  }

  .logout__text {
    display: block;
    font-size: 15px;
    margin-left: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    min-width: 0px;
  }

  .logout__icon {
    min-width: 20px;
    width: 20px;
    height: 20px;
    margin: 0;
    transition: all 0.25s ease;
  }
`;

const Logout = ({ className }) => {
  const history = useHistory();
  const intl = useIntl();
  const cssClasses = classNames("logout", className);

  return (
    <StyledLogout className={cssClasses}>
      <Button
        onClick={() => {
          logout(() => {
            history.push("/login");
          });
        }}
        className="logout__button"
        title={intl.formatMessage({ id: "logout" })}
      >
        <Icon name="logout" width={18} className="logout__icon" />
        <span className="logout__text">
          {intl.formatMessage({ id: "logout" })}
        </span>
      </Button>
    </StyledLogout>
  );
};

export default Logout;
