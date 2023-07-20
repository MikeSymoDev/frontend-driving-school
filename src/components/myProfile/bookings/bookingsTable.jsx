import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointmentsInstructor } from "../../../app/slices/bookingSlice";

export const BookingsTable = () => {
  const dispatch = useDispatch();

  // Use useSelector to access the instructorBookings state
  const instructorBookings = useSelector(
    (state) => state.bookings.instructorBookings
  );

  // State for sorting
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchMyAppointmentsInstructor());
  }, [dispatch]);

  console.log(instructorBookings);

  // Sort appointments based on sortColumn and sortOrder
  const sortedAppointments = instructorBookings.slice().sort((a, b) => {
    if (sortColumn === "date") {
      return a.date.localeCompare(b.date);
    } else if (sortColumn === "start_time") {
      return a.start_time.localeCompare(b.start_time);
    }
    return 0;
  });

  // Reverse sortedAppointments if sortOrder is 'desc'
  const sortedAndOrderedAppointments =
    sortOrder === "desc" ? sortedAppointments.reverse() : sortedAppointments;

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  //Format Date and Time

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString("de", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => handleSort("date")}>Date</th>
          <th onClick={() => handleSort("start_time")}>Start Time</th>
          <th>Student</th>
          <th>Instructor</th>
          <th>Notes</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {sortedAndOrderedAppointments.map((row, index) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{formatDate(row.date)}</td>
            <td>{formatTime(row.start_time)}</td>
            <td>{row.student}</td>
            <td>{row.instructor.email}</td>
            <td>{row.notes}</td>
            <td>{row.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};