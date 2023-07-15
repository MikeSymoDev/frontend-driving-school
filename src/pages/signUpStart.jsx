import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export default function SignUpStart() {

  const navigate = useNavigate()

  const handleUserType = (userType) => {
    navigate('/signupform', { state: { userType } });
  }
  return (
    <>
        <div className="cta">
        <div className="textalign">
          <h2>What Type are you?</h2>
          <p>
            It depends for what reasons you are here: <br></br>
            Would you like to learn or would you like to teach?
          </p>
          <button onClick={() => handleUserType('Student')}>STUDENT</button>
          <button onClick={() => handleUserType('Instructor')}>INSTRUCTOR</button>
        </div>
      </div>
    </>
  )
}
