import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash, FaPlus, FaChevronDown } from 'react-icons/fa';
import { IoIosNotificationsOutline } from "react-icons/io";

import './Dashboard.css';

const Dashboard = () => {
  // State for search term and notifications
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [occupancyData, setOccupancyData] = useState([]);
  const [financialData, setFinancialData] = useState([]);
  const [selectedOccupancyRows, setSelectedOccupancyRows] = useState([]);
  const [selectedFinancialRows, setSelectedFinancialRows] = useState([]);
  const [propertyCount, setPropertyCount] = useState('NA');
  const [occupancyRate, setOccupancyRate] = useState('NA');
  const [vacancyRate, setVacancyRate] = useState('NA');
  const [netProfit, setNetProfit] = useState('NA');

  useEffect(() => {
    // Fetch occupancy data
    const fetchOccupancyData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/properties');
        const data = await response.json();
        setOccupancyData(data);
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
      }
    };

    // Fetch financial data
    const fetchFinancialData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/financials');
        const data1 = await response.json();
        setFinancialData(data1);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };

    fetchOccupancyData();
    fetchFinancialData();
  }, []);

  useEffect(() => {
    setPropertyCount(occupancyData.length);
  }, [occupancyData]);

  useEffect(() => {
    if (occupancyData.length) {
      const totalOccupancyRate = occupancyData.reduce((total, property) => total + (property.occupancy_rate || 0), 0);
      setOccupancyRate((totalOccupancyRate / occupancyData.length)); // Calculate and limit to 2 decimal places
    } else {
      console.log("occupancyData is empty");
    }
  }, [occupancyData]);
  
  useEffect(() => {
    if (occupancyData.length) {
      const totalVacancyRate = occupancyData.reduce((total, property) => total + (property.vacant_units || 0), 0);
      setVacancyRate((totalVacancyRate / occupancyData.length)); // Calculate and limit to 2 decimal places
    } else {
      console.log("occupancyData is empty");
    }
  }, [occupancyData]);

  useEffect(() => {
    if (financialData.length) {
      const totalNetProfit = financialData.reduce((total, financial) => total + (financial.ath || 0), 0);
      setNetProfit((totalNetProfit / financialData.length).toFixed(2)); // Calculate and limit to 2 decimal places
    } else {
      console.log("financialData is empty");
    }
  }, [financialData]);
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Functions for Occupancy Table
  const handleSelectOccupancyRow = (id) => {
    if (selectedOccupancyRows.includes(id)) {
      setSelectedOccupancyRows(selectedOccupancyRows.filter(rowId => rowId !== id));
    } else {
      setSelectedOccupancyRows([...selectedOccupancyRows, id]);
    }
  };

  const handleDeleteSelectedOccupancy = () => {
    setOccupancyData(occupancyData.filter(row => !selectedOccupancyRows.includes(row.id)));
    setSelectedOccupancyRows([]);
  };

  // Functions for Financial Table
  const handleSelectFinancialRow = (id) => {
    if (selectedFinancialRows.includes(id)) {
      setSelectedFinancialRows(selectedFinancialRows.filter(rowId => rowId !== id));
    } else {
      setSelectedFinancialRows([...selectedFinancialRows, id]);
    }
  };

  const handleDeleteSelectedFinancial = () => {
    setFinancialData(financialData.filter(row => !selectedFinancialRows.includes(row.id)));
    setSelectedFinancialRows([]);
  };


  return (
    <div className="dashboard-container">
      {/* Top section with search, notification, and profile */}
      <div className="top-bar">
        <div className="search-box">
          <FaSearch className="search-icon" style={{color:'rgba(0, 0, 0, 1)'}}/>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="right-section">
          <div className="notification-icon" onClick={toggleNotification}>
            <IoIosNotificationsOutline />
            {showNotification && (
              <div className="notification-popup">
                <p>You have new notifications!</p>
              </div>
            )}
            <span className="notification-badge"></span> {/* Notification badge */}
          </div>
          <div className="profile-section">
            <img src='https://s3-alpha-sig.figma.com/img/0b7d/dead/270613ec07e31b96acbc3a664717b0aa?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OpBAUG3Le9LHyNmS2bYZwY-xQ9nU8b3eGIDaiytMc7G8FSVyYzSUe19TZQA~FF7Joy5QpGYtENH7o7MTxVG1JOzuRB5eJ-RkoA1vV~JJ7KPkX9m6kPfZeTa~ukEgiWH0Kpp~XS40j9o6q6Cwq-7cApHFkaEpUN3FUt8MoJOplF8IJrWj9FcR3V6niz99WdsUzKDh4o75aTXOgptxfaBMGM6ZBXIH3kRvuF3tusFL-l9eIfcFaFXSKuCTqzuvHv6ytSDzpoaCmWI9C4CZe9DdN-~AsNDhnlJ7d9kxKkxSdbQOTUHRSlDtiun7lTRYuhsCNlUz1~rR14WH3u7kkW33VA__'></img>
            <span className="profile-name">Alex Jhonson
            <FaChevronDown style={{marginLeft:'10px'}}/>
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard heading */}
      <h3 className="dashboard-heading">Dashboard</h3>

      {/* Cards section */}
      <div className="cards-container">
        <div className="card card-blue">
          <h3>Number of Properties</h3>
          <h2>{propertyCount}</h2>
          <h5>Lorem Ipsum</h5>
        </div>
        <div className="card card-green">
          <h3>Average Occupancy Rate</h3>
          <h2>{occupancyRate}%</h2>
          <h5>Lorem Ipsum</h5>
        </div>
        <div className="card card-pink">
          <h3>Average Vacancy Rate</h3>
          <h2>{vacancyRate}%</h2>
          <h5>Lorem Ipsum</h5>
        </div>
        <div className="card card-yellow">
          <h3>Overall Net Profit</h3>
          <h2>${netProfit}</h2>
          <h5>Lorem Ipsum</h5>
        </div>
      </div>

      {/* Two big white boxes section */}
      <div className="big-boxes-container">
        {/* First Big Box: Occupancy Overview */}
        <div className="big-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ color: 'rgba(0, 27, 121, 1)', fontSize: '16px', fontWeight: 'bold' }}>
                Property Occupancy Overview
              </h5>
              <span className='spanicon' style={{ marginLeft: '10px' }}>Statistic</span>
            </div>
            <div className='functional-button'>
              <button onClick={handleDeleteSelectedOccupancy} style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgba(0, 27, 121, 1)', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                <FaTrash style={{ marginRight: '5px' }} />
                Delete
              </button>
              <button 
                style={{ backgroundColor: 'rgba(0, 27, 121, 1)', color: 'rgb(255, 255, 255)', display: 'flex', alignItems: 'center' }}
                >
                <FaPlus style={{ marginRight: '5px' }} />
                Add new
              </button>
            </div>
          </div>
          <h6 style={{ color: 'rgba(102, 112, 133, 1)', fontSize: '13px'}}>
            Detailed Occupancy Breakdown
          </h6>

          {/* Occupancy Table Section */}
          <table className="occupancy-table">
            <thead>
              <tr>
                <th><input type="checkbox" className="custom-checkbox" /></th>
                <th>Owner Name</th>
                <th>Property Name</th>
                <th>Total Units</th>
                <th>Filled Units</th>
                <th>Vacant Units</th>
                <th>Occupancy Rates</th>
                <th>Last Maintenance Date</th>
              </tr>
            </thead>
            <tbody>
              {occupancyData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedOccupancyRows.includes(row.id)}
                      onChange={() => handleSelectOccupancyRow(row.id)}
                    />
                  </td>
                  <td>{row.owner_name}</td>
                  <td>{row.property_name}</td>
                  <td>{row.total_units}</td>
                  <td>{row.filled_units}</td>
                  <td>{row.vacant_units}</td>
                  <td>{row.occupancy_rate}</td>
                  <td>{row.last_maintenance_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Second Big Box: Financial Overview */}
        <div className="big-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h5 style={{ color: 'rgba(0, 27, 121, 1)', fontSize: '16px', fontWeight: 'bold' }}>
                Property Financial Overview
              </h5>
              <span className='spanicon' style={{ marginLeft: '10px' }}>Statistic</span>
            </div>
            <div className='functional-button'>
              <button onClick={handleDeleteSelectedFinancial} style={{ backgroundColor: 'rgb(255, 255, 255)', color: 'rgba(0, 27, 121, 1)', marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                <FaTrash style={{ marginRight: '5px' }} />
                Delete
              </button>
              <button 
                style={{ backgroundColor: 'rgba(0, 27, 121, 1)', color: 'rgb(255, 255, 255)', display: 'flex', alignItems: 'center' }}
                >
                <FaPlus style={{ marginRight: '5px' }} />
                Add new
              </button>
            </div>
          </div>
          <h6 style={{ color: 'rgba(102, 112, 133, 1)', fontSize: '13px'}}>
            Detailed Financial Breakdown
          </h6>

          {/* Financial Table Section */}
          <table className="occupancy-table">
            <thead>
              <tr>
                <th><input type="checkbox" className="custom-checkbox" /></th>
                <th>Owner Name</th>
                <th>Property Name</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Net Profit</th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedFinancialRows.includes(row.id)}
                      onChange={() => handleSelectFinancialRow(row.id)}
                    />
                  </td>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.total_volume}</td>
                  <td>{row.current_price}</td>
                  <td>{row.ath}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
