import styled from "styled-components";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { startsWith } from "../utils/string";

const StyledLink = styled(RouterLink)`
  display: block;
  text-decoration: none;
`;

const Link = ({ children, to, className, ...props }) => {
  const location = useLocation();
  const cssClasses = [className, "link"];

  const isInternal = (path) => {
    return /^\/(?!\/)/.test(path);
  };

  if (isInternal(location.pathname) && to === location.pathname) {
    cssClasses.push("link--active");
  } else if (
    isInternal(location.pathname) &&
    startsWith(location.pathname, to)
  ) {
    cssClasses.push("link--partially-active");
  }

  return (
    <StyledLink className={`${cssClasses.join(" ")}`} to={to} {...props}>
      {children}
    </StyledLink>
  );
};

export default Link;
