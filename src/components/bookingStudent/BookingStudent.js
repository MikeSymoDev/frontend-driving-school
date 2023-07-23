import React, { useEffect, useState } from "react";
import "../bookingStudent/BookingStudent.scss";
import "../../styles/_variables.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  bookAppointment,
  fetchAppointmentsByDate,
} from "../../app/slices/bookingSlice";

const BookingComponent = () => {
  const bookingState = useSelector((store) => store.bookings);

  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointmentsByDateHandler(selectedDate);
  }, [dispatch, bookingState.booked]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchAppointmentsByDateHandler(selectedDate);
  };

  const fetchAppointmentsByDateHandler = async (selectedDate) => {
    try {
      const response = await dispatch(
        fetchAppointmentsByDate({ instructorId: 2, date: selectedDate })
      );
      const appointmentsData = response.payload;
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching driver detail:", error);
    }
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString("de", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const compareAppointmentsByStartTime = (a, b) => {
    const timeA = new Date(`2000-01-01T${a.start_time}`);
    const timeB = new Date(`2000-01-01T${b.start_time}`);
    return timeA - timeB;
  };

  const mapStateToLabel = (state) => {
    const STATE_CHOICES = {
      O: "Open",
      B: "Booked",
      NA: "Not Available",
    };
    return STATE_CHOICES[state] || "";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleBookAppointment = (appointmentId) => {
    dispatch(bookAppointment(appointmentId));
    setSelectedDate(date);
  };

  return (
    <div>
      <h1 className="book">Book an Appointemnt</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label htmlFor="appointmentDate">Choose A Date: </label>
        <input
          className="datepicker"
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          onChange={handleDateChange}
        />
      </form>

      <div className="time-cards-container">
        {/* <img
          src={driver.profile_image}
          alt="Profile"
          style={{ width: "200px", height: "200px", borderRadius: "50%" }}
        /> */}
        {Array.isArray(appointments) &&
          // Sort the appointments array based on start_time
          appointments
            .slice() // Create a copy of the array to avoid mutating the original
            .sort(compareAppointmentsByStartTime) // Sort the copied array
            .map((appointment) => (
              <div key={appointment.id} className="time-card">
                <h3>Start Slot: {formatTime(appointment.start_time)}</h3>
                {/* ////////
              {appointment.state === "NA" ? (
                <h6>State: {"unavailable "}</h6>
              ) : (
                <h6>State: {"avaliable "}</h6>
              )} */}
                <h6>State: {mapStateToLabel(appointment.state)}</h6>

                <h6>
                  Instructor:{" "}
                  {appointment.instructor.first_name +
                    " " +
                    appointment.instructor.last_name}
                </h6>
                <h6>Email: {" " + appointment.instructor.email}</h6>
                <h6>Location:{" " + appointment.location}</h6>
                {appointment.state === "NA" && <p className="taken">BOOK</p>}
                {appointment.state === "B" && <p className="taken">BOOK</p>}
                {appointment.state === "O" && (
                  <button onClick={() => handleBookAppointment(appointment.id)}>
                    BOOK
                  </button>
                )}
              </div>
            ))}
      </div>
    </div>
  );
};

export default BookingComponent;
