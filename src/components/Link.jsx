import styled from "styled-components";
import { Link as RouterLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { startsWith } from "../utils/string";

const StyledLink = styled(RouterLink)`
  display: block;
  text-decoration: none;
`;

const Link = ({ children, to, className, ...props }) => {
  const location = useLocation();
  const isInternal = path => {
    return /^\/(?!\/)/.test(path);
  };
  const isCurrent = isInternal(location.pathname) && to === location.pathname;
  const isActive = isCurrent && !startsWith(location.pathname, to);
  const isPartiallyActive =
    isInternal(location.pathname) && startsWith(location.pathname, to);

  const cssClasses = classNames(className, "link", {
    "link--active": isActive,
    "link--partially-active": isPartiallyActive
  });

  return (
    <StyledLink className={cssClasses} to={to} {...props}>
      {children}
    </StyledLink>
  );
};

export default Link;
