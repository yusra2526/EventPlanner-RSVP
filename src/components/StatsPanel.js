import React from 'react';
import './StatsPanel.css';

const StatsPanel = ({ guests }) => {
  const totalGuests = guests.length;
  const confirmedGuests = guests.filter(g => g.isConfirmed).length;
  const rsvpGuests = guests.filter(g => g.rsvp).length;
  const unconfirmedGuests = totalGuests - confirmedGuests;

  return (
    <div className="stats-panel">
      <h2>Event Statistics</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Guests</h3>
          <p className="stat-number">{totalGuests}</p>
        </div>
        
        <div className="stat-card">
          <h3>Confirmed</h3>
          <p className="stat-number confirmed">{confirmedGuests}</p>
        </div>
        
        <div className="stat-card">
          <h3>Unconfirmed</h3>
          <p className="stat-number unconfirmed">{unconfirmedGuests}</p>
        </div>
        
        <div className="stat-card">
          <h3>RSVP Yes</h3>
          <p className="stat-number rsvp">{rsvpGuests}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;