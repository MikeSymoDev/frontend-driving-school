import React from 'react';
import './home.scss';
import Hero from '../components/hero/hero';
import ThreeDrivers from '../components/threeDrivers/threeDrivers';
import FeaturesList from '../components/featuresList/featuresList';
import CallToAction from '../components/callToAction/callToAction';
import { useSelector } from 'react-redux';


export default function Home() {

  const user = useSelector((store) => store.currentUser);

  return (
    <>
      <div className="hero">
        <Hero />
      </div>

      <div className="threedrivers">
        <ThreeDrivers />
      </div>
      <div className="featurelist">
        <FeaturesList />
      </div>
       {!user.token && <CallToAction /> }
    </>
  );
}
