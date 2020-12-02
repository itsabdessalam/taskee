import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "../context/App";
import Layout from "./Layout";
import { getUser, isLoggedIn } from "../utils/auth";
import Pusher from "pusher-js";
import NotificationService from "../services/NotificationService";

const App = () => {
  useEffect(() => {
    // Initialize and handle notifications
    if (isLoggedIn()) {
      const user = getUser();
      const pusher = new Pusher(process.env.REACT_APP_PUSHER_APP_KEY, {
        cluster: process.env.REACT_APP_PUSHER_APP_CLUSTER,
        encrypted: true
      });
      const channel = pusher.subscribe(`notifications-${user._id}`);
      channel.bind("project", data => {
        for (const notification of data.notifications) {
          let title = "";
          const url = `${process.env.PUBLIC_URL}/notes/${notification.note._id}`;
          let message = "";
          // Handle reminder notifications
          if (data.type === "reminder") {
            title = `Reminder - ${notification.note.title}`;
            message = notification.task.title;
            NotificationService.send(title, message, url);
            continue;
          }

          // Handle deadline notifications
          title = `Deadline - ${notification.note.title}`;
          message = notification.task
            ? notification.task.title
            : "The deadline for your note is today";

          NotificationService.send(title, message, url);
        }
      });
    }
  }, []);
  return (
    <>
      <Router>
        <AppProvider>
          <Layout />
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
