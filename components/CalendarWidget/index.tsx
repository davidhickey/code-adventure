"use client";

import { useEffect, useMemo, useState } from "react";

type Event = {
  title: string;
  description: string;
  time: string;
}
type Timeslot = {
  id: number;
  time: string;
  event: Event | null;
}

type Calendar = Timeslot[];

const CalendarWidget = () => {
  const [calendarData, setCalendarData] = useState<Calendar | null>(null);
  const memoizedCalendarData = useMemo(() => calendarData, [calendarData]);
  const [eventFormId, setEventForm] = useState<string>("");
  const [eventFormTitle, setEventFormTitle] = useState<string>("");
  const [eventFormDescription, setEventFormDescription] = useState<string>("");

  const handleEventFormOpen = (id: number): void => {
    setEventForm(id.toString());
    const hasEvent = calendarData && calendarData[id].event;
    if(hasEvent) {
      setEventFormTitle(hasEvent.title);
      setEventFormDescription(hasEvent.description);
    }
  }

  const handleEventFormSubmit = (): void => {
    if(!calendarData || !eventFormId) return;
    const updatedCalendar = calendarData.map((timeslot) => {
      if(timeslot.id === Number(eventFormId)) {
        return {...timeslot, event: {title: eventFormTitle, description: eventFormDescription, time: timeslot.time}}
      }
      return timeslot;
    });
    setCalendarData(updatedCalendar);
    setEventForm("");
    setEventFormTitle("");
    setEventFormDescription("");
  }

  const handleDeleteEvent = (id: number): void => {
    if(!calendarData) return;
    const updatedCalendar = calendarData.map((timeslot) => {
      if(timeslot.id === id) {
        return {...timeslot, event: null}
      }
      return timeslot;
    });
    setCalendarData(updatedCalendar);
  }

  useEffect(() => {
    const calendarArray = Array.from({length: 24}, (v, i) => {
      return {'id': i, 'time': `${i}:00 - ${i+1}:00`, 'event': null}
     });
    setCalendarData(calendarArray);
  }, []);

  return (
    <div>
      {eventFormId && 
        <div>
          <h3>Add Event for {calendarData && calendarData[Number(eventFormId)].time}</h3>
          <input type="text" placeholder="Title" value={eventFormTitle} onChange={(e) => setEventFormTitle(e.currentTarget.value)} />
          <input type="text" placeholder="Description" value={eventFormDescription} onChange={(e) => setEventFormDescription(e.currentTarget.value)} />
          <button onClick={handleEventFormSubmit}>Submit</button>
        </div>
      }
      {memoizedCalendarData && memoizedCalendarData.map((timeslot, i) => (
        <div key={i} className="flex justify-between items-center border-b border-gray-200 py-4">
          <h4>{timeslot.time}</h4>
          {timeslot.event &&
          <div>
            <h5>{timeslot.event.title}</h5>
            <p>{timeslot.event.description}</p>
          </div>
          }
          {!timeslot.event && <button onClick={() => handleEventFormOpen(i)}>Add Event</button>}
          {timeslot.event && <button onClick={() =>  handleEventFormOpen(i)}>Edit Event</button>}
          {timeslot.event && <button onClick={() => handleDeleteEvent(i)}>Delete Event</button>}
        </div>
      ))}
    </div>
  )
}

export default CalendarWidget;