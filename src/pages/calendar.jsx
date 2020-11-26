import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from ' ';

const Calendar = () => {
  if (!isLoggedIn()) return <Redirect to={"/getting-started"}/>;
  return (
   <>
     <Title level={2}>Calendar</Title>
     <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
      initialEvents={INITIAL_EVENTS}
      select={handleDateSelect}
      eventContent={renderEventContent}
      eventClick={handleEventClick}
      eventsSet={handleEvents}
     />
   </>
  );
};

export default Calendar;
