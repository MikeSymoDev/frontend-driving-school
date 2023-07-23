import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../app/slices/currentUserSlice';
import { fetchMyProfile } from '../app/slices/myProfileSlice';
import { fetchDrivingSchools } from '../app/slices/drivingSchoolSlice';
import { fetchMyAppointmentsInstructor } from '../app/slices/bookingSlice';

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [emailLogin, setEmailLogin] = useState('harryhirsch@wowds.com')
  const [passwordLogin, setPasswordLogin] = useState('Secure')

  const loginState = useSelector((store) => store.currentUser)
  const currentUserData = loginState.data
  const myProfileState = useSelector((store) => store.myProfile)

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
      console.log('Login error:', error);
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
    <div className="SignUp-Form-Container">
        <h2>Login to BOOK. LEARN. DRIVE.</h2>
        <p>Please enter your Email and Password</p>
        <div className='Sign-Setup-Login-Form-Div'>
          <form onSubmit={(e) => loginHandler(e)} className='Login-Form'>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Email</label>
              <input type="email" className='Sign-Setup-Login-Form-Input' placeholder="Email" value={emailLogin}  onChange={(e)=>{setEmailLogin(e.target.value)}} />
            </div>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Password</label>
              <input type="password" className='Sign-Setup-Login-Form-Input' placeholder="Password" value={passwordLogin} onChange={(e)=>{setPasswordLogin(e.target.value)}} />
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
