import React from 'react';
import './footer.scss';
import { FiFacebook } from 'react-icons/fi';
import { FiInstagram } from 'react-icons/fi';
import { FiTwitter } from 'react-icons/fi';
import { FiLinkedin } from 'react-icons/fi';

export default function Footer() {
  return (
    <>
      <div className="footer">
        <p>Copyright 2023 © Drive Hub Inc.</p>

        <div className="social">
          <FiFacebook className="icon" size={40} />
          <FiInstagram className="icon" size={40} />
          <FiTwitter className="icon" size={40} />
          <FiLinkedin className="icon" size={40} />
        </div>
      </div>
    </>
  );
}
