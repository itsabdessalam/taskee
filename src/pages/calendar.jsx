import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import React, { useState } from 'react';
import { isLoggedIn } from "../utils/auth";
import { Redirect } from "react-router-dom";
import { createEventId } from "../utils/envent-utils";
import { Button, Title } from "../components";

const Calendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  if (!isLoggedIn()) return <Redirect to={"/getting-started"}/>;

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const renderSidebar = () => {
    return (
     <div className='demo-app-sidebar'>
       <div className='demo-app-sidebar-section'>
         <label>
           <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={handleWeekendsToggle}
           />
           toggle weekends
         </label>
       </div>
       <div className='demo-app-sidebar-section'>
         <h2>All Events ({currentEvents.length})</h2>
         <ul>
           {currentEvents.map(renderSidebarEvent)}
         </ul>
       </div>
     </div>
    );
  };

  return (
   <>
     <Title level={2}>Calendar</Title>
     {renderSidebar()}
     <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      customButtons={Button}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView='dayGridMonth'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={weekendsVisible}
      select={handleDateSelect}
      eventContent={renderEventContent}
      eventsSet={handleEvents}
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
     <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
     <i>{event.title}</i>
   </li>
  );
}

export default Calendar;