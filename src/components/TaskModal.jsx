import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import EditableText from "./EditableText";
import Deadline from "./Deadline";
import Reminders from "./Reminders";

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
    <Modal isVisible={isVisible}>
      <Container>
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
        {/* TODO: use custom action buttons */}
        <button onClick={() => setIsVisible(false)}>Close</button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  > * {
    display: block;
    text-align: left;
    margin: 5px;
  }
  textarea {
    background: ${({ theme }) => theme.colors.background};
  }
  .deadline,
  .reminders {
    width: 100%;
    text-align: left;
    span {
      margin-right: 15px;
    }
  }
`;
export default TaskModal;
