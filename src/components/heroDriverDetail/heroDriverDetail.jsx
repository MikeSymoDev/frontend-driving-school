import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import './heroDriverDetail.scss';

export default function HeroDriverDetail() {
  
  
  
 const [driver, setDriver] = useState(null);
  const { id } = useParams();

  const getDriverDetail = async () => {
    try {
      const response = await axiosInstance.get(`/user/instructors/${id}`);
      console.log(response);
      setDriver(response.data);
    } catch (error) {
      console.error('Error fetching driver detail:', error);
    }
  };

  useEffect(() => {
    getDriverDetail();
  }, [id]);

  if (!driver) {
    return <p>Loading driver detail...</p>;
  }


  return (
    <>
      <div className="heroimagedetail">
        <div className="herocontentdetail">
          <h2>  {driver.user.first_name} {driver.user.last_name}</h2>
          <h3>{driver.driving_school.companyName}</h3>
        </div>
      </div>
    </>
  );
}
