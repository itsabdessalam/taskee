import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <ReactDatePicker
      selected={startDate}
      onChange={updateDate}
      isClearable
      minDate={new Date()}
      closeOnScroll={true}
      dateFormat="dd/MM/yyyy"
      {...props}
    />
  );
};

export default DatePicker;
