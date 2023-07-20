import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyAppointmentsInstructor, setAppointmentsNotAvailable } from "../../../app/slices/bookingSlice";
import "./bookingsNotAvailableForm.scss"

export const BookingsNotAvailableForm = () => {
    const dispatch = useDispatch();
    const bookingsState = useSelector((store) => store.bookings);
    const [startNotAvailable, setStartNotAvailable] = useState("");
    const [endNotAvailable, setEndNotAvailable] = useState("");
    const [creationMessage, setCreationMessage] = useState("");
  
    const NotAvailablePeriodData = {
      start_date: startNotAvailable,
      end_date: endNotAvailable,
    };
  
    const setNotAvailablePeriodHandler = async (e) => {
        e.preventDefault();
        console.log(NotAvailablePeriodData);
    
        dispatch(setAppointmentsNotAvailable(NotAvailablePeriodData))
          .then((data) => {
            setCreationMessage(data.payload.message); // Extract the message from the response data
            console.log(data)
            //dispatch(fetchMyAppointmentsInstructor())
          })
          .catch((error) => {
            setCreationMessage("Failed to create bookings");
          });
      };
  
    return (
      <>
        <div className="Create-Bookings-Form-Div">
          <h3>Not available Period</h3>
          {bookingsState.notAvailable && <h4 className="creation-success">{creationMessage}</h4>}
            {bookingsState.notAvailable == false && <h4 className="creation-success"> {creationMessage}</h4>}
          <form className="Create-Booking-Form" onSubmit={(e) => setNotAvailablePeriodHandler(e)}>
            <div className="Create-Bookings-Form-Element">
              <label>Start:</label>
              <input className="Create-Bookings-Form-Input" type="date" onChange={(e) => setStartNotAvailable(e.target.value)}></input>
            </div>
            <div className="Create-Bookings-Form-Element">
              <label>End:</label>
              <input className="Create-Bookings-Form-Input" type="date" onChange={(e) => setEndNotAvailable(e.target.value)}></input>
            </div>
            <input className="submit" type="submit" value="NOT AVAILABLE" />
          </form>
        </div>
      </>
    );
  };