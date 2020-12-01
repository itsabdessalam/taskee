import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import EditableText from "./EditableText";
import Icon from "./Icon";
import Checkbox from "./Checkbox";

const StyledTask = styled.div`
  position: relative;
  display: flex;
  width: 100%;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.separator};
  }

  .task__card {
    padding: 10px 15px;
    padding-right: 70px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .task__text {
    width: 100%;
    font-size: 16px;

    textarea {
      width: 100%;
      font-size: 16px;
    }
  }

  .task__actions {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;

    .task__action {
      border: none;
      border-radius: 5px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      &--delete {
        background-color: transparent;
        color: #ef4444;
        width: 24px;
        height: 32px;
      }

      &--update {
        background-color: transparent;
        color: ${({ theme }) => theme.colors.muted};
        width: 24px;
        height: 32px;
      }
    }
  }
`;

const Task = ({ data, taskIndex, onChange, remove }) => {
  const ref = useRef(null);
  const inputElement = useRef(null);

  const [task, setTask] = useState({
    title: "",
    isCompleted: false
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    document.addEventListener("click", clickListener, true);
    return () => {
      document.removeEventListener("click", clickListener, true);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setTask(data);
    }
  }, [data]);

  useEffect(() => {
    if (inputElement.current && isEditingTitle) {
      inputElement.current.focus();
    }
  }, [inputElement, isEditingTitle]);

  const toggleEditingTitle = () => {
    if (!isEditingTitle) {
      setIsEditingTitle(true);
    }
  };

  const onCheckboxChange = event => {
    const updatedTask = { ...task, isCompleted: event.target.checked };
    setTask(updatedTask);
    onChange(updatedTask, taskIndex);
  };

  const onTitleChange = event => {
    event.target.value = event.target.value.replace("\n", "");
    const updatedTask = { ...task, title: event.target.value };
    setTask(updatedTask);
    onChange(updatedTask, taskIndex);
  };

  const clickListener = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsEditingTitle(false);
    }
  };

  const removeTask = () => {
    remove(taskIndex);
  };

  return (
    <StyledTask className="task">
      <div className="task__card">
        <Checkbox
          name={task.title}
          checked={task.isCompleted}
          aria-checked={task.isCompleted}
          onChange={onCheckboxChange}
          className="task__checkbox"
        />
        <div ref={ref} onClick={toggleEditingTitle} className="task__text">
          <EditableText
            ref={inputElement}
            value={task.title}
            onChange={onTitleChange}
            disabled={!isEditingTitle}
            cols="40"
            maxLength="140"
          />
        </div>
        <div className="task__actions">
          {/* TODO: use custom action buttons */}
          <button
            className="task__action task__action--delete"
            onClick={removeTask}
          >
            <Icon name={"trash"} width={18} />
          </button>
          {/* TODO: use custom action buttons */}
          <button
            className="task__action task__action--update"
            onClick={() => setIsModalVisible(true)}
          >
            <Icon name={"dots"} width={18} />
          </button>
        </div>
      </div>
      <TaskModal
        data={task}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onChange={updatedTask => onChange(updatedTask, taskIndex)}
      />
    </StyledTask>
  );
};

export default Task;
