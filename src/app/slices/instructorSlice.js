import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';


const fetchAllInstructors = createAsyncThunk (
    "/user/instructors/", async (payload) => {
        const response = await axiosInstance.get("/user/instructors/", payload)
        console.log(response)
        return [...response.data];
    }
)

const fetchNearestInstructor = createAsyncThunk(
    "/user/nearest-instructors/",
    async (postalCode) => {

  
      const response = await axiosInstance.get(
        `/user/nearest-instructors/?search=${postalCode}`
      );
      console.log(response.data)
      return response.data;
    }
  );

export const instructorSlice = createSlice({
    name: 'instructors',
    initialState: {
        instructors: [],
        nearestInstructors: [],


    },
    reducers: {

        setInstructors: (state, { payload }) => {
            state.instructors = payload;
          },

        setNearestInstructors: (state, { payload }) => {
            state.nearestInstructors = payload;
        },

    },

    extraReducers: {
        [fetchAllInstructors.fulfilled]: (state, action) => {
          state.instructors = action.payload;
        },

        [fetchNearestInstructor.fulfilled]: (state, action) => {
            state.nearestInstructors = action.payload;
          },
      },
})

export { fetchAllInstructors ,fetchNearestInstructor }
export default instructorSlice.reducer