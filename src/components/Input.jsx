import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 52px;
  font-weight: 400;
  display: block;
  color: ${({ theme }) => theme.colors.text};
  padding: 12px;
  border: 2px solid #edf2f7;
  font-family: inherit;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  background-color: #ffffff;
  box-shadow: 0 0 0 0 rgb(108 41 245 / 0.05);
  outline: 0;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &:hover {
    border-color: #cbd5e1;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgb(108 41 245 / 0.05);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Input = ({ children, ...props }) => {
  return <StyledInput {...props}>{children}</StyledInput>;
};

export default Input;
