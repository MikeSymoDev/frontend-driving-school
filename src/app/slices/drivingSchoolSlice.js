import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';

const fetchDrivingSchools = createAsyncThunk (
    "user/driving-schools", async (payload) => {
        const response = await axiosInstance.get("/drivingschool/", payload)
        console.log(response)
        return [...response.data];
    }
)

export const drivingSchoolSlice = createSlice({
    name: 'drivingSchools',
    initialState: {
        data: []

    },
    reducers: {
        setDrivingSchools: (state, { payload }) => {
            state.data = payload;
          },

    },

    extraReducers: {
        [fetchDrivingSchools.fulfilled]: (state, action) => {
          state.loading = false;
          state.error = false;
          state.data = action.payload;
        },
      },
})

export {fetchDrivingSchools}
export default drivingSchoolSlice.reducer