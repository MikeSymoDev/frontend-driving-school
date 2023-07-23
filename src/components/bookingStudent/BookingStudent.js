import React, { useState } from "react";
import "../bookingStudent/BookingStudent.scss";
import "../../styles/_variables.scss";
import { useDispatch } from "react-redux";
import { fetchAppointmentsByDate } from "../../app/slices/bookingSlice";

const BookingComponent = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);

  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);

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

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  const handleTimeSelection = (selectedTime) => {
    console.log("Selected Time:", selectedTime);
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
          appointments.map((appointment) => (
            <div key={appointment.id} className="time-card">
              <h3>Start Slot: {appointment.start_time}</h3>
              {/* ////////
              {appointment.state === "NA" ? (
                <h6>State: {"unavailable "}</h6>
              ) : (
                <h6>State: {"avaliable "}</h6>
              )} */}
              <h6>State: {" " + appointment.state}</h6>

              <h6>
                Instructor:{" "}
                {appointment.instructor.first_name +
                  " " +
                  appointment.instructor.last_name}
              </h6>
              <h6>Email: {" " + appointment.instructor.email}</h6>
              <h6>Location:{" " + appointment.location}</h6>
              {appointment.state === "NA" ? (
                <p className="taken">BOOK</p>
              ) : (
                <button
                  onClick={() => handleTimeSelection(appointment.start_time)}
                >
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
