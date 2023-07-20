import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewAppointments, fetchMyAppointmentsInstructor } from "../../../app/slices/bookingSlice";
import "./bookingsCreationForm.scss"

export const BookingsCreationForm = () => {

    const dispatch = useDispatch()
    
    const bookingsState = useSelector((store) => store.bookings)
    const [startPeriod, setStartPeriod] = useState("")
    const [endPeriod, setEndPeriod] = useState("")


    const periodData = {
        start_date: startPeriod,
        end_date: endPeriod
    }
    
    const createBookingsHandler = async (e) => {

        e.preventDefault();
        console.log(periodData)

        dispatch(createNewAppointments(periodData))
        dispatch(fetchMyAppointmentsInstructor())

    }


    return(
        <>
        <div className="Create-Bookings-Form-Div">
            <h3>Create Bookings</h3>
            {bookingsState.created && <h4 className="creation-success">Bookings have been created</h4>}
            {bookingsState.created == false && <h4 className="creation-failed"> No Bookings have been created</h4>}
            <form className="Create-Booking-Form" onSubmit = {(e) => createBookingsHandler(e)}>
                <div className="Create-Bookings-Form-Element">
                    <lable>Start:</lable>
                    <input className="Create-Bookings-Form-Input" type="date" onChange={(e)=>{setStartPeriod(e.target.value)}}></input>
                </div>
                <div className="Create-Bookings-Form-Element">
                    <lable>End:</lable>
                    <input className="Create-Bookings-Form-Input" type="date" onChange={(e)=>{setEndPeriod(e.target.value)}}></input>
                </div>
                <input className="submit" type="submit" value="CREATE BOOKINGS" />
            </form>

        </div>
        </>
    )
    
}