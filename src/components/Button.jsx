import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => width || "100%"};
  height: 48px;
  font-size: 16px;
  line-height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  font-family: inherit;
  background-color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  text-decoration: none;
  outline: 0;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease;

  &--loading,
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Button = ({ children, title, ...props }) => {
  return (
    <StyledButton title={title} aria-label={title} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
