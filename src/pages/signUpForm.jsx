import React, { useEffect, useState } from 'react'
import './signUpForm.scss'
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
  // console.log(userType)

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

  // console.log(drivingSchools)


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
    // console.log (signUpData)
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
    // profile_image: profileImage,
    instructor_license: instructorLicense,
    has_learner_permit: hasLearnerPermit,
    phone: phone,
    driving_school: drivingSchool
  }

  // console.log(gender)
  // console.log(userType)
  // console.log(hasLearnerPermit)
  // console.log(drivingSchool)
  const setupHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    const hasLearnerPermitStr = String(hasLearnerPermit).charAt(0).toUpperCase() + String(hasLearnerPermit).slice(1);

    // Append all your form data to this instance
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('type', userType);
    formData.append('address', address);
    formData.append('postal_code', postalCode);
    formData.append('location_city', locationCity);
    formData.append('country', country);
    formData.append('about', about);
    formData.append('profile_image', profileImage); // assuming this is a File object
    formData.append('instructor_license', instructorLicense);
    formData.append('has_learner_permit', hasLearnerPermitStr);
    formData.append('phone', phone);
    formData.append('driving_school', drivingSchool);

    console.log('Sending form data:', [...formData]);
    dispatch(setUpUser(formData));
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
            <div className='Sign-Setup-Login-Form-Div'>
                <form onSubmit = {(e) => signUpHandler(e)} className='Sign-Setup-Login-Form'>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Email:</label>
                    <input type="email" className='Sign-Setup-Login-Form-Input' placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e)=>{setEmail(e.target.value)}} />
                  </div>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Username:</label>
                    <input type="text" className='Sign-Setup-Login-Form-Input' placeholder="Username" required onChange={(e)=>{setUserName(e.target.value)}} />
                  </div>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>First Name:</label>
                    <input type="text" className='Sign-Setup-Login-Form-Input' placeholder="First Name" required onChange={(e)=>{setFirstName(e.target.value)}} />
                  </div>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Last Name:</label>
                    <input type="text" className='Sign-Setup-Login-Form-Input' placeholder="Last Name" required onChange={(e)=>{setLastName(e.target.value)}} />
                  </div>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Password:</label>
                    <input type="password" className='Sign-Setup-Login-Form-Input' placeholder="Password" required onChange={(e)=>{setPassword(e.target.value)}} />
                  </div>
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Password Repeat:</label>
                    <input type="password" className='Sign-Setup-Login-Form-Input' placeholder="Password Repeat" required onChange={(e)=>{setPasswordrepeat(e.target.value)}} />
                  </div>
                  <div>
                    <input className= "submit" type="submit" value="SIGN UP" />
                  </div>
                  
                </form>
            </div>
          </>
        ):(
           <>
            <h2>Setup your {userTypeLong} profile</h2>
            <p>
              Please fill out the form
            </p>
           <div className='Sign-Setup-Login-Form-Div'>
              <form onSubmit = {(e) => setupHandler(e)} className='SetUp-Form'>
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>Gender:</label>
                    <select required className='Sign-Setup-Login-Form-DropDown' onChange={(e)=>{setGender(e.target.value)}}>
                      <option value="">Please choose</option> {/* Default option */}
                      {GENDER_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>Address</label>
                  <input type="text" required className='Sign-Setup-Login-Form-Input' placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} />
                </div>
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>Postal Code</label>
                  <input type="text" required className='Sign-Setup-Login-Form-Input' placeholder='Postal Code' value={postalCode} pattern="[0-9]{4,5}" onChange={(e)=>{setPostalCode(e.target.value)}}></input>
                </div>
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>Location</label>
                  <input type="text" required className='Sign-Setup-Login-Form-Input' placeholder="Location" value={locationCity} onChange={(e)=>{setLocationCity(e.target.value)}} />
                </div>
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>Country:</label>
                  <select required className='Sign-Setup-Login-Form-DropDown' onChange={(e)=>{setCountry(e.target.value)}}>
                      <option value="">Please choose</option> {/* Default option */}
                      {COUNTRY_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                </div >
                <div className='Sign-Setup-Login-Form-Element'>
                  <label>About you</label>
                  <textarea className='Sign-Setup-Login-Form-TextArea' rows="4" cols="50" placeholder="Tell us about you" onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                </div>
                {userType == "I" && 
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Instructor License</label>
                    <input type="text" required className='Sign-Setup-Login-Form-Input' placeholder="Instructor License"  onChange={(e)=>{setInstructorLicense(e.target.value)}} />
                  </div>}
                {userType == "S" && 
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Learner Permit</label>
                    <input type="checkbox" required checked={hasLearnerPermit} onChange={(e)=>{setHasLearnerPermit(e.target.checked)}}></input>
                  </div>}
                 <div className='Sign-Setup-Login-Form-Element'>
                  <label>Phone</label>
                  <input type="tel" required className='Sign-Setup-Login-Form-Input' placeholder="Phone"  onChange={(e)=>{setPhone(e.target.value)}} />
                 </div>
                 
                 {userType == "I" && 
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Driving School</label>
                    <select className='Sign-Setup-Login-Form-DropDown' onChange={(e)=>{setDrivingSchool(e.target.value)}}>
                      <option value="">Please choose</option> {/* Default option */}
                      {drivingSchools.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.companyName}
                        </option>
                      ))}
                    </select>
                  </div>}
                  <div className='Sign-Setup-Login-Form-Element'>
                    <label>Profile Picture</label>
                    <input type="file" id="profileImage" name="profileImage" acceptLanguage="en" accept="image/*" onChange={(e)=>{setProfileImage(e.target.files[0])}}/>
                  </div>
                 

                  <div>
                    <input className= "submit" type="submit" value="SETUP PROFILE" />
                  </div>
              </form>
           </div>
           </>
        )}
         
        </div>
      </div>
    </>
  )
}
