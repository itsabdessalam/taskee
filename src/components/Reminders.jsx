import { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import Button from "./Button";
import styled from "styled-components";

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
        <Reminder key={index}>
          {/* TODO: use custom action buttons */}
          <button onClick={() => removeReminder(index)}>x</button>
          <DatePicker
            date={reminder}
            showTimeInput={true}
            onChange={date => updateReminder(date, index)}
            dateFormat="dd/MM/yyyy H:mm"
          />
        </Reminder>
      ))}
      {/* TODO: use custom action buttons */}
      <Button onClick={addReminder} width="15vw">
        Add a reminder
      </Button>
    </div>
  );
};

const Reminder = styled.div`
  width: 100%;
  * {
    float: left;
  }
`;

export default Reminders;
