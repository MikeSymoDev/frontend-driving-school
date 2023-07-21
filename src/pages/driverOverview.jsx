import React from 'react'
import CallToAction from '../components/callToAction/callToAction';
import { useSelector } from 'react-redux';

export default function DriverOverview() {
   const user = useSelector((store) => store.currentUser);

  return (
    <>
       <div>All the Drivers</div>
    {!user.token && <CallToAction /> }
    </>
  
  )
}
