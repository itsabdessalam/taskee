import React, { useEffect, useState } from "react";

import Task from "./Task";
import Button from "./Button";
import Icon from "./Icon";

const Checklist = ({ checklist, onTasksChange, noteTemplate }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

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

  return (
    <>
      <div className="checklist__header">
        <h2 className="checklist__title">
          <span className="checklist__title_text">{title}</span>
          <span className="checklist__count">
            {tasks.filter(t => t.isCompleted).length} out of {tasks.length}
          </span>
        </h2>
        <button className="checklist__uncheck">Uncheck all</button>
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
      <button onClick={addTask} className="checklist__add">
        <Icon name={"plus"} width={18} />
      </button>
    </>
  );
};

export default Checklist;
