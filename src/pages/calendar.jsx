import { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Title, SEO, Checkbox } from "../components";
import until from "../utils/until";
import NoteService from "../services/NoteService";

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const intl = useIntl();
  const title = intl.formatMessage({ id: "calendar" });

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };
  const convertDate = deadline => {
    return `${new Date(deadline).getUTCFullYear()}-${(
      "0" +
      (new Date(deadline).getUTCMonth() + 1)
    ).slice(-2)}-${"0" + new Date(deadline).getUTCDay()}`;
  };
  useEffect(async () => {
    const [err, result] = await until(NoteService.getAll());
    if (err) {
      console.error(err);
    } else {
      result.data.data.map(data => {
        setCurrentEvents(e =>
          e.concat({
            title: data.title,
            date: `${convertDate(data.deadline)}`,
            url: `/notes/${data._id}`
          })
        );
      });
    }
  }, []);

  const renderSidebar = () => {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <Checkbox
            name="toggleWeekends"
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
            label={"toggle weekends"}
          />
        </div>
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
        weekends={weekendsVisible}
        aspectRatio={1.8}
      />
    </>
  );
};

export default Calendar;
