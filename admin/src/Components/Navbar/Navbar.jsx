import React from 'react';
import './Navbar.css';
import nav_logo from '../../assets/VlogoSmall.png';
import nav_logo_admin from '../../assets/adminPfp.png';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={nav_logo} alt='Logo' className='nav-logo' />
        <div className='navbar-text'>
          <p className='navbar-title'>Velour</p>
          <p className='navbar-subtitle'>admin panel</p>
        </div>
      </div>
      <img src={nav_logo_admin} alt='Admin Profile' className='nav-logo-profile' />
    </div>
  );
};

export default Navbar;
