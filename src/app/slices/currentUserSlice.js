import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios';

const signUpUser = createAsyncThunk("user/signup", async (payload) => {
    try {
      const response = await axiosInstance.post("/signup/", payload);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  });

//   const setUpUser = createAsyncThunk("user/setup", async (payload) => {
//     try {
//       const response = await axiosInstance.patch("/user/setup/", payload);
//       return response.data;
//     } catch (error) {
//       throw new Error(error.response.data.message);
//     }
//   });

const setUpUser = createAsyncThunk("user/setup", async (formData) => {
    try {
        const response = await axiosInstance.patch("user/setup/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

  const uploadProfileImage = createAsyncThunk("user/me/edit/", async (payload) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", payload); // Assuming the payload is the image file
  
      const response = await axiosInstance.patch("user/me/edit/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the Content-Type to form data only for this request
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  });


const loginUser = createAsyncThunk(
    "user/login", async (payload) => {
        const response = await axiosInstance.post("/token/", payload);
        const userData = {...response.data};
        const token = userData.access;
        const id = userData.loggedUser.id
        const email = userData.loggedUser.email
        const gender = userData.loggedUser.gender
        const type = userData.loggedUser.type
        const address = userData.loggedUser.address
        const postal_code = userData.loggedUser.postal_code
        const location_city = userData.loggedUser.location_city
        const country = userData.loggedUser.country
        const about = userData.loggedUser.about
        const profile_image = userData.loggedUser.profile_image
        const instructor_license = userData.loggedUser.instructor_license
        const created = userData.loggedUser.created
        const updated = userData.loggedUser.updated
        const has_learner_permit = userData.loggedUser.has_learner_permit
        const phone = userData.loggedUser.phone
        const username = userData.loggedUser.user.username
        const first_name = userData.loggedUser.user.first_name
        const last_name = userData.loggedUser.user.last_name
        const driving_school = userData.loggedUser.driving_school
        const vehicles = userData.loggedUser.vehicles

        const userState = {token, id, email, gender, type, address, postal_code, location_city, country, about, profile_image, instructor_license, 
            created, updated, has_learner_permit, phone, username, first_name, last_name, driving_school, vehicles}

        
        console.log(userState)

        localStorage.setItem("currentUser", JSON.stringify(userState))
        return userState;

    }
)


export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        token: "",
        id: "",
        email: "",
        gender: "",
        type: "",
        address: "",
        postal_code: "",
        location_city: "",
        country: "",
        about: "",
        profile_image: "",
        instructor_license: "",
        created: "",
        updated: "",
        has_learner_permit: "",
        phone: "",
        username: "",
        first_name: "",
        last_name: "",
        driving_school: "",
        vehicles: "",
        signedUp: false,
        error: null,
        loggedIn: false,

    },
    reducers: {
        SET_USER: (state, action) => {
            state.token = action.payload.token;
            state.id = action.payload.id
            state.email = action.payload.email
            state.gender = action.payload.gender
            state.type = action.payload.type
            state.address = action.payload.address
            state.postal_code = action.payload.postal_code
            state.location_city = action.payload.location_city
            state.country = action.payload.country
            state.about = action.payload.about
            state.profile_image = action.payload.profile_image
            state.instructor_license = action.payload.instructor_license
            state.created = action.payload.created
            state.updated = action.payload.updated
            state.has_learner_permit = action.payload.has_learner_permit
            state.phone = action.payload.phone
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.driving_school = action.payload.driving_school
            state.vehicles = action.payload.vehicles
            state.loggedIn = true
        },

        DELETE_USER: state => {
            state.token = ""
            state.id = ""
            state.email = ""
            state.gender = ""
            state.type = ""
            state.address = ""
            state.postal_code = ""
            state.location_city = ""
            state.country = ""
            state.about = ""
            state.profile_image = ""
            state.instructor_license = ""
            state.created = ""
            state.updated = ""
            state.has_learner_permit = ""
            state.phone = ""
            state.username = ""
            state.first_name = ""
            state.last_name = ""
            state.driving_school = ""
            state.vehicles = ""
            state.loggedIn = false
            localStorage.clear();
        }
    },

    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            console.log("User is Logged in")
            state.token = action.payload.token;
            state.id = action.payload.id
            state.email = action.payload.email
            state.gender = action.payload.gender
            state.type = action.payload.type
            state.address = action.payload.address
            state.postal_code = action.payload.postal_code
            state.location_city = action.payload.location_city
            state.country = action.payload.country
            state.about = action.payload.about
            state.profile_image = action.payload.profile_image
            state.instructor_license = action.payload.instructor_license
            state.created = action.payload.created
            state.updated = action.payload.updated
            state.has_learner_permit = action.payload.has_learner_permit
            state.phone = action.payload.phone
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.driving_school = action.payload.driving_school
            state.vehicles = action.payload.vehicles

            state.signedUp = null
            state.error = null

            state.loggedIn = true
        },

        [signUpUser.fulfilled]: (state) => {
            console.log("User is Signed Up")
            state.signedUp = true
            state.error = null
        },

        [signUpUser.rejected]: (state, action) => {
            state.error = action.error.message;
        },


    }
})

export const { SET_USER, DELETE_USER } = currentUserSlice.actions;
export { signUpUser, setUpUser, loginUser, uploadProfileImage }
export default currentUserSlice.reducer