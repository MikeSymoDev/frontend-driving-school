import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { signUpUser } from '../app/slices/currentUserSlice';

export default function SignUpForm() {
  const dispatcher = useDispatch()
  const location = useLocation();
  const signUpState = useSelector((store) => store.currentUser)


  
  const { userType } = location.state;
  console.log(userType)

  let signUpMessage;
  if (userType === 'Student') {
    signUpMessage = 'Sign Up as a Student';
  } else if (userType === 'Instructor') {
    signUpMessage = 'Sign Up as an Instructor';
  }

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [password, setPassword] = useState();
  const [passwordrepeat, setPasswordrepeat] = useState();

  const signUpData = {
    email:email,
    username: username,
    first_name: firstname,
    last_name: lastname,  
    password: password,
    password_repeat: passwordrepeat

  }
  
  const signUpHandler = async (e) => {
    e.preventDefault();
    console.log (signUpData)
    dispatcher(signUpUser( signUpData) )
    
    // dispatcher(validateUser( validateData ))     
    // navigate("/") 
}  

  return (
    <>
        <div className="cta">
        <div className="textalign">
        {signUpState.signedUp ? (<h2>YOU ARE SIGNED UP</h2>
        ):(
           <>
            <h2>{signUpMessage}</h2>
            <p>
              Please fill out the form
            </p>
            <div>
                <form onSubmit = {(e) => signUpHandler(e)} className='SignUp-Form'>
                  <label>Email:</label>
                  <input type="text" className='Signup-Form-Email' placeholder="Email"  onChange={(e)=>{setEmail(e.target.value)}} />
                  <label>Username:</label>
                  <input type="text" className='Signup-Form-Username' placeholder="Username"  onChange={(e)=>{setUserName(e.target.value)}} />
                  <label>First Name:</label>
                  <input type="text" className='Signup-Form-FirstName' placeholder="FirstName"  onChange={(e)=>{setFirstName(e.target.value)}} />
                  <label>Last Name:</label>
                  <input type="text" className='Signup-Form-LastName' placeholder="LastName"  onChange={(e)=>{setLastName(e.target.value)}} />
                  <label>Password:</label>
                  <input type="password" className='Signup-Form-Password' placeholder="Password"  onChange={(e)=>{setPassword(e.target.value)}} />
                  <label>Password Repeat:</label>
                  <input type="password" className='Signup-Form-Password-Repeat' placeholder="Password Repeat"  onChange={(e)=>{setPasswordrepeat(e.target.value)}} />
                  <input type="submit" value="Sign Up" />
                </form>
            </div>
           </>
        )}
         
        </div>
      </div>
    </>
  )
}
