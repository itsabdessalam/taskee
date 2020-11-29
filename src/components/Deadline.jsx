import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";

const Deadline = ({ deadline, className, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const updateDate = date => {
    onChange(date);
    setSelectedDate(date);
  };

  useEffect(() => {
    if (deadline) {
      setSelectedDate(deadline);
    } else {
      setSelectedDate(null);
    }
  }, [deadline]);
  return (
    <>
      {(deadline && (
        <DatePicker
          date={selectedDate}
          onChange={updateDate}
          className={className}
        />
      )) || (
        <button onClick={() => updateDate(new Date())} className={className}>
          Add a deadline
        </button>
      )}
    </>
  );
};

export default Deadline;
