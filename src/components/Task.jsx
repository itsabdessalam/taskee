import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import EditableText from "./EditableText";
import Icon from "./Icon";

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

  .task__checkbox {
    display: flex;
    align-items: center;
    width: 18px;
    height: 100%;
    margin-right: 12px;

    input {
      position: relative;
      margin: 0;
      color: rgb(0, 0, 0);
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.background};
      border: 1px solid ${({ theme }) => theme.colors.checkbox};
      outline: none;
      appearance: none;
      width: 18px;
      height: 18px;
      padding: 0;
      cursor: pointer;
      transition: background-color 300ms ease 0s;

      &[aria-checked="true"] {
        background-color: ${({ theme }) => theme.colors.primary};
        border-width: 1px;
        border-color: ${({ theme }) => theme.colors.primary};

        &::after {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' height='16' width='16' fill='none'%3E%3Cpath d='M14 7L8.5 12.5L6 10' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/svg%3E");
          position: absolute;
          width: 16px;
          height: 16px;
          text-align: center;
        }
      }

      &:not([aria-checked="true"]) {
        &:hover {
          background-color: rgba(108, 41, 245, 0.08);
        }
      }
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
        <label className="task__checkbox">
          <input
            type="checkbox"
            name={task.title}
            checked={task.isCompleted}
            aria-checked={task.isCompleted}
            onChange={onCheckboxChange}
          />
        </label>
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
