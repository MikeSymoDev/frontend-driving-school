import React from 'react';
import './driverDetail.scss';
import HeroDriverDetail from '../components/heroDriverDetail/heroDriverDetail';
import DriverDetailComponent from '../components/driverDetailComponent/driverDetailComponent';
import CallToAction from '../components/callToAction/callToAction';
import { useSelector } from 'react-redux';

export default function DriverDetail() {
  const user = useSelector((store) => store.currentUser);
  return (
    <>
    
    <div className='herodetail'>
   <HeroDriverDetail />

    </div>
 
    <div className='driverdetailcomp'>
    <DriverDetailComponent />

    </div>
      {!user.token && <CallToAction /> }

    
    </>
  )
}
