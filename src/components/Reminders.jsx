import { useEffect, useState } from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import DatePicker from "./DatePicker";
import Button from "./Button";
import Icon from "./Icon";

const StyledReminder = styled.div`
  &.reminder {
    width: 100%;
    display: flex;
    position: relative;
    margin-bottom: 12px;

    .reminder__icon {
      color: #64748b;
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }

    .reminder__remove {
      width: 22px;
      height: 22px;
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      color: #64748b;
      background-color: ${({ theme }) => theme.colors.itemBackground};
      border-radius: 50%;
      padding: 0;
      margin: 0;
    }

    .reminder__date {
      padding-left: 36px;

      .react-datepicker__close-icon {
        display: none !important;
      }
    }
  }
`;

const Reminders = ({ reminders, onChange }) => {
  const [mutableReminders, setMutableReminders] = useState([]);
  const intl = useIntl();

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
          <Icon name="alert" width={18} className="reminder__icon" />
          <Button
            onClick={() => removeReminder(index)}
            className="reminder__remove"
            title={intl.formatMessage({ id: "removeReminder" })}
          >
            <Icon name="close" width={14} />
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
      <Button
        onClick={addReminder}
        width="auto"
        title={intl.formatMessage({ id: "addReminder" })}
      >
        {intl.formatMessage({ id: "addReminder" })}
      </Button>
    </div>
  );
};

export default Reminders;
