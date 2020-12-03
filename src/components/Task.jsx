import React, { useEffect, useState, useRef } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import TaskModal from "./TaskModal";
import EditableText from "./EditableText";
import Icon from "./Icon";
import Button from "./Button";
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

  .task__checkbox {
    width: 18px;
    margin-right: 8px;
  }

  .task__text {
    width: 100%;
    font-size: 16px;

    textarea {
      width: 100%;
      font-size: 16px;
      background: transparent !important;
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
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;

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
  const intl = useIntl();

  const [task, setTask] = useState({
    title: "",
    isCompleted: false
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <Button
            className="task__action task__action--delete"
            onClick={removeTask}
            title={intl.formatMessage({ id: "removeTask" })}
          >
            <Icon name="trash" width={18} />
          </Button>
          <Button
            className="task__action task__action--update"
            onClick={() => setIsModalOpen(true)}
            title={intl.formatMessage({ id: "updateTask" })}
          >
            <Icon name="dots" width={18} />
          </Button>
        </div>
      </div>
      <TaskModal
        data={task}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onChange={updatedTask => onChange(updatedTask, taskIndex)}
      />
    </StyledTask>
  );
};

export default Task;
