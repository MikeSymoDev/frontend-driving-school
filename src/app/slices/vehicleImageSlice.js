import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';
import { act } from 'react-dom/test-utils';


const uploadVehicleImage = createAsyncThunk(
    "/upload-vehicle-image/",
    async ({ vehicleId, formData }, { getState }) => {
      const { currentUser } = getState();
  
      axiosInstance.defaults.headers.common = {
        Authorization: `Bearer ${currentUser.token}`,
      };
  
      const response = await axiosInstance.post(
        `/vehicle/vehicle-image/${vehicleId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the Content-Type to form data only for this request
          },
        }
      );
      return response.data;
    }
  );

  const deleteVehicleImage = createAsyncThunk(
    "/delete-vehicle/",
    async ({ vehicleId, imageId }, { getState }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
        };

        const response = await axiosInstance.delete(`/vehicle/vehicle-image/vehicle/${vehicleId}/image/${imageId}`)
        return response.data;
    })

export const vehicleImageSlice = createSlice({
    name: 'vehicleImages',
    initialState: {
        images: [],
        uploaded: null,
        deleted: null,
        error: null,

    },
    reducers: {

    },

    extraReducers: {
        [uploadVehicleImage.fulfilled]: (state, action) => {
            state.uploaded = true
            state.error = false
            state.images = action.payload
        },


        [uploadVehicleImage.rejected]: (state, action) => {
            state.error = true
            state.uploaded = false
        },

        [deleteVehicleImage.fulfilled]: (state, action) => {
          state.deleted = true
          state.error = false
      },


      [deleteVehicleImage.rejected]: (state, action) => {
          state.delete = false
          state.error = true
      },

    }
})

export { uploadVehicleImage, deleteVehicleImage }
export default vehicleImageSlice.reducer