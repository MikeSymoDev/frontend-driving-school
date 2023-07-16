import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';

const signUpUser = createAsyncThunk (
    "user/signup", async (payload) => {
        const response = await axiosInstance.post("/signup/", payload)
        return response;
    }
)

const setUpUser = createAsyncThunk (
    "user/setup", async (payload) => {
        const response = await axiosInstance.patch("/user/setup/", payload)
        return response;
    }
)

export const currentUserSlice = createSlice({
    name: 'currentUserSlice',
    initialState: {

        signedUp: false

    },
    reducers: {

    },

    extraReducers: {
        [signUpUser.fulfilled]: (state) => {
            console.log("User is Signed Up")
            state.signedUp = true
        }
    }
})

export { signUpUser, setUpUser }
export default currentUserSlice.reducer