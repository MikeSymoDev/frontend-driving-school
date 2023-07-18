import React, { useEffect, useState } from 'react'
import './myProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyProfile } from '../app/slices/myProfileSlice'
import { fetchDrivingSchools } from '../app/slices/drivingSchoolSlice'

export default function MyProfile() {

  const dispatch = useDispatch()
  const myProfileState = useSelector((store) => store.myProfile)
  const myProfile = myProfileState.data


  const [profileActivated, setProfileActivated] = useState(true)
  const [bookingsActivated, setBookingsActivated] = useState(false)
  const [vehiclesActivated, setVehiclesActivated] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);

//   useEffect(() => {
//     dispatch(fetchMyProfile())
//   }, [dispatch])

//   useEffect(() => {
//     dispatch(fetchDrivingSchools());
//   }, [dispatch, fetchDrivingSchools]);

    // Fetch the DrivingSchools
    const drivingSchoolState = useSelector((store) => store.drivingSchools)
    const drivingSchools = drivingSchoolState.data

  console.log(myProfile)

  const [username, setUserName] = useState(myProfile?.user?.username || '');
  const [firstname, setFirstName] = useState(myProfile?.user?.first_name || '');
  const [lastname, setLastName] = useState(myProfile?.user?.last_name || '');
  const [gender, setGender] = useState(myProfile?.gender || '');
  const [address, setAddress] = useState(myProfile?.address || '');
  const [postalCode, setPostalCode] = useState(myProfile?.postal_code || '');
  const [locationCity, setLocationCity] = useState(myProfile?.location_city || '');
  const [country, setCountry] = useState(myProfile?.country || '');
  const [about, setAbout] = useState(myProfile?.about || '');
  const [profileImage, setProfileImage] = useState(myProfile?.profile_image || '');
  const [instructorLicense, setInstructorLicense] = useState(myProfile?.instructor_license || '');
  const [hasLearnerPermit, setHasLearnerPermit] = useState(myProfile?.has_learner_permit || false);
  const [phone, setPhone] = useState(myProfile?.phone || '');
  const [drivingSchool, setDrivingSchool] = useState(myProfile?.driving_school?.id || '');
  const [vehicles, SetVehicles] = useState(myProfile?.vehicles || '');
  const [created, SetCreated] = useState(myProfile?.created || '');
  const [updated, SetUpdated] = useState(myProfile?.updated || '');

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

  const editProfileHandler = async (e) => {
    e.preventDefault();
    setIsEditMode(true); // Disable edit mode after form submission
    // ... handle form submission
  };

  const saveProfileHandler = async (e) => {
    e.preventDefault();
    setIsEditMode(false);
    console.log(isEditMode) // Disable edit mode after form submission
    // ... handle form submission
  };

  return (
    <>
    <div className="cta">
      <div className='MyProfile-Container'>
        {myProfileState.ready && 
        <>
          <h2>MY PROFILE</h2>
          <div className='Profile-Image'>
                <img  src={myProfile.profile_image}alt="Image description" />
            </div>
          <div className='MyProfile-Header'>
            <h3>{myProfile.user && `${myProfile.email}`}</h3>
            <div className='Profile-Or-Bookings'>
              <h4 className={profileActivated ? 'activated' : ''} onClick={() => {
                setProfileActivated(true);
                setBookingsActivated(false);
                setVehiclesActivated(false);
              }}>Profile</h4>
              <h4 className={bookingsActivated ? 'activated' : ''} onClick={() => {
                setProfileActivated(false);
                setBookingsActivated(true);
                setVehiclesActivated(false);
              }}>Bookings</h4>
              {myProfile.type === "I" && (
                <h4 className={vehiclesActivated ? 'activated' : ''} onClick={() => {
                  setProfileActivated(false);
                  setBookingsActivated(false);
                  setVehiclesActivated(true);
                }}>Vehicles</h4>
              )}
            </div>
          </div>
          {myProfileState.ready &&
          <>
            
            <div className='MyProfile-Profile'>
                <h6>Created: {created}</h6>
                <h6>Updated: {updated}</h6>
                <div className='Edit-Profile-Div'>

                <form onSubmit={isEditMode ? saveProfileHandler : editProfileHandler} className='Edit-Profile-Form'>
                    <div className='My-Profile-Input-Container'>
                    <div className='MyProfile-Profile-Left' >
                        <div className='Edit-Profile-Form-Element'>
                            <label>Username:</label>
                            <input type="text" className='Edit-Profile-Form-Input' placeholder="Username" required value={username} onChange={(e)=>{setUserName(e.target.value)}} disabled={!isEditMode} />
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>First Name:</label>
                            <input type="text" className='Edit-Profile-Form-Input' placeholder="First Name" required value={firstname} onChange={(e)=>{setFirstName(e.target.value)}} disabled={!isEditMode} />
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Last Name:</label>
                            <input type="text" className='Edit-Profile-Form-Input' placeholder="Last Name" required value={lastname} onChange={(e)=>{setLastName(e.target.value)}} disabled={!isEditMode} />
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Gender:</label>
                                <select required className='Edit-Profile-Form-DropDown' value={gender} onChange={(e)=>{setGender(e.target.value)}} disabled={!isEditMode}>
                                    <option value="">Please choose</option> {/* Default option */}
                                    {GENDER_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                        {option.label}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Phone</label>
                            <input type="tel" required className='Edit-Profile-Form-Input' placeholder="Phone" value={phone}  onChange={(e)=>{setPhone(e.target.value)}} disabled={!isEditMode}/>
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>About you</label>
                            <textarea className='Edit-Profile-Form-TextArea' rows="4" cols="50" placeholder="Tell us about you" value={about} onChange={(e)=>{setAbout(e.target.value)}} disabled={!isEditMode}></textarea>
                        </div>
                    </div>
                    <div className='MyProfile-Profile-Right'>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Address</label>
                            <input type="text" required className='Edit-Profile-Form-Input' placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} disabled={!isEditMode} />
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Postal Code</label>
                            <input type="text" required className='Edit-Profile-Form-Input' placeholder='Postal Code' value={postalCode} pattern="[0-9]{4,5}" onChange={(e)=>{setPostalCode(e.target.value)}} disabled={!isEditMode}></input>
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                            <label>Location</label>
                            <input type="text" required className='Edit-Profile-Form-Input' placeholder="Location" value={locationCity} onChange={(e)=>{setLocationCity(e.target.value)}} disabled={!isEditMode} />
                        </div>
                        <div className='Edit-Profile-Form-Element'>
                        <label>Country:</label>
                        <select required className='Edit-Profile-Form-DropDown' value={country} onChange={(e)=>{setCountry(e.target.value)}} disabled={!isEditMode}>
                            <option value="">Please choose</option> {/* Default option */}
                            {COUNTRY_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))}
                        </select>
                        </div >

                        {myProfile.type == "I" && 
                        <div className='Edit-Profile-Form-Element'>
                            <label>Instructor License</label>
                            <input type="text" required className='Edit-Profile-Form-Input' placeholder="Instructor License" value={instructorLicense} onChange={(e)=>{setInstructorLicense(e.target.value)}} disabled={!isEditMode}/>
                        </div>}
                        {myProfile.type == "S" && 
                        <div className='Edit-Profile-Form-Element'>
                            <label>Learner Permit</label>
                            <input type="checkbox" required checked={hasLearnerPermit} value={hasLearnerPermit} onChange={(e)=>{setHasLearnerPermit(e.target.checked)}} disabled={!isEditMode}></input>
                        </div>}

                        
                        {myProfile.type == "I" && 
                        <div className='Edit-Profile-Form-Element'>
                            <label>Driving School</label>
                            <select className='Edit-Profile-Form-DropDown' value={drivingSchool} onChange={(e)=>{setDrivingSchool(e.target.value)}}disabled={!isEditMode}>
                            <option value="">Please choose</option> {/* Default option */}
                            {drivingSchools.map((option) => (
                                <option key={option.id} value={option.id}>
                                {option.companyName}
                                </option>
                            ))}
                            </select>
                        </div>}
                        {/* <div className='Edit-Profile-Form-Element'>
                            <label>Profile Picture</label>
                            <input type="file" id="profileImage" name="profileImage" acceptLanguage="en" accept="image/*" onChange={(e)=>{setProfileImage(e.target.files[0])}}/>
                        </div> */}
                    </div>
                    </div>

                  <div>
                  {isEditMode ? (
                    <>
                        <input className="submit" type="submit" value="SAVE PROFILE" />
                        <button className="cancel-edit-button" onClick={() => setIsEditMode(false)}>Cancel</button>
                    </>
                    ) : (
                        <>
                            <input className="submit" type="submit" value="EDIT PROFILE" />
                        </>
    )}
                  </div>
                  
                </form>
            </div>
            </div>
          </>
          }
        </>
        }
      </div>
    </div>
  </>
  )
}
