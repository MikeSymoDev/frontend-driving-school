import React from 'react';
import LogoWhite from '../../assets/logos/logo_dh_whitenew.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { DELETE_USER } from '../../app/slices/currentUserSlice';
import './header.scss';
import { DELETE_MYPROFILE } from '../../app/slices/myProfileSlice';

export default function Header() {

const user = useSelector((store) => store.currentUser);
const myProfileState = useSelector((store) => store.myProfile)
const navigate = useNavigate();
const dispatch = useDispatch();


   const handleLogout = () => {
    dispatch(DELETE_USER());
    dispatch(DELETE_MYPROFILE())
    localStorage.clear();
    navigate('/login');
   }



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
            {user.token && <button className='logout' onClick={handleLogout}>LOGOUT</button>}
  
          </div>
        </div>
      </div>
      <div className="headerdivider"></div>
    </>
  );
}


