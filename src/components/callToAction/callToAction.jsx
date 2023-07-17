import React from 'react';
import { NavLink } from 'react-router-dom';
import './callToAction.scss';

export default function CallToAction() {
  return (
    // RENDER THIS COMPONENT CONDITIONALLY, SHOW ONLY WHEN THE USER IS NOT LOGGED IN

    <>
      <div className="cta">
        <div className="textalign">
          <h2>READY TO START</h2>
          <p>
            Here is the Beginning of your driving adventure. It will be so
            awesome, that you actually have to think about, if you should start
            right now. Please click this button and sign up. We really need the
            money.
          </p>
          <button>
            <NavLink to="signup">START NOW</NavLink>{' '}
          </button>
        </div>
      </div>
    </>
  );
}
