import React from 'react';
import './home.scss';
import Hero from '../components/hero/hero';
import ThreeDrivers from '../components/threeDrivers/threeDrivers';

export default function Home() {
  return (
    <>
      <div className="hero">
        <Hero />
      </div>

      <div className="threedrivers">
        <ThreeDrivers />
      </div>
    </>
  );
}
