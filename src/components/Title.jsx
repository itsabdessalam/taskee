import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: ${({ level }) => 54 / level}px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 24px;
`;

const Title = ({ children, level = 1, title, ...props }) => {
  return (
    <StyledTitle as={`h${level}`} level={level} {...props}>
      {children}
    </StyledTitle>
  );
};

export default Title;
