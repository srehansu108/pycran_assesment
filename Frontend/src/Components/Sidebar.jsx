import React, { useState } from 'react';
import { FaTachometerAlt, FaPlusSquare, FaList, FaCogs, FaLifeRing, FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // State to manage sidebar visibility on mobile/tablet
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile and Tablet */}
      <div className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* Logo and Name */}
        <div className="logo">
          <h2>PyCray_Assessment</h2>
        </div>

        {/* Main Menu */}
        <div className="menu-section">
          <h4 className="menu-heading" style={{marginTop:'40%'}}>MAIN MENU</h4>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <NavLink to="/" activeClassName="active">
                <FaTachometerAlt className="icon"/> 
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/portfolio" activeClassName="active">
                <FaPlusSquare className="icon"/>
                Create Portfolio
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/propertylist" activeClassName="active">
                <FaList className="icon"/>
                Property List
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Other Menu */}
        <div className="menu-section">
          <h4 className="menu-heading">OTHER</h4>
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <NavLink to="/support" activeClassName="active">
                <FaLifeRing className="icon"/>Support
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/setting" activeClassName="active">
                <FaCogs className="icon"/>Settings
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
