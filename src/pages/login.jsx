import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../app/slices/currentUserSlice';
import { fetchMyProfile } from '../app/slices/myProfileSlice';
import { fetchDrivingSchools } from '../app/slices/drivingSchoolSlice';
import { fetchMyAppointmentsInstructor } from '../app/slices/bookingSlice';
import './login.scss'

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [emailLogin, setEmailLogin] = useState('ruben@demo.ch')
  const [passwordLogin, setPasswordLogin] = useState('Secure')
  const [loginMessage, setLoginMessage] = useState("");

  const loginState = useSelector((store) => store.currentUser)
  const currentUserData = loginState.data
  const myProfileState = useSelector((store) => store.myProfile)
  const error = useSelector((state) => state.currentUser.error);
  console.log(error)
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState();

  const loginData = {
    email: emailLogin,
    password: passwordLogin
  }

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(loginData));
    } catch (error) {
      console.error('Login error:', error.message);
      // If you want to display the error message on the screen, you can set it to the component's state
      // Assuming you have a useState hook to manage the error state
      // setError(error.message);
    }
  };

  useEffect(() => {
    if (loginState.loggedIn) {
      dispatch(fetchMyProfile());
      dispatch(fetchDrivingSchools());

      
        //dispatch(fetchMyAppointmentsInstructor())
      
    }
  }, [loginState.loggedIn, dispatch]);

  useEffect(() => {
    if (myProfileState.ready) {
      navigate('/myprofile/');
    }
  }, [myProfileState.ready, navigate]);


  return (
    <>
    <div className="heroimagedetail">
        <h2 className="herocontentdetail">LOGIN TO DRIVE HUB</h2>
      </div>
    <div className="SignUp-Form-Container">
        {/* <h2>Login to BOOK. LEARN. DRIVE.</h2> */}
        <p>Please enter your Email and Password</p>
        {error && <p className='error-message'>Error: {error.detail}</p>}
        <div className='Sign-Setup-Login-Form-Div'>
          <form onSubmit={(e) => loginHandler(e)} className='Login-Form'>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Email</label>
              <input type="email" required className='Sign-Setup-Login-Form-Input' placeholder="Email" value={emailLogin}  onChange={(e)=>{setEmailLogin(e.target.value)}} />
            </div>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Password</label>
              <input type="password" required className='Sign-Setup-Login-Form-Input' placeholder="Password" value={passwordLogin} onChange={(e)=>{setPasswordLogin(e.target.value)}} />
            </div>
            <div>
                    <input className= "submit" type="submit" value="LOGIN" />
            </div>
          </form>
        </div>
    </div>
  </>
  )
}
