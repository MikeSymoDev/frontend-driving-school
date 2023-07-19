import React from 'react';
import './profileForm.scss'

const ProfileForm = ({
  isEditMode,
  myProfile,
  drivingSchools,
  username,
  firstname,
  lastname,
  gender,
  address,
  postalCode,
  locationCity,
  country,
  about,
  instructorLicense,
  hasLearnerPermit,
  phone,
  drivingSchool,
  created,
  updated,
  setUserName,
  setFirstName,
  setLastName,
  setGender,
  setAddress,
  setPostalCode,
  setLocationCity,
  setCountry,
  setAbout,
  setInstructorLicense,
  setHasLearnerPermit,
  setPhone,
  setDrivingSchool,
  saveProfileHandler,
  editProfileHandler,
  setIsEditMode,
  cancelHandler,

  

 
}) => {
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

  const createdDate = new Date(created);
  const updatedDate = new Date(updated);
  
  const createdFormatted = createdDate.toLocaleString('de', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const updatedFormatted = updatedDate.toLocaleString('de', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className='MyProfile-Profile'>
    <h6>Created: {createdFormatted}</h6>
    <h6>Updated: {updatedFormatted}</h6>
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
            <div className='Save-Cancel-Div'>
              <input className="save-submit" type="submit" value="SAVE PROFILE" />
              <button className="cancel-edit-button" onClick={cancelHandler}>CANCEL</button>
            </div>
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
  );
};

export default ProfileForm;
