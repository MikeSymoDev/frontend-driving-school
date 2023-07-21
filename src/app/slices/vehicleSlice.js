import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';


const fetchMyVehicles = createAsyncThunk(
    "/my-vehicles/", async (_, { getState }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
        };

        const response = await axiosInstance.get("/vehicle/my-vehicles/")
        console.log(response)
        console.log(response.data)
        return response.data;;
    }
)

const createNewVehicle = createAsyncThunk(
    "/create-vehicle/", async (payload, { getState, }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
        };

        const response = await axiosInstance.post("/vehicle/", payload)
        return response.data;
    })

const deleteVehicle = createAsyncThunk(
    "/delete-vehicle/",
    async (vehicleId, { getState, }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
        };

        const response = await axiosInstance.delete(`/vehicle/${vehicleId}`)
        return response.data;
    })


export const vehicleSlice = createSlice({
    name: 'vehicles',
    initialState: {

        data: [],
        newCreated: false,
        ready: null,
        loading: null,
        error: null,
        deleted: null,
    },
    reducers: {

    },

    extraReducers: {
        [fetchMyVehicles.fulfilled]: (state, action) => {
            state.ready = true;
            state.loading = false;
            state.error = false;
            state.data = action.payload;
            state.deleted = false;
            state.newCreated = false;
        },

        [createNewVehicle.fulfilled]: (state, action) => {
            state.newCreated = true;
        },

        [createNewVehicle.rejected]: (state, action) => {
            state.newCreated = false;
            state.error = true
            state.loading = false
        },

        [deleteVehicle.fulfilled]: (state,action) => {
            state.deleted = true;
        },
    },
})

export { fetchMyVehicles, createNewVehicle, deleteVehicle }
export default vehicleSlice.reducer