import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAppointmentsByDate } from "../app/slices/bookingSlice";

export const AppointmentByDate = () => {
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
        // Handle error
      }
    };
  
    return (
      <>
        <form>
          <input type="date" onChange={handleDateChange} />
        </form>
        {Array.isArray(appointments) && (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id}>{appointment.date} State: {appointment.state}</li>
              
            ))}
          </ul>
        )}
      </>
    );
  };
  