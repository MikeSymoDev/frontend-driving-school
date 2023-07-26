import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import './driverDetailComponent.scss';
import { useNavigate } from 'react-router-dom'

export default function DriverDetail() {
  const [driver, setDriver] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate()

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

    const navigateToAppointments = () => {
    
    navigate(`/driverdetail/${id}/appointments/`);
    
  }

  return (

    <>
     <div className='driverinfo'>

                <img src={driver.profile_image} alt="Profile" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />

            
            <div className='drivertext'>
              
              <p>About: {driver.about}</p>
              <p>Gender: {driver.gender}</p>
              <p>E-Mail: <a href={`mailto:${driver.email}`}>{driver.email}</a></p>
               <p>Phone: {driver.phone}</p>
               <p>Based in: {driver.location_city}</p>
            
             <button className='bookbutton' onClick={navigateToAppointments}>BOOK ME</button>
             </div>

      

      </div>

{/* _________________________________________________________________ */}

     <div className='drivingschool'>
  {driver.vehicles.map((vehicle) => (
    <div key={vehicle.id} className="driver-card">
      <div className='drivingschooltext'>
        <h3>{driver.driving_school.companyName}</h3>
        <p>Make: {vehicle.make}</p>
        <p>Model: {vehicle.model}</p>
        <p>Year: {vehicle.year}</p>
        <p>Transmission: {vehicle.transmission}</p>
        <br />
        <p>Adress:</p>
        <p>{driver.driving_school.address}</p>
        <p>{driver.driving_school.postal_code} {driver.driving_school.location_city}  </p>
        <p>{driver.driving_school.country}</p>
      </div>
      
      <div className='carimage'>
        {vehicle.vehicle_image.map((car) => (
          <img key={car.id} src={car.image} alt="Vehicle" style={{ width: '19rem', height: '19rem', borderRadius: '50%', }} />
        ))}
      </div>
    </div>
  ))}
</div>


    
    
    </>

   
  );
}
