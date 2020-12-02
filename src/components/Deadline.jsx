import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Button from "./Button";
import DatePicker from "./DatePicker";

const Deadline = ({ deadline, className, onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const intl = useIntl();

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
        <Button
          onClick={() => updateDate(new Date())}
          className={className}
          width="auto"
          title={intl.formatMessage({ id: "addDeadline" })}
        >
          {intl.formatMessage({ id: "addDeadline" })}
        </Button>
      )}
    </>
  );
};

export default Deadline;
