import React from 'react';
import './Sidebar.css';
import assets from '../../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/add" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <img src={assets.add_icon} alt="Add Icon" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/list" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <img src={assets.order_icon} alt="List Icon" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <img src={assets.order_icon} alt="Orders Icon" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
