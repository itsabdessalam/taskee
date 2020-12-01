import styled from "styled-components";
import classNames from "classnames";
import Label from "./Label";

const StyledCheckbox = styled(Label)`
  &.checkbox {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;

    .checkbox__check {
      width: 18px;
      height: 18px;
    }

    .checkbox__input {
      position: relative;
      margin: 0;
      color: rgb(0, 0, 0);
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.background};
      border: 1px solid ${({ theme }) => theme.colors.checkbox};
      outline: none;
      appearance: none;
      width: 18px;
      height: 18px;
      padding: 0;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &[aria-checked="true"] {
        background-color: ${({ theme }) => theme.colors.primary};
        border-width: 1px;
        border-color: ${({ theme }) => theme.colors.primary};

        &::after {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' height='16' width='16' fill='none'%3E%3Cpath d='M14 7L8.5 12.5L6 10' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
          position: absolute;
          width: 16px;
          height: 16px;
          text-align: center;
        }
      }

      &:not([aria-checked="true"]) {
        &:hover {
          background-color: rgba(108, 41, 245, 0.08);
        }
      }
    }

    .checkbox__text {
      margin-left: 8px;
    }
  }
`;

const Checkbox = ({
  children,
  id,
  name,
  checked,
  label,
  onChange,
  className,
  ...props
}) => {
  const cssClasses = classNames("checkbox", className);

  return (
    <StyledCheckbox className={cssClasses}>
      <span className="checkbox__check">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          aria-checked={checked}
          onChange={onChange}
          className="checkbox__input"
        />
      </span>
      {label && <span className="checkbox__text">{label}</span>}
    </StyledCheckbox>
  );
};

export default Checkbox;
