import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../axios';
import './threeDrivers.scss';

export default function ThreeDrivers() {
  const [drivers, setDrivers] = useState([]);

  const getDrivers = async () => {
    const response = await axiosInstance.get('/user/instructors/');
    setDrivers(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <>
      {drivers.map((driver) => (
        <div key={driver.id}>
          <p>Email: {driver.email}</p>
          <p>Name: {driver.user.username}</p>
          <img
            src={driver.profile_image}
            alt="Face"
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
      ))}
    </>
  );
}
