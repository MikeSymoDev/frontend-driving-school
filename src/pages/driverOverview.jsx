import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllInstructors } from '../app/slices/instructorSlice';
import { Link } from 'react-router-dom';
import CallToAction from '../components/callToAction/callToAction'; // Import the CallToAction component here (if needed)
import './driverOverview.scss';

export default function DriverOverview() {
  const dispatch = useDispatch();
  const instructors = useSelector((state) => state.instructors.instructors);
  const user = useSelector((store) => store.currentUser);
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    // Fetch all instructors
    dispatch(fetchAllInstructors());
  }, [dispatch]);

  // Filter instructors 
  const filteredInstructors = instructors.filter(
    (instructor) => instructor.postal_code.startsWith(zipCode)
  );


  return (
    <>
    <div className="heroimagedetail">
      <h2 className="herocontentdetail">Drivers Page</h2>
      </div>
        <div className="allDriverscontain">
        <div className="zip">
          {/* Zip Code Input */}
          <div className='zipTitle'><p>Enter Zip</p></div>
          <div className="zipInput">
          <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        </div>
          {/* Show drivers */}
          <div className="driverPairContainer">
            {filteredInstructors.length > 0 ? (
             filteredInstructors.map((driver) => (
              <div className="driverPair" key={driver.id}>
                <div className="driverImg">
                  <img src={driver.profile_image} alt="Profile" />
                  </div>
                    <div className="driverInfo">
                      <h3>
                        {driver.user.first_name} {driver.user.last_name}
                      </h3>
                        <p>About: {driver.about}</p>
                        <p>School: {driver.driving_school?.companyName || 'N/A'}</p>
                        <p>Gender: {driver.gender}</p>
                        <p>Email: {driver.email || 'N/A'}</p>
                        <p>Country: {driver.country || 'N/A'}</p>
                        <p>
                          Address: {driver.address}, {driver.postal_code}
                          {driver.location_city}
                        </p>
                    {/* driver profile link */}
                    <Link to={`/driverdetail/${driver.id}`}>View Profile</Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No drivers</p>
            )}
          </div>
        </div>
        {/* Show CallToAction component based on user login status */}
        {!user.token && <CallToAction />}
    </>
  );
}