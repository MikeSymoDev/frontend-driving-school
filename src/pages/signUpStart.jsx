import React from 'react'
import './signUpStart.scss'
import { NavLink, useNavigate } from 'react-router-dom'

export default function SignUpStart() {

  const navigate = useNavigate()

  const handleUserType = (userType) => {
    navigate('/signupform', { state: { userType } });
  }
  return (
    <>
    <div className="heroimagedetail">
        <h2 className="herocontentdetail">SIGN UP</h2>
      </div>
        <div className="SignUp-Start-Container"> 
          <h2>What type are you?</h2>
          <p>
            It depends for what reasons you are here: <br></br>
            Do you want to learn or teach?
          </p>
          <div className='Choose-Type'>
            <button onClick={() => handleUserType('S')}>STUDENT</button>
            <button onClick={() => handleUserType('I')}>INSTRUCTOR</button>
          </div>
      </div>
    </>
  )
}
