import BookingComponent from "../components/bookingStudent/BookingStudent"
import HeroDriverDetail from "../components/heroDriverDetail/heroDriverDetail"
import './driverAppointment.scss';

export const DriverAppointment = () => {



    return (
        <>
        <div className='herodetailbook'>
            <HeroDriverDetail />

    </div>

        <BookingComponent />
        </>
   
    )
  }