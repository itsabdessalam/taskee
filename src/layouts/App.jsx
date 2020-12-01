import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./Layout";
import { getUserLogged, isLoggedIn } from "../utils/auth";
import Pusher from "pusher-js";
import NotificationService from "../services/NotificationService";

const App = () => {
  useEffect(() => {
    // Initialize and handle notifications
    if (isLoggedIn()) {
      const user = getUserLogged();
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        encrypted: true
      });
      const channel = pusher.subscribe(`notifications-${user._id}`);
      channel.bind("project-deadline", data => {
        if (data.type === "reminder") {
          if (data.task !== undefined) {
            //send notification for task reminder
            let title = `Rappel - ${data.note.title}`;
            let message = data.task.title;
            let url = `${process.env.PUBLIC_URL}/notes/${data.note._id}`;

            NotificationService.send(title, message, url);
          } else if (data.note !== undefined) {
            //send notification for note reminder
            let title = `Reminder - ${data.note.title}`;
            let message = "The deadline for your note is arrived";
            let url = `${process.env.PUBLIC_URL}/notes/${data.note._id}`;

            NotificationService.send(title, message, url);
          }
        }
        //add new type if needed
        /*
          Data is an array with objects looking like:
          {
            note: {_id: "5fbe718f5d783f001125aafd", template: "project", title: "My new project note"}
            plannedDate: "2020-11-29T14:40:00.000Z"
            task: {_id: "5fbe9453ae14c38653f29be3", isCompleted: false, template: "projectTask", title: "My task 1"}
            type: "reminder"
            _id: "5fc3b2a100046c00111f4338"
          }
          If the field 'task' is there, it means that this is a reminder or deadline for a task, otherwise, it is a deadline for a note
        */
      });
    }
  }, []);
  return (
    <>
      <Router>
        <Layout />
      </Router>
    </>
  );
};

export default App;
