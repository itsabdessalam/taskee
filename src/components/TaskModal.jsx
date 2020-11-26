import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import styled from "styled-components";
import EditableText from "./EditableText";

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
        <button onClick={() => setIsVisible(false)}>Close</button>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  * {
    display: block;
    text-align: left;
    margin: 5px;
  }
  textarea {
    background: ${({ theme }) => theme.colors.background.light};
  }
`;
export default TaskModal;
