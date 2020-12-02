import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import Modal from "./Modal";
import Label from "./Label";
import Button from "./Button";
import EditableText from "./EditableText";
import Deadline from "./Deadline";
import Reminders from "./Reminders";

const StyledTaskModal = styled(Modal)``;

const StyledTaskModalBody = styled.div`
  .modal__task__tile {
  }

  .modal__task__row {
    &:not(:last-child) {
      margin-bottom: 12px;
    }

    label {
      font-size: 14px;
      margin-bottom: 4px;
    }
  }
  textarea {
    width: 100%;
    min-height: 52px;
    font-weight: 400;
    display: block;
    color: ${({ theme }) => theme.colors.text};
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.separator};
    background-color: ${({ theme }) => theme.colors.card};
    font-family: inherit;
    border-radius: 5px;
    font-size: 16px;
    line-height: 24px;
    box-shadow: 0 0 0 0 rgb(108 41 245 / 0.05);
    outline: 0;
    transition: border-color 0.3s, box-shadow 0.3s ease;

    &:not(:last-child) {
      margin-bottom: 12px;
    }

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
  }

  .modal__task__deadline,
  .modal__task__reminders {
    width: 100%;
    text-align: left;
    span {
      margin-right: 15px;
    }
  }
`;

const TaskModal = ({ data, isOpen, setIsOpen, onChange }) => {
  const [mutableTask, setMutableTask] = useState({});
  const intl = useIntl();

  useEffect(() => {
    setMutableTask(data);
  }, [data]);

  const updateTask = (value, field) => {
    if (field === "title") {
      value = value.replace("\n", "");
    }
    const taskCopy = { ...mutableTask, [field]: value };
    setMutableTask(taskCopy);
    onChange(taskCopy);
  };

  return (
    <StyledTaskModal
      title={intl.formatMessage({ id: "updateTask" })}
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <StyledTaskModalBody>
        <div className="modal__task__tile modal__task__row">
          <Label>{intl.formatMessage({ id: "title" })}</Label>
          <EditableText
            value={mutableTask.title}
            onChange={event => updateTask(event.target.value, "title")}
            cols="40"
            maxLength="140"
          />
        </div>
        <div className="modal__task__description modal__task__row">
          <Label>{intl.formatMessage({ id: "description" })}</Label>
          <EditableText
            value={mutableTask.description}
            onChange={event => updateTask(event.target.value, "description")}
            cols="40"
            minRows={7}
          />
        </div>
        {mutableTask.template === "projectTask" && (
          <>
            <div className="modal__task__deadline modal__task__row">
              <Label>{intl.formatMessage({ id: "deadline" })}</Label>
              <Deadline
                deadline={mutableTask.deadline}
                onChange={deadline => updateTask(deadline, "deadline")}
              />
            </div>
            <div className="modal__task__reminders modal__task__row">
              <Label>{intl.formatMessage({ id: "reminders" })}</Label>
              <Reminders
                reminders={mutableTask.reminders}
                onChange={reminders => updateTask(reminders, "reminders")}
              />
            </div>
          </>
        )}
      </StyledTaskModalBody>
    </StyledTaskModal>
  );
};

export default TaskModal;
