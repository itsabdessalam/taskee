import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";

const Deadline = ({ deadline, onChange }) => {
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
        <DatePicker date={selectedDate} onChange={updateDate} />
      )) || (
        <button onClick={() => updateDate(new Date())}>Add a deadline</button>
      )}
    </>
  );
};

export default Deadline;
