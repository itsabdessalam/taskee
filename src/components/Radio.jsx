import styled from "styled-components";
import Label from "./Label";

const StyledRadio = styled.div`
  display: block;
  text-decoration: none;

  label {
    display: flex;
  }
  .radio__check {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 2px;
    margin: -2px;
  }

  .radio__input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;

    &:checked + .radio__icon::after {
      background-color: ${({ theme }) => theme.colors.primary};
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .radio__icon {
    position: relative;
    border: 1px solid #edf2f7;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    transition: border-color 0.15s ease;

    &::after {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      background-color: transparent;
      transition: transform 0.15s ease;
    }
  }

  .radio__text {
    margin-left: 8px;
  }
`;

const Radio = ({
  children,
  id,
  name,
  value,
  onChange,
  checked,
  label,
  ...props
}) => {
  return (
    <StyledRadio className="radio" {...props}>
      <Label>
        <span className="radio__check">
          <input
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            type="radio"
            checked={checked}
            className="radio__input"
          />
          <span aria-hidden="true" className="radio__icon"></span>
        </span>
        <span className="radio__text">{label}</span>
      </Label>
    </StyledRadio>
  );
};

export default Radio;
