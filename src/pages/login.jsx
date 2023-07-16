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
        <div>
          <form className='Login-Form'>
            <label>Email</label>
            <input type="email" className='Login-Form-Email' placeholder="Email"  onChange={(e)=>{setEmailLogin(e.target.value)}} />
            <label>Password</label>
            <input type="password" className='Login-Form-Password' placeholder="Password"  onChange={(e)=>{setPasswordLogin(e.target.value)}} />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  </>
  )
}
