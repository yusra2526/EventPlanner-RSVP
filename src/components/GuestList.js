import React, { useState } from 'react';
import './GuestList.css';

const GuestItem = ({ guest, onToggleConfirmation, onToggleRSVP, onRemoveGuest, onUpdateGuest }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: guest.name, email: guest.email });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData.name.trim() && editData.email.trim()) {
      onUpdateGuest(guest.id, editData);
      setIsEditing(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleCancel = () => {
    setEditData({ name: guest.name, email: guest.email });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <li className={`guest-item ${guest.isConfirmed ? 'confirmed' : ''}`}>
      <div className="guest-info">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="edit-input"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className="edit-input"
              placeholder="Email"
            />
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSave}>Save</button>
              <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h3>{guest.name}</h3>
            <p>{guest.email}</p>
            <div className="status-badges">
              <span className={`badge ${guest.isConfirmed ? 'confirmed' : 'pending'}`}>
                {guest.isConfirmed ? '✓ Confirmed' : 'Pending'}
              </span>
              <span className={`badge rsvp ${guest.rsvp ? 'yes' : 'no'}`}>
                RSVP: {guest.rsvp ? 'Yes' : 'No'}
              </span>
            </div>
          </>
        )}
      </div>
      
      {!isEditing && (
        <div className="guest-actions">
          <div className="action-row">
            <button 
              className={`action-btn confirm-btn ${guest.isConfirmed ? 'confirmed' : 'unconfirmed'}`}
              onClick={() => onToggleConfirmation(guest.id)}
            >
              {guest.isConfirmed ? 'Undo Confirm' : 'Confirm'}
            </button>
            
            <button 
              className={`action-btn rsvp-btn ${guest.rsvp ? 'yes' : 'no'}`}
              onClick={() => onToggleRSVP(guest.id)}
            >
              RSVP: {guest.rsvp ? 'No' : 'Yes'}
            </button>
          </div>
          
          <div className="action-row">
            <button 
              className="action-btn edit-btn"
              onClick={handleEdit}
            >
              ✏️ Edit
            </button>
            
            <button 
              className="action-btn remove-btn"
              onClick={() => {
                if (window.confirm(`Remove ${guest.name} from the guest list?`)) {
                  onRemoveGuest(guest.id);
                }
              }}
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

const GuestList = ({ guests, onToggleConfirmation, onToggleRSVP, onRemoveGuest, onUpdateGuest }) => {
  return (
    <div className="guest-list">
      <h2>Guest List</h2>
      
      {guests.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No Guests Yet</h3>
          <p>Start by adding guests using the form above.</p>
        </div>
      ) : (
        <>
          <ul className="guest-items">
            {guests.map(guest => (
              <GuestItem
                key={guest.id}
                guest={guest}
                onToggleConfirmation={onToggleConfirmation}
                onToggleRSVP={onToggleRSVP}
                onRemoveGuest={onRemoveGuest}
                onUpdateGuest={onUpdateGuest}
              />
            ))}
          </ul>
          
          <div className="list-summary">
            <p>
              Showing <strong>{guests.length}</strong> guest{guests.length !== 1 ? 's' : ''}
              {guests.filter(g => g.isConfirmed).length > 0 && 
                ` • ${guests.filter(g => g.isConfirmed).length} confirmed`}
              {guests.filter(g => g.rsvp).length > 0 && 
                ` • ${guests.filter(g => g.rsvp).length} RSVP'd`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default GuestList;