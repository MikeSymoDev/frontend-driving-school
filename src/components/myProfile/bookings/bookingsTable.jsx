import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, fetchMyAppointmentsInstructor, fetchMyAppointmentsStudent, setAppointmentsNotAvailable } from "../../../app/slices/bookingSlice";
import "./bookingsTable.scss"
import Spinner from "../../spinner/spinner";

export const BookingsTable = () => {
  const dispatch = useDispatch();
  const bookingsState = useSelector((state) => state.bookings)
  const instructorBookings = useSelector((state) => state.bookings.instructorBookings);
  const studentBookings = useSelector((state) => state.bookings.studentBookings);
  const bookingsChanged = useSelector((state) => state.bookings.bookingsChanged);

  const currentUser = useSelector((store) => store.currentUser)

  useEffect(() => {
    dispatch(fetchMyAppointmentsInstructor());
  }, [dispatch, bookingsChanged]);
  console.log(instructorBookings);

  console.log(currentUser.type)

  useEffect(() => {
    dispatch(fetchMyAppointmentsStudent())
  }, [dispatch, bookingsState.cancelled])



  // State for sorting
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  let bookings;

  if (currentUser.type == "I") {
    bookings = instructorBookings
  }

  else {
    bookings = studentBookings
  }

  const sortedAppointments = bookings.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortColumn === "date") {
      return dateA.getTime() - dateB.getTime();
    } else if (sortColumn === "start_time") {
      return dateA.setHours(a.start_time) - dateB.setHours(b.start_time);
    }
    return 0;
  })


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

  const mapStateToLabel = (state) => {
    const STATE_CHOICES = {
      O: "Open",
      B: "Booked",
      NA: "Not Available",
    };
    return STATE_CHOICES[state] || "";
  };

  // State for filters
  const [filterValues, setFilterValues] = useState({
    id: "",
    date: "",
    start_time: "",
    student: "",
    instructor: "",
    notes: "",
    state: "",
  });

  const handleFilterChange = (column, value) => {
    setFilterValues((prevFilterValues) => ({
      ...prevFilterValues,
      [column]: value,
    }));
  };

  const filteredAppointments = sortedAndOrderedAppointments.filter((row) => {
    return Object.entries(filterValues).every(([column, value]) => {
      if (column === "state") {
        return mapStateToLabel(row[column]).toLowerCase().includes(value.toLowerCase());
      } else {
        const cellValue = row[column] ? row[column].toString().toLowerCase() : ""; // Check for null value
        return cellValue.includes(value.toLowerCase());
      }
    });
  });

  const handleBookingCancellation = (appointmentId) => {
    dispatch(cancelAppointment(appointmentId));
  }

  return (
    <table className="bookings-table">
      <thead>
        <tr>
          <th>
            Booking-ID
            <input
              type="text"
              value={filterValues.id}
              onChange={(e) => handleFilterChange("id", e.target.value)}
            />
          </th>
          <th /*onClick={() => handleSort("date")}*/>Date
            <input
              type="text"
              value={filterValues.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </th>
          <th>
            Start Time
            <input
              type="text"
              value={filterValues.start_time}
              onChange={(e) => handleFilterChange("start_time", e.target.value)}
            />
          </th>
          <th>
            Student
            <input
              type="text"
              value={filterValues.student}
              onChange={(e) => handleFilterChange("student", e.target.value)}
            />
          </th>
          <th>
            Instructor
            <input
              type="text"
              value={filterValues.instructor}
              onChange={(e) => handleFilterChange("instructor", e.target.value)}
            />
          </th>
          <th>
            Notes
            <input
              type="text"
              value={filterValues.notes}
              onChange={(e) => handleFilterChange("notes", e.target.value)}
            />
          </th>
          <th>
            State
            <input
              type="text"
              value={filterValues.state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {bookingsState.ready && (
          <>
            {Array.isArray(filteredAppointments) && filteredAppointments.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{formatDate(row.date)}</td>
                <td>{formatTime(row.start_time)}</td>
                <td>{row.student?.email}</td>
                <td>{row.instructor?.email}</td> {/* Use optional chaining operator */}
                <td>{row.notes}</td>
                {currentUser.type == "I"&& <td>{mapStateToLabel(row.state)}</td>}
                {currentUser.type == "S"&& <td>{mapStateToLabel(row.state)} <button className="small-button" onClick={() => handleBookingCancellation(row.id)}>Cancel</button></td>}
              </tr>
            ))}
          </>
        )}
        {bookingsState.loading && (
          <div className="Booking-Table-Spinner">
            <Spinner></Spinner>
          </div>)}
      </tbody>
    </table>
  );
};