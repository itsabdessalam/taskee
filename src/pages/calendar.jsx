import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Title, SEO } from "../components";
import until from "../utils/until";
import NoteService from "../services/NoteService";
import { convertDateForCalendar } from "../utils/date";
import LocaleContext from "../context/Locale";
import { withTheme } from "styled-components";

const Calendar = ({ theme }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const { activeLocale } = useContext(LocaleContext);

  const intl = useIntl();
  const title = intl.formatMessage({ id: "calendar" });

  useEffect(async () => {
    const [err, result] = await until(NoteService.getAll());
    if (err) {
      console.error(err);
    } else {
      const formattedEvents = [];
      for (const note of result.data.data) {
        if (note.template !== "project") {
          continue;
        }

        if (note.deadline) {
          formattedEvents.push({
            title: note.title,
            date: convertDateForCalendar(note.deadline),
            url: `/notes/${note._id}`,
            color: theme.colors.primary
          });
        }

        if (!note.checklist || !note.checklist.tasks.length) {
          continue;
        }

        for (const task of note.checklist.tasks) {
          if (task.isCompleted) {
            continue;
          }
          if (task.deadline) {
            formattedEvents.push({
              title: `Task - ${task.title}`,
              date: convertDateForCalendar(task.deadline),
              url: `/notes/${note._id}`,
              color: theme.colors.secondary
            });
            // Don't display reminders for a task if a deadline is already set
            continue;
          }

          if (!task.reminders || !task.reminders.length) {
            continue;
          }

          for (const reminder of task.reminders) {
            formattedEvents.push({
              title: `Task - ${task.title}`,
              date: convertDateForCalendar(reminder),
              url: `/notes/${note._id}`,
              color: theme.colors.tertiary
            });
          }
        }
      }
      setCurrentEvents(formattedEvents);
    }
  }, []);

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>All Events ({currentEvents.length})</h2>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO title={title} />
      <Title level={2}>{title}</Title>
      {renderSidebar()}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        customButtons={Button}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        events={currentEvents}
        initialView="dayGridMonth"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        aspectRatio={1.8}
        firstDay={1}
        locale={activeLocale}
      />
    </>
  );
};

export default withTheme(Calendar);
