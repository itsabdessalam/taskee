import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  height: 48px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: ${({ theme }) => theme.colors.primary.base};
  text-align: center;
  text-decoration: none;

  outline: 0;
  cursor: pointer;

  &--loading,
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &:not(:last-child) {
    margin-bottom: 12px;
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
