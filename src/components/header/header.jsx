import React from 'react';
import LogoWhite from '../../assets/logos/logo_dh_whitenew.png';
import { NavLink } from 'react-router-dom';
import './header.scss';

export default function Header() {
  return (
    <>
      <div className="header">
        <div className="leftheader">
          <div className="logo">
            <NavLink to="/">
              <img
                src={LogoWhite}
                alt="Drive Hub Logo"
                style={{ width: '7rem', height: 'auto' }}
              />
            </NavLink>
          </div>
        </div>
        <div className="rightheader">
          <div className="navigation">
            <NavLink className="navlink" to="/">
              HOME
            </NavLink>
            <NavLink className="navlink" to="/alldrivers">
              DRIVERS
            </NavLink>
            <NavLink className="navlink" to="myprofile">
              MY PROFILE
            </NavLink>
            <NavLink className="navlink" to="login">
              LOGIN
            </NavLink>
            <NavLink className="navlink" to="signup">
              SIGN UP
            </NavLink>
            <button className="logout">LOGOUT</button>
          </div>
        </div>
      </div>
      <div className="headerdivider"></div>
    </>
  );
}

// condtionioal linking to either student or driver provile:

// import { NavLink } from 'react-router-dom';

// // Assuming userType is set to either "student" or "driver" based on backend logic

// const LinkComponent = ({ userType }) => {
//   let linkDestination;

//   if (userType === 'student') {
//     linkDestination = '/students';
//   } else if (userType === 'driver') {
//     linkDestination = '/drivers';
//   } else {
//     linkDestination = '/';
//   }

//   return (
//     <NavLink className="navlink" to={linkDestination}>
//       MY PROFILE
//     </NavLink>
//   );
// };
