import React from 'react';
import { NavLink } from 'react-router-dom';
import './callToAction.scss';

export default function CallToAction() {
  return (
    // RENDER THIS COMPONENT CONDITIONALLY, SHOW ONLY WHEN THE USER IS NOT LOGGED IN

    <>
      <div className="cta">
        <div className="textalign">
          <h2>READY TO GO</h2>
          <p>
            Here is the beginning of your driving adventure. 
             Click the button, sign up and take the wheel 
             toward success with Drive Hub!

          </p>
          <button>
            <NavLink to="signup">START NOW</NavLink>{' '}
          </button>
        </div>
      </div>
    </>
  );
}
