import React from 'react';
import './hero.scss';
import LogoBlue from '../../assets/logos/logo_trans_blue.png';

export default function Hero() {
  return (
    <>
      <div className="heroimage">
        <div className="herocontent">
          <img src={LogoBlue} alt="Drive Hub Logo" />
          <h1>BOOK. LEARN. DRIVE.</h1>
          {/* <h2>
            Discover the ideal driving instructor tailored to your specific
            needs by effortlessly comparing ratings, prices, and an array of
            additional pertinent details.
          </h2> */}
          <button>START NOW</button>
        </div>
      </div>
    </>
  );
}
