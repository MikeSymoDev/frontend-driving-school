import React from 'react';
import './hero.scss';
import LogoBlue from '../../assets/logos/logo_trans_blue.png';
import { NavLink } from 'react-router-dom';

export default function Hero() {
  return (
    <>
      <div className="heroimage">
        <div className="herocontent">
          <img src={LogoBlue} alt="Drive Hub Logo" />
          <h1>BOOK. LEARN. DRIVE.</h1>
          <button>
            <NavLink to="signup">START NOW</NavLink>{' '}
          </button>
        </div>
      </div>
    </>
  );
}
