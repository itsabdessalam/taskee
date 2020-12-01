import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Button from "./Button";
import styled from "styled-components";

const StyledReminder = styled.div`
  width: 100%;
  display: flex;

  .reminder__remove {
    width: 32px;
  }

  .reminder__date {
    .react-datepicker__close-icon {
      display: none !important;
    }
  }
`;

const Reminders = ({ reminders, onChange }) => {
  const [mutableReminders, setMutableReminders] = useState([]);

  const addReminder = () => {
    const remindersCopy = [...mutableReminders, new Date()];
    updateReminders(remindersCopy);
  };

  const removeReminder = index => {
    const remindersCopy = [...mutableReminders];
    remindersCopy.splice(index, 1);
    updateReminders(remindersCopy);
  };

  const updateReminder = (date, index) => {
    const remindersCopy = [...mutableReminders];
    remindersCopy[index] = date;
    updateReminders(remindersCopy);
  };

  const updateReminders = updatedReminders => {
    setMutableReminders(updatedReminders);
    onChange(updatedReminders);
  };

  useEffect(() => {
    if (reminders) {
      setMutableReminders(reminders);
    } else {
      setMutableReminders([]);
    }
  }, [reminders]);
  return (
    <div>
      {mutableReminders.map((reminder, index) => (
        <StyledReminder key={index} className="reminder">
          {/* TODO: use custom action buttons */}
          <Button
            onClick={() => removeReminder(index)}
            className="reminder__remove"
          >
            x
          </Button>
          <DatePicker
            date={reminder}
            showTimeInput={true}
            onChange={date => updateReminder(date, index)}
            dateFormat="dd/MM/yyyy H:mm"
            className="reminder__date"
          />
        </StyledReminder>
      ))}
      {/* TODO: use custom action buttons */}
      <Button onClick={addReminder}>Add a reminder</Button>
    </div>
  );
};

export default Reminders;
