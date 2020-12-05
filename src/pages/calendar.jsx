import { useState, useEffect, useContext } from "react";
import { useIntl } from "react-intl";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import enLocale from "@fullcalendar/core/locales/en-gb"; // only `en-au`, `en-gb` and `en-nz` are available
import frLocale from "@fullcalendar/core/locales/fr";

import { Button, Title, SEO } from "../components";
import until from "../utils/until";
import NoteService from "../services/NoteService";
import { convertDateForCalendar } from "../utils/date";
import LocaleContext from "../context/Locale";
import styled, { withTheme } from "styled-components";

const calendarLocales = { fr: frLocale, en: enLocale };

const StyledCalendar = styled.div`
  .calendar__title {
    position: relative;
  }
  .calendar__count {
    display: inline-block;
    vertical-align: middle;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    border-radius: 16px;
    padding: 2px 7px;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    position: absolute;
    top: 0;
    cursor: inherit;
    font-feature-settings: "tnum";
    font-variant: tabular-nums;
  }

  .fc table {
    border-color: ${({ theme }) => theme.colors.separator};
  }

  .fc-theme-standard .fc-scrollgrid,
  .fc-theme-standard .fc-list,
  .fc-theme-standard td,
  .fc-theme-standard th {
    border: 1px solid ${({ theme }) => theme.colors.separator};
  }

  .fc .fc-list-table tr > * {
    border: none !important;
  }

  .fc .fc-daygrid-day.fc-day-today {
    background-color: rgb(108 41 245 / 0.1);
  }

  .fc .fc-list-event:hover td {
    background-color: ${({ theme }) => theme.colors.itemBackground};
  }

  .fc .fc-list-empty {
    background-color: ${({ theme }) => theme.colors.itemBackground};
  }

  .fc-theme-standard .fc-list-day-cushion {
    background-color: ${({ theme }) => theme.colors.itemBackground};
    color: ${({ theme }) => theme.colors.text};
  }

  .fc .fc-scrollgrid-section-sticky > * {
    background-color: ${({ theme }) => theme.colors.itemBackground};
  }

  .fc .fc-button {
    border-radius: 5px;
  }

  .fc .fc-button-primary {
    background-color: ${({ theme }) => theme.colors.itemBackground};
    color: ${({ theme }) => theme.colors.itemColor};
    border: 1px solid ${({ theme }) => theme.colors.separator};
  }

  .fc .fc-button-active,
  .fc .fc-button-primary:not(:disabled):active,
  .fc .fc-button-primary:not(:disabled).fc-button-active {
    background-color: ${({ theme }) => theme.colors.primary} !important;
    border-color: ${({ theme }) => theme.colors.primary} !important;
    color: #ffffff;
  }

  .fc .fc-button:focus {
    box-shadow: 0 0 0 2px #cbd5e1 !important;
  }

  .fc .fc-today-button {
    border-radius: 5px !important;
    margin-right: 12px;
  }

  .fc-prev-button {
    border-radius: 5px 0 0 5px !important;
  }

  .fc-next-button {
    border-radius: 0 5px 5px 0 !important;
  }

  .fc .fc-header-toolbar.fc-toolbar {
    margin-bottom: 24px;

    .fc-toolbar-chunk {
      &:first-child {
        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
          .fc-today-button {
            margin: 0;
          }

          .fc-prev-button,
          .fc-next-button {
            display: none;
          }
        }
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: flex;
      flex-direction: row-reverse;

      .fc-toolbar-chunk {
        .fc-toolbar-title {
          font-size: 24px;
        }

        &:last-child {
          display: none;
        }
      }
    }
  }
`;

const Calendar = ({ theme }) => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const { activeLocale } = useContext(LocaleContext);

  const intl = useIntl();
  const title = intl.formatMessage({ id: "calendar" });

  useEffect(() => {
    const getCalendarEvents = async () => {
      const [result, error] = await until(NoteService.getAll());

      if (error) {
        console.error(error);
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
    };

    getCalendarEvents();
  }, []);

  const getInitialView = () => {
    if (window.innerWidth >= 768) {
      return "dayGridMonth";
    }

    return "listWeek";
  };

  const handleView = view => {
    if (window.innerWidth >= 768) {
      view.calendar.changeView("dayGridMonth");
    } else {
      view.calendar.changeView("listWeek");
    }
  };

  return (
    <>
      <SEO title={title} />
      <StyledCalendar className="calendar">
        <div className="calendar__header">
          <Title level={2} className="calendar__title">
            {title}
            <span className="calendar__count">{currentEvents.length}</span>
          </Title>
        </div>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin
          ]}
          customButtons={Button}
          headerToolbar={{
            left: "today,prev,next",
            center: "title",
            right: "timeGridDay,timeGridWeek,dayGridMonth"
          }}
          footerToolbar={{
            right: "prev,next"
          }}
          events={currentEvents}
          initialView={getInitialView()}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          firstDay={1}
          locale={calendarLocales[activeLocale]}
          height="auto"
          windowResize={({ view }) => handleView(view)}
        />
      </StyledCalendar>
    </>
  );
};

export default withTheme(Calendar);
