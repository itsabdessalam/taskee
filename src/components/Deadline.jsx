import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import Button from "./Button";
import DatePicker from "./DatePicker";
import Icon from "./Icon";

const StyledDeadline = styled.div`
  position: relative;
  width: 100%;

  .deadline__icon {
    color: #64748b;
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .deadline__date {
    padding-left: 36px;

    .react-datepicker__close-icon {
      display: none !important;
    }
  }
`;

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
        <StyledDeadline>
          <Icon name="calendar" width={18} className="deadline__icon" />
          <DatePicker
            date={selectedDate}
            onChange={updateDate}
            className={`${className} deadline__date`}
          />
        </StyledDeadline>
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
