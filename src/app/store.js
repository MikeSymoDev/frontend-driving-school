import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "../app/slices/currentUserSlice"
import bookingReducer from "../app/slices/bookingSlice"
import instructorReducer from "../app/slices/instructorSlice"
import drivingSchoolReducer from "../app/slices/drivingSchoolSlice"
import vehicleReducer from "../app/slices/vehicleSlice"
import vehicleImageReducer from "../app/slices/vehicleImageSlice"



export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        bookings: bookingReducer,
        instructors: instructorReducer,
        drivingSchools: drivingSchoolReducer,
        vehicles: vehicleReducer,
        vehicleImages: vehicleImageReducer,
    }
})