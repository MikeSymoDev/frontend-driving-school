import React, { useEffect, useState } from "react";
import "../bookingStudent/BookingStudent.scss";
import "../../styles/_variables.scss";
import { useDispatch, useSelector } from "react-redux";
import {bookAppointment,fetchAppointmentsByDate,} from "../../app/slices/bookingSlice";
import { useParams } from "react-router-dom";

const BookingComponent = () => {
  const bookingState = useSelector((store) => store.bookings)

  const currentDate = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const { id } = useParams();
  const [instructorId, setInstructorId] = useState(null);


  useEffect(() => {
    const parsedInstructorId = parseInt(id, 10);
    setInstructorId(parsedInstructorId);
    fetchAppointmentsByDateHandler(selectedDate, parsedInstructorId);
  }, [dispatch, bookingState.booked, selectedDate, id]);


  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchAppointmentsByDateHandler(selectedDate, instructorId);
  };

  const fetchAppointmentsByDateHandler = async (selectedDate, instructorId) => {
    try {
      const response = await dispatch(
        fetchAppointmentsByDate({ instructorId: instructorId, date: selectedDate })
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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

  const mapStateToClass = (state) => {
    const STATE_CLASSES = {
      O: "open",
      B: "booked",
      NA: "not-available",
    };
    return STATE_CLASSES[state] || "";
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
      <h2 className="book">Book an Appointment</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="label" >Choose A Date: </label>
        <input
          className="datepicker"
          type="date"
          id="appointmentDate"
          name="appointmentDate"
          value={date}
          onChange={handleDateChange}
        />
      </form>
      {appointments && appointments.length > 0 ? (
        <div className="time-cards-container">
          {appointments
            .slice() // Create a copy of the array to avoid mutating the original
            .sort(compareAppointmentsByStartTime) // Sort the copied array
            .map((appointment) => (
              <div key={appointment.id} className={`time-card ${mapStateToClass(appointment.state)}`}>
                <h3>Start Slot: {formatTime(appointment.start_time)}</h3>
                <h6>Date: {formatDate(appointment.date)}</h6>
                <div className="state-div">
                <h6 className="state">{mapStateToLabel(appointment.state)}</h6>
                </div>

                <h6>
                  Instructor:{" "}
                  {appointment.instructor.first_name +
                    " " +
                    appointment.instructor.last_name}
                </h6>
                <h6>Email: {" " + appointment.instructor.email}</h6>
                <h6>Location:{" " + appointment.location}</h6>
                {appointment.state === "NA" && (<button disabled onClick={()=> handleBookAppointment(appointment.id)}>BOOK</button>)}
                {appointment.state === "B" && (<button disabled onClick={()=> handleBookAppointment(appointment.id)}>BOOK</button>)}
                {appointment.state === "O" && (<button onClick={() => handleBookAppointment(appointment.id)}>BOOK</button>)}
              </div>
            ))}
      </div>
    ) : (
      <div className="No-Appoinments">
      <h3>No Appointments available</h3>
      </div>
    )}
  </div>
  );
};

export default BookingComponent;
