import React from 'react';
import nationalimage from '../assets/logo-ind.png';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Indian Government Logo */}
        <img
          className='img-fluid'
          src={nationalimage} // Replace with the actual path
          alt="Indian Government Logo"
          style={{ marginLeft: '10%' }}
        />
        <div className="flex-grow-1"></div>

        {/* Toll-Free Number */}
        <ul style={{ marginTop: '10px' }}>
          <li>
            <p className="desktop" style={{ color: "white" }}>
              <strong>Our Toll Free Number:</strong> <span>1800 115 565</span> <span>(10:00 AM to 05:30 PM)</span>
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
}
