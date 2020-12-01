import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import EditableText from "./EditableText";
import Deadline from "./Deadline";
import Reminders from "./Reminders";

const StyledTaskModal = styled(Modal)``;

const TaskModal = ({ data, isVisible, setIsVisible, onChange }) => {
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
    <StyledTaskModal isVisible={isVisible}>
      <div data-slot="header">Update a task</div>
      <div data-slot="body">
        <label>Title</label>
        <EditableText
          value={mutableTask.title}
          onChange={event => updateTask(event.target.value, "title")}
          cols="40"
          maxLength="140"
        />
        <label>Description</label>
        <EditableText
          value={mutableTask.description}
          onChange={event => updateTask(event.target.value, "description")}
          cols="40"
          minRows={7}
        />
        {mutableTask.template === "projectTask" && (
          <>
            <div className="deadline">
              <span>Deadline</span>
              <Deadline
                deadline={mutableTask.deadline}
                onChange={deadline => updateTask(deadline, "deadline")}
              />
            </div>
            <div className="reminders">
              <p>Reminders</p>
              <Reminders
                reminders={mutableTask.reminders}
                onChange={reminders => updateTask(reminders, "reminders")}
              />
            </div>
          </>
        )}
      </div>
      <div data-slot="footer">
        {/* TODO: use custom action buttons */}
        <button onClick={() => setIsVisible(false)}>Close</button>
      </div>
    </StyledTaskModal>
  );
};

export default TaskModal;
