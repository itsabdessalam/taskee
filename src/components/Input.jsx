import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: block;
  margin: 0;
  padding: 10px 16px;
  border: none;
  box-shadow: 0px 10px 50px rgb(220 226 229 / 0.2);
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray.dark};
  background-color: #ffffff;
  font-family: inherit;
  outline: 0;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray.light};
  }
`;

const Input = ({ children, ...props }) => {
  return <StyledInput {...props}>{children}</StyledInput>;
};

export default Input;
