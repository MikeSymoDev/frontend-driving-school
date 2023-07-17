import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const dispatcher = useDispatch()
  const navigate = useNavigate

  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState();

  const loginDate = {
    email: emailLogin,
    password: passwordLogin
  }
  return (
    <>
    <div className="cta">
      <div className="textalign">
        <h2>Login to BOOK. LEARN. DRIVE.</h2>
        <p>Please enter your Email and Password</p>
        <div className='Sign-Setup-Login-Form-Div'>
          <form className='Login-Form'>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Email</label>
              <input type="email" className='Sign-Setup-Login-Form-Input' placeholder="Email"  onChange={(e)=>{setEmailLogin(e.target.value)}} />
            </div>
            <div className='Sign-Setup-Login-Form-Element'>
              <label>Password</label>
              <input type="password" className='Sign-Setup-Login-Form-Input' placeholder="Password"  onChange={(e)=>{setPasswordLogin(e.target.value)}} />
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
