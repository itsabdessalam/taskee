import styled from "styled-components";

const StyledSelect = styled.select`
  width: 100%;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: block;
  margin: 0;
  padding: 10px 16px;
  border: none;
  border: solid 2 ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  text-decoration: none;

  &:not(:last-child) {
    margin-bottom: 12px;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const Select = ({ children, ...props }) => {
  return <StyledSelect {...props}>{children}</StyledSelect>;
};

export default Select;
