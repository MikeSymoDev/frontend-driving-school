import React from 'react';
import './driverDetail.scss';
import HeroDriverDetail from '../components/heroDriverDetail/heroDriverDetail';
import DriverDetailComponent from '../components/driverDetailComponent/driverDetailComponent';
import CallToAction from '../components/callToAction/callToAction';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function DriverDetail() {
  const user = useSelector((store) => store.currentUser);

const backToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    backToTop();
  }, []);

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
