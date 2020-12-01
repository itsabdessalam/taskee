import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import Button from "./Button";
import EditableText from "./EditableText";
import Deadline from "./Deadline";
import Reminders from "./Reminders";

const StyledTaskModal = styled(Modal)``;

const StyledTaskModalBody = styled.div`
  .modal__task__tile {
  }

  textarea {
    background-color: ${({ theme }) => theme.colors.card};
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
      title="Update a task"
      isOpen={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <StyledTaskModalBody>
        <div className="modal__task__tile">
          <label>Title</label>
          <EditableText
            value={mutableTask.title}
            onChange={event => updateTask(event.target.value, "title")}
            cols="40"
            maxLength="140"
          />
        </div>
        <div className="modal__task__description">
          <label>Description</label>
          <EditableText
            value={mutableTask.description}
            onChange={event => updateTask(event.target.value, "description")}
            cols="40"
            minRows={7}
          />
        </div>
        {mutableTask.template === "projectTask" && (
          <>
            <div className="modal__task__deadline">
              <span>Deadline</span>
              <Deadline
                deadline={mutableTask.deadline}
                onChange={deadline => updateTask(deadline, "deadline")}
              />
            </div>
            <div className="modal__task__reminders">
              <p>Reminders</p>
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
