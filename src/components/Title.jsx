import styled from "styled-components";

const StyledTitle = styled.div`
  font-size: ${({ level }) => 54 / level}px;
  font-weight: 600;
  margin-top: 12px;
  margin-bottom: 24px;
`;

const Title = ({ children, level = 1, ...props }) => {
  return (
    <StyledTitle as={`h${level}`} level={level}>
      {children}
    </StyledTitle>
  );
};

export default Title;
