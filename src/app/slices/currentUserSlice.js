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


const loginUser = createAsyncThunk(
    "user/login", async (payload) => {
        const response = await axiosInstance.post("/token/", payload);
        const userData = {...response.data};
        const token = userData.access;

        const userState = {token}


        const userInfoResponse = await axiosInstance.get('/user/instructors/2');
        const userInfo = userInfoResponse.data;

        console.log(userState)
        console.log(userInfo)
        // console.log(userData.user)
        // console.log(id)
        // const id = userData.user.id;
        // const token = userData.access;
        // const userName = userData.user.username;
        // const firstname = userData.user.first_name;
        // const lastname = userData.user.last_name;
        // const amountLikes = userData.user.amount_of_likes
        // const userState = {id, token, userName, firstname, lastname, amountLikes};
        // localStorage.setItem("currentUser", JSON.stringify(userState))
        // return userState;
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

export { signUpUser, setUpUser, loginUser }
export default currentUserSlice.reducer