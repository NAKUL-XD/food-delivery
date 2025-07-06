import React from 'react';
import assets from '../../assets/assets.js';
import './TopBar.css';

const TopBar = () => {
  return (
    <div className="navbar shadow">
      <div className="logo-container">
        <img className="logo" src={assets.logo} alt="Logo" />
      </div>
      <div className="profile-container">
        <img className="profile" src={assets.profile_image} alt="Profile" />
      </div>
    </div>
  );
};

export default TopBar;
