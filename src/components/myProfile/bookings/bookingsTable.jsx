import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointmentsInstructor } from "../../../app/slices/bookingSlice";

export const BookingsTable = () => {
  const dispatch = useDispatch();

  // Use useSelector to access the instructorBookings state
  const instructorBookings = useSelector(
    (state) => state.bookings.instructorBookings
  );

  useEffect(() => {
    dispatch(fetchMyAppointmentsInstructor());
  }, [dispatch]);

  console.log(instructorBookings);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>Student</th>
          <th>Instructor</th>
          <th>Notes</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {instructorBookings.map((row, index) => (
          <tr key={index}>
            <td>{row.id}</td>
            <td>{row.date}</td>
            <td>{row.start_time}</td>
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
