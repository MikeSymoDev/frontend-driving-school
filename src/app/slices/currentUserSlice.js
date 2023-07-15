import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';

const signUpUser = createAsyncThunk (
    "user/validation", async (payload) => {
        const response = await axiosInstance.post("/signup/", payload)
        //const userData = {...response.data};

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

export { signUpUser }
export default currentUserSlice.reducer