import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';


const createNewAppointments = createAsyncThunk(
    "appointment/", async (payload, { getState, }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.post("/appointment/", payload)
      return response.data;
    })


const setAppointmentsNotAvailable = createAsyncThunk(
    "appointment/not-available/", async (payload, { getState, }) => {
        const { currentUser } = getState();
    
        axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
        };
    
        const response = await axiosInstance.post("/appointment/not-available/", payload)
        return response.data;
    })

const fetchMyAppointmentsInstructor = createAsyncThunk (
    "/appointment/me/instructor/", async (_, { getState }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
            };

        const response = await axiosInstance.get("/appointment/me/instructor/")
        console.log(response)
        console.log(response.data)
        return response.data;;
    }
)

const fetchAppointmentsByDate = createAsyncThunk(
    "/appointment/by-date/",
    async ({ instructorId, date }, { getState }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.get(
        `/appointment/by-date/${instructorId}/?search=${date}`
      );
      console.log(response.data)
      return response.data;
    }
  );

const bookAppointment = createAsyncThunk(
    "/book/appointment/",
    async ({ bookingId }, { getState }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.get(
        `/appointment/${bookingId}`
      );
      console.log(response.data)
      return response.data;
    }
)

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {

        data: [],
        instructorBookings: [],
        created: null,
        notAvailable: null,
        bookingsAsInstructor: null,
        appointmentsByDate: [],
        fetchAppointmentByDate: null,
    },
    reducers: {
        setInstructorAppointments: (state, { payload }) => {
            state.instructorBookings = payload;
          },
    },

    extraReducers: {
        [createNewAppointments.fulfilled]: (state, action) => {
            state.created = true
        },


        [createNewAppointments.rejected]: (state, action) => {
            state.created = false
        },

        [setAppointmentsNotAvailable.fulfilled]: (state, action) => {
            state.notAvailable = true
        },


        [setAppointmentsNotAvailable.rejected]: (state, action) => {
            state.notAvailable = false
        },

        [fetchMyAppointmentsInstructor.fulfilled]: (state, action) => {
            state.bookingsAsInstructor = true
            state.instructorBookings = action.payload

        },


        [fetchMyAppointmentsInstructor.rejected]: (state, action) => {
            // state.notAvailable = false
        },

        [fetchAppointmentsByDate.fulfilled]: (state, action) => {
            state.appointmentsByDate = action.payload
            state.fetchAppointmentByDate = true

        },


    }
})

export { createNewAppointments, setAppointmentsNotAvailable, fetchMyAppointmentsInstructor, fetchAppointmentsByDate, bookAppointment }
export default bookingSlice.reducer