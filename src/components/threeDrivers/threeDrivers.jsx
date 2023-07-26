import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../axios';
import { NavLink } from 'react-router-dom';
import './threeDrivers.scss';

export default function ThreeDrivers() {
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    const response = await axiosInstance.get('/user/instructors/');
    setDrivers(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  const getRandomDrivers = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomDrivers = getRandomDrivers(drivers, 3);

  return (
    <>
      <div className="threedrivers">
        <div className="drivertitle">
          <h2>SOME OF OUR DRIVERS</h2>
          <p>
            Ready to get some driving skills? We got you covered. On Drive Hub, 
            only the best and most reliable driving instructors offer their services.
            Find the driving instructor that fits your agenda right here on Drive Hub.
          </p>
        </div>

        <div className="drivers">
          {randomDrivers.slice(0, 3).map((driver) => (
            <div className="driverdetails" key={driver.id}>
              <NavLink to={`driverDetail/${driver.id}`}>
                <img
                  src={driver.profile_image}
                  alt="drivers"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                  }}
                />
              </NavLink>

              <h3>
                {driver.user.first_name} {driver.user.last_name}
              </h3>
              <p>{driver.about}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
