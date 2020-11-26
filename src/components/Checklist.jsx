import React, { useEffect, useState } from "react";

import Task from "./Task";
import Button from "./Button";

const Checklist = ({ checklist, onTasksChange }) => {
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
    const tasksCopy = [...tasks, { title: "", isCompleted: false }];
    updateTasks(tasksCopy);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div>
        {tasks.map((task, index) => (
          <Task
            key={index}
            data={task}
            taskIndex={index}
            onChange={updateChecklist}
            remove={removeTask}
          />
        ))}
      </div>
      <Button onClick={addTask} width="12vw">
        Add task
      </Button>
    </div>
  );
};

export default Checklist;
