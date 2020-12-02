import { useState } from "react";
import { useIntl } from "react-intl";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button, Title, SEO, Checkbox } from "../components";

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const intl = useIntl();
  const title = intl.formatMessage({ id: "calendar" });

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleEvents = events => {
    setCurrentEvents(events);
  };

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
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
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
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        eventContent={renderEventContent}
        eventsSet={handleEvents}
        aspectRatio={1.8}
      />
    </>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default Calendar;
