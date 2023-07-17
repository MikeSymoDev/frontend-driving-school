import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setUpUser, signUpUser } from '../app/slices/currentUserSlice';
import { fetchDrivingSchools } from '../app/slices/drivingSchoolSlice';

export default function SignUpForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const signUpState = useSelector((store) => store.currentUser)
  
  useEffect(() => {
    dispatch(fetchDrivingSchools());
  }, [dispatch, fetchDrivingSchools]);


  
  const { userType } = location.state;
  console.log(userType)

  let signUpMessage;
  let userTypeLong;
  if (userType === 'S') {
    signUpMessage = 'Sign Up as a Student';
    userTypeLong = "Student"
  } else if (userType === 'I') {
    signUpMessage = 'Sign Up as an Instructor';
    userTypeLong = "Instructor"
  }

  // Fetch the DrivingSchools
  const drivingSchoolState = useSelector((store) => store.drivingSchools)
  const drivingSchools = drivingSchoolState.data

  
  if (userType === 'I') {

  }

  console.log(drivingSchools)


  // THIS PART IS FOR SIGNUP THE PROFILE
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [password, setPassword] = useState("");
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
    dispatch(signUpUser( signUpData) )
}


  // THIS PART IS FOR SETUP THE PROFILE
  const GENDER_OPTIONS = [
    { value: 'M', label: 'Male' },
    { value: 'F', label: 'Female' },
    { value: 'N', label: 'Non-Binary' }
  ];

  const COUNTRY_OPTIONS = [
    { value: 'CH', label: 'Switzerland' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'IT', label: 'Italy' }
  ];



  const [gender, setGender] = useState('M');
  const [address, setAddress] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [locationCity, setLocationCity] = useState('')
  const [country, setCountry] = useState('CH')
  const [about, setAbout] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [instructorLicense, setInstructorLicense] = useState('')
  const [hasLearnerPermit, setHasLearnerPermit] = useState(false)
  const [phone, setPhone] = useState('')
  const [drivingSchool, setDrivingSchool] = useState(null)



  
  const setupData = {
    email: email,
    gender: gender,
    type: userType,
    address: address,
    postal_code: postalCode,
    location_city: locationCity,
    country: country,
    about: about,
    profile_image: profileImage,
    instructor_license: instructorLicense,
    has_learner_permit: hasLearnerPermit,
    phone: phone,
    driving_school: drivingSchool
  }

  console.log(gender)
  console.log(userType)
  console.log(hasLearnerPermit)
  console.log(drivingSchool)
  const setupHandler = async (e) => {
    e.preventDefault();
    console.log(setupData)
    dispatch(setUpUser(setupData))
    navigate('/login')

  }

  return (
    <>
        <div className="cta">
        <div className="textalign">
        {!signUpState.signedUp ? (
          <>
             <h2>{signUpMessage}</h2>
            <p>
              Please fill out the form
            </p>
            <div>
                <form onSubmit = {(e) => signUpHandler(e)} className='SignUp-Form'>
                  <label>Email:</label>
                  <input type="email" className='Signup-Form-Email' placeholder="Email"  onChange={(e)=>{setEmail(e.target.value)}} />
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
        ):(
           <>
            <h2>Setup your {userTypeLong} profile</h2>
            <p>
              Please fill out the form
            </p>
           <div>
              <form onSubmit = {(e) => setupHandler(e)} className='SetUp-Form'>
                  <label>Gender:</label>
                  <select required className='Setup-Form-Gender' onChange={(e)=>{setGender(e.target.value)}}>
                    {GENDER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                 </select>
                 <label>Address</label>
                 <input type="text" required className='Setup-Form-Address' placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                 <label>Postal Code</label>
                 <input type="text" required className='Setup-Form-PostalCode' placeholder='Postal Code' value={postalCode} pattern="[0-9]{4,5}" onChange={(e)=>{setPostalCode(e.target.value)}}></input>
                 <label>Location</label>
                 <input type="text" required className='Setup-Form-Location' placeholder="Location" value={locationCity} onChange={(e)=>{setLocationCity(e.target.value)}} />
                 <label>Country:</label>
                 <select required className='Setup-Form-Country' onChange={(e)=>{setCountry(e.target.value)}}>
                    {COUNTRY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                 </select>
                 <label>About you</label>
                 <textarea rows="4" cols="50" placeholder="Tell us about you" onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                 <label>Profile Picture</label>
                 <input type="file" id="profileImage" name="profileImage" acceptLanguage="en" accept="image/*" onChange={(e)=>{setProfileImage(e.target.value)}}/>
                 {userType == "I" && <label>Instructor License</label>}
                 {userType == "I" && <input type="text" required className='Setup-Form-License' placeholder="Instructor License"  onChange={(e)=>{setInstructorLicense(e.target.value)}} />}
                 {userType == "S" && <label>Learner Permit</label>}
                 {userType == "S" && <input type="checkbox" required checked={hasLearnerPermit} onChange={(e)=>{setHasLearnerPermit(e.target.checked)}}></input>}
                 <label>Phone</label>
                 <input type="tel" required className='Setup-Form-Phone' placeholder="Phone"  onChange={(e)=>{setPhone(e.target.value)}} />
                 {userType == "I" && <label>Driving School</label>}
                 {userType == "I" && <select onChange={(e)=>{setDrivingSchool(e.target.value)}}>
                  {drivingSchools.map((option) => (
                      <option key={option.id} value={option.id}>
                     {option.companyName}
                       </option>
                  ))}
                 </select>}
                 <input type="submit" value="Setup Profile" />
              </form>
           </div>
           </>
        )}
         
        </div>
      </div>
    </>
  )
}
