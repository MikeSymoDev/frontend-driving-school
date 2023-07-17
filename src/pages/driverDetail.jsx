import React from 'react';
import './driverDetail.scss';
import HeroDriverDetail from '../components/heroDriverDetail/heroDriverDetail';
import DriverDetailComponent from '../components/driverDetailComponent/driverDetailComponent';

export default function DriverDetail() {
  return (
    <>
    
    <div className='herodetail'>
   <HeroDriverDetail />

    </div>
 
    <div className='driverdetailcomp'>
    <DriverDetailComponent />

    </div>

    
    </>
  )
}
