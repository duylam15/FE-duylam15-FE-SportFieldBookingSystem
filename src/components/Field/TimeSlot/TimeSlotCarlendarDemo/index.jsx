import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Card, Spinner } from "react-bootstrap";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AdminTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchedTimeSlots = await 
      setTimeSlots(fetchedTimeSlots);
      setLoading(false);
    }, 1000); // Mô phỏng độ trễ 1 giây
  }, []);

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: "#3174ad",
        color: "white",
        borderRadius: "5px",
        padding: "5px",
      },
    };
  };

  return (
    <Card>
      <Card.Header>
        <h4>Admin Time Slots</h4>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
            <p>Loading time slots...</p>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={timeSlots}
            startAccessor="start"
            endAccessor="end"
            min={new Date().setHours(8, 0, 0)} // Bắt đầu từ 8:00 AM
            max={new Date().setHours(23, 30, 0)} // Kết thúc 11:30 PM
            style={{
              height: "calc(100vh - 250px)",
              backgroundColor: "white",
              overflowY: "hidden",
            }}
            defaultView="week"
            messages={{
              week: "Tuần",
              day: "Ngày",
              today: "Hôm nay",
              previous: "Trước",
              next: "Tiếp",
            }}
            eventPropGetter={eventStyleGetter}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default AdminTimeSlots;
