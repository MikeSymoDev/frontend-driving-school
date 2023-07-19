import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';

const fetchMyProfile = createAsyncThunk (
    "/user/me/edit/", async (_, { getState }) => {
        const { currentUser } = getState();

        axiosInstance.defaults.headers.common = {
            Authorization: `Bearer ${currentUser.token}`,
          };

        const response = await axiosInstance.get("/user/me/edit/")
        console.log(response)
        console.log(response.data)
        return response.data;;
    }
)

const editMyProfile = createAsyncThunk(
  "/user/me/edit/",
  async (updatedProfile, { getState }) => {
    const { currentUser } = getState();

    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${currentUser.token}`,
    };

    const response = await axiosInstance.patch("/user/me/edit/", updatedProfile);
    console.log(response);
    console.log(response.data);
    return response.data;
  }
);

export const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        data: [],
        ready: false
    },
    reducers: {
        setMyProfile: (state, { payload }) => {
            state.data = payload;
          },
    },


    extraReducers: {
        [fetchMyProfile.fulfilled]: (state, action) => {
          state.ready =true;
          state.loading = false;
          state.error = false;
          state.data = action.payload;
        },
      },
})

export { fetchMyProfile, editMyProfile }
export default myProfileSlice.reducer