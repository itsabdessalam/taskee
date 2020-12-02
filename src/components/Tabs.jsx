import styled from "styled-components";
import React from "react";

const Tabs = ({ children, collapsed, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default Tabs;
