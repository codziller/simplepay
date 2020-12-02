import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const LeaveOverview = () => {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
};

export default LeaveOverview;