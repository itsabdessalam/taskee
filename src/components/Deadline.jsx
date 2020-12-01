import { useEffect, useState } from "react";
import Button from "./Button";
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
        // TODO: use custom action buttons
        <Button onClick={() => updateDate(new Date())} className={className}>
          Add a deadline
        </Button>
      )}
    </>
  );
};

export default Deadline;
