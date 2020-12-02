import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import Task from "./Task";
import Button from "./Button";
import Icon from "./Icon";
import styled from "styled-components";

const StyledChecklist = styled.div`
  .checklist__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 15px;

    .checklist__title {
      margin: 0;

      .checklist__count {
        margin-left: 8px;
        font-size: 16px;
        color: #64748b;
        font-weight: 400;
      }
    }
  }

  .checklist__add {
    color: #ffffff;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 50%;
    position: fixed;
    bottom: 15px;
    display: flex;
    right: 15px;
    align-items: center;
    justify-content: center;
    transition: right 0.4s ease;
  }

  .checklist__uncheck {
    width: auto;
    height: auto;
    font-size: 14px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    color: #ffffff;
    font-family: inherit;
    background-color: #6c29f5;
    text-align: center;
    text-decoration: none;
    outline: 0;
    cursor: pointer;
  }
`;

const Checklist = ({ checklist, onTasksChange, noteTemplate }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const intl = useIntl();

  useEffect(() => {
    setTasks(checklist.tasks || []);
    setTitle(checklist.title || "Checklist");
  }, [checklist]);

  const updateChecklist = (task, index) => {
    const tasksCopy = [...tasks];
    tasksCopy[index] = task;
    updateTasks(tasksCopy);
  };

  const removeTask = index => {
    const tasksCopy = [...tasks];
    tasksCopy.splice(index, 1);
    updateTasks(tasksCopy);
  };

  const updateTasks = updatedTasks => {
    setTasks(updatedTasks);
    onTasksChange(updatedTasks);
  };

  const addTask = () => {
    const tasksCopy = [
      ...tasks,
      {
        title: "",
        isCompleted: false,
        ...(noteTemplate &&
          noteTemplate === "project" && { template: "projectTask" })
      }
    ];
    updateTasks(tasksCopy);
  };

  const checkAllTasks = () => {
    const tasksCopy = [
      ...tasks.map(t => {
        return {
          ...t,
          isCompleted: true
        };
      })
    ];
    updateTasks(tasksCopy);
  };

  const uncheckAllTasks = () => {
    const tasksCopy = [
      ...tasks.map(t => {
        return {
          ...t,
          isCompleted: false
        };
      })
    ];
    updateTasks(tasksCopy);
  };

  return (
    <StyledChecklist className="checklist">
      <div className="checklist__header">
        <h2 className="checklist__title">
          <span className="checklist__title_text">{title}</span>
          <span className="checklist__count">
            {tasks.filter(t => t.isCompleted).length} out of {tasks.length}
          </span>
        </h2>
        {/* TODO: use custom action buttons */}
        {tasks.length > 0 &&
          tasks.filter(t => t.isCompleted).length === tasks.length && (
            <Button
              className="checklist__uncheck"
              onClick={uncheckAllTasks}
              title={intl.formatMessage({ id: "uncheckAll" })}
            >
              {intl.formatMessage({ id: "uncheckAll" })}
            </Button>
          )}

        {tasks.length > 0 &&
          tasks.filter(t => t.isCompleted).length !== tasks.length && (
            <Button
              className="checklist__uncheck"
              onClick={checkAllTasks}
              title={intl.formatMessage({ id: "checkAll" })}
            >
              {intl.formatMessage({ id: "checkAll" })}
            </Button>
          )}
      </div>

      <div className="checklist__body">
        <div className="checklist__tasks">
          {tasks.map((task, index) => (
            <Task
              key={index}
              data={task}
              taskIndex={index}
              onChange={updateChecklist}
              remove={removeTask}
              className="checklist__task"
            />
          ))}
        </div>
      </div>
      <Button
        onClick={addTask}
        className="checklist__add"
        title={intl.formatMessage({ id: "addTask" })}
      >
        <Icon name="plus" width={18} />
      </Button>
    </StyledChecklist>
  );
};

export default Checklist;
