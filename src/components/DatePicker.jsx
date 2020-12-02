import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

const StyledDatePicker = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
    .react-datepicker__input-container {
      width: 100%;
    }
  }

  .react-datepicker-popper {
    z-index: 100;
  }

  .react-datepicker__close-icon {
    width: 22px;
    height: 22px;
    background-color: #edf2f7;
    color: #64748b;
    border-radius: 50%;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      background-color: #edf2f7;
      color: #64748b;
      height: 19px;
      width: 19px;
      content: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='none' stroke='%2364748b' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12'%3e%3c/path%3e%3c/svg%3e");
    }
  }

  .react-datepicker__triangle {
    left: 50px !important;
  }
`;
const StyledDatePickerInput = styled(ReactDatePicker)`
  width: 100%;
  height: 52px;
  font-weight: 400;
  display: block;
  color: ${({ theme }) => theme.colors.text};
  padding: 12px;
  border: 1px solid #edf2f7;
  font-family: inherit;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  background-color: ${({ theme }) => theme.colors.card};
  box-shadow: 0 0 0 0 rgb(108 41 245 / 0.05);
  outline: 0;
  transition: border-color 0.3s, box-shadow 0.3s;

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

// Documentation https://reactdatepicker.com
const DatePicker = ({ date, onChange, ...props }) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (date) {
      setStartDate(new Date(date));
    }
  }, [date]);

  const updateDate = date => {
    setStartDate(date);
    onChange(date);
  };
  return (
    <StyledDatePicker>
      <StyledDatePickerInput
        selected={startDate}
        onChange={updateDate}
        isClearable
        minDate={new Date()}
        closeOnScroll={true}
        dateFormat="dd/MM/yyyy"
        {...props}
      />
    </StyledDatePicker>
  );
};

export default DatePicker;
