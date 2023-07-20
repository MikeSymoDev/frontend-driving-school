import React, { useEffect, useState } from 'react'
import './myProfile.scss'
import { useDispatch, useSelector } from 'react-redux'
import { editMyProfile, fetchMyProfile } from '../app/slices/myProfileSlice'
import { fetchDrivingSchools } from '../app/slices/drivingSchoolSlice'
import ProfileForm from '../components/myProfile/profileForm/profileForm'
import { BookingsCreationForm } from '../components/myProfile/bookings/bookingsCreationForm'
import { BookingsTable } from '../components/myProfile/bookings/bookingsTable'
import { BookingsNotAvailableForm } from '../components/myProfile/bookings/bookingsNotAvailableForm'

export default function MyProfile() {

  const dispatch = useDispatch()
  const myProfileState = useSelector((store) => store.myProfile)
  const myProfile = myProfileState.data


  const [profileActivated, setProfileActivated] = useState(true)
  const [bookingsActivated, setBookingsActivated] = useState(false)
  const [vehiclesActivated, setVehiclesActivated] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false);


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


    const editData = {
    gender: gender,
    address: address,
    postal_code: postalCode,
    location_city: locationCity,
    country: country,
    about: about,
    instructor_license: instructorLicense,
    has_learner_permit: hasLearnerPermit,
    phone: phone,
    driving_school: drivingSchool
  }

  const editProfileHandler = async (e) => {
    e.preventDefault();
    setIsEditMode(true); // Disable edit mode after form submission
    // ... handle form submission
  };

  const saveProfileHandler = async (e) => {
    e.preventDefault();
    setIsEditMode(false);
    dispatch(editMyProfile(editData))
  };

  const cancelHandler = () => {
    setIsEditMode(false);
    // ... handle cancel action
  };


  return (
    <>
      <div className="cta">
        <div className='MyProfile-Container'>
          {myProfileState.ready &&
            <>
              <h2>MY PROFILE</h2>
              <div className='Profile-Image'>
                <img src={myProfile.profile_image} alt="Image description" />
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
              {myProfileState.ready && profileActivated &&
                <>
                  <ProfileForm
                    isEditMode={isEditMode}
                    myProfile={myProfile}
                    drivingSchools={drivingSchools}
                    created={created}
                    updated={updated}
                    username={username}
                    firstname={firstname}
                    lastname={lastname}
                    gender={gender}
                    address={address}
                    postalCode={postalCode}
                    locationCity={locationCity}
                    country={country}
                    about={about}
                    instructorLicense={instructorLicense}
                    hasLearnerPermit={hasLearnerPermit}
                    phone={phone}
                    drivingSchool={drivingSchool}
                    setUsername={setUserName}
                    setFirstname={setFirstName}
                    setLastname={setLastName}
                    setGender={setGender}
                    setAddress={setAddress}
                    setPostalCode={setPostalCode}
                    setLocationCity={setLocationCity}
                    setCountry={setCountry}
                    setAbout={setAbout}
                    setInstructorLicense={setInstructorLicense}
                    setHasLearnerPermit={setHasLearnerPermit}
                    setPhone={setPhone}
                    setDrivingSchool={setDrivingSchool}
                    saveProfileHandler={saveProfileHandler}
                    editProfileHandler={editProfileHandler}
                    cancelHandler = {cancelHandler}
                  />
                </>
              }
                {bookingsActivated && (
                <>
                    {myProfile.type === "I" && (
                    <div className='Bookings-Creation-Not-Available'>
                      
                        <BookingsCreationForm></BookingsCreationForm>
                        <BookingsNotAvailableForm></BookingsNotAvailableForm>
                    </div>

                    )}
                    <BookingsTable></BookingsTable>
                </>
                )}
            </>
          }
        </div>
      </div>
    </>
  );
}