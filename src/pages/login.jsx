import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../app/slices/currentUserSlice';

export default function Login() {

  const dispatcher = useDispatch()
  const navigate = useNavigate

  const [emailLogin, setEmailLogin] = useState('harryhirsch@wowds.com')
  const [passwordLogin, setPasswordLogin] = useState('Secure')
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState();

  const loginData = {
    email: emailLogin,
    password: passwordLogin
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatcher(loginUser(loginData))
  }
  return (
    <>
    <div className="cta">
      <div className="textalign">
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
    </div>
  </>
  )
}
