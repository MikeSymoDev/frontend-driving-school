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
        // console.log(response)
        // console.log(response.data)
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
    async (bookingId, { getState }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.patch(
        `/appointment/${bookingId}`
      );
      console.log(response.data)
      return response.data;
    }
)

const cancelAppointment = createAsyncThunk(
    "/cancel/appointment/",
    async (bookingId, { getState }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.patch(
        `/appointment/cancellation/${bookingId}`
      );
      console.log(response.data)
      return response.data;
    }
)

const fetchMyAppointmentsStudent = createAsyncThunk (
    "/appointment/me/student/", async (_, { getState }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
            };

        const response = await axiosInstance.get("/appointment/mybookings/")
        // console.log(response)
        // console.log(response.data)
        return response.data;;
    }
)

export const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {

        data: [],
        instructorBookings: [],
        studentBookings: [],
        created: null,
        notAvailable: null,
        bookingsAsInstructor: null,
        bookingsAsStudent: null,
        appointmentsByDate: [],
        fetchAppointmentByDate: null,
        bookingsChanged: false,
        loading: false,
        ready: false,
        booked: false,
        cancelled: false,
    },
    reducers: {
        setInstructorAppointments: (state, { payload }) => {
            state.instructorBookings = payload;
          },
        
        setStudentAppointments: (state, { payload }) => {
            state.studentBookings = payload;
        },

        
    },

    extraReducers: {
        [createNewAppointments.fulfilled]: (state, action) => {
            state.created = true
            state.bookingsChanged = true
        },


        [createNewAppointments.rejected]: (state, action) => {
            state.created = false
        },

        [setAppointmentsNotAvailable.fulfilled]: (state, action) => {
            state.notAvailable = true
            state.bookingsChanged = true
        },


        [setAppointmentsNotAvailable.rejected]: (state, action) => {
            state.notAvailable = false
        },

        [fetchMyAppointmentsInstructor.fulfilled]: (state, action) => {
            state.bookingsAsInstructor = true
            state.instructorBookings = action.payload
            state.loading = false
            state.ready = true;
            state.notAvailable = false
            //state.created = false

        },

        [fetchMyAppointmentsStudent.fulfilled]: (state, action) => {
            state.bookingsAsStudent = true
            state.studentBookings = action.payload
            state.loading = false
            state.ready = true;
            state.notAvailable = false

        },

        [fetchMyAppointmentsInstructor.pending]: (state, action) => {
            state.bookingsAsInstructor = true
            state.loading = true

        },


        [fetchMyAppointmentsStudent.pending]: (state, action) => {
            state.bookingsAsInstructor = true
            state.cancelled = false;

        },


        [fetchMyAppointmentsInstructor.rejected]: (state, action) => {
            // state.notAvailable = false
        },

        [fetchAppointmentsByDate.fulfilled]: (state, action) => {
            state.appointmentsByDate = action.payload
            state.fetchAppointmentByDate = true
            state.booked = false

        },

        [bookAppointment.fulfilled]: (state, action) => {
            state.booked = true
        },

        [cancelAppointment.fulfilled]: (state, action) => {
            state.cancelled = true
        }


    }
})

export { createNewAppointments, setAppointmentsNotAvailable, fetchMyAppointmentsInstructor, fetchAppointmentsByDate, bookAppointment, fetchMyAppointmentsStudent, cancelAppointment }
export default bookingSlice.reducer