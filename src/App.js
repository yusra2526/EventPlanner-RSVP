import React, { useState, useEffect } from 'react';
import './App.css';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';
import StatsPanel from './components/StatsPanel';

function App() {
  const [guests, setGuests] = useState([]);
  
  // Load from localStorage on initial render
  useEffect(() => {
    const savedGuests = localStorage.getItem('eventPlannerGuests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    }
  }, []);

  // Save to localStorage whenever guests change
  useEffect(() => {
    localStorage.setItem('eventPlannerGuests', JSON.stringify(guests));
    console.log('Guests saved to localStorage');
  }, [guests]);

  const addGuest = (newGuest) => {
    setGuests(prevGuests => [...prevGuests, newGuest]);
  };

  const toggleConfirmation = (id) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === id 
          ? { ...guest, isConfirmed: !guest.isConfirmed }
          : guest
      )
    );
  };

  const toggleRSVP = (id) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === id 
          ? { ...guest, rsvp: !guest.rsvp }
          : guest
      )
    );
  };

  // NEW: Remove guest
  const removeGuest = (id) => {
    setGuests(prevGuests => prevGuests.filter(guest => guest.id !== id));
  };

  // NEW: Update guest information
  const updateGuest = (id, updatedData) => {
    setGuests(prevGuests => 
      prevGuests.map(guest => 
        guest.id === id 
          ? { ...guest, ...updatedData }
          : guest
      )
    );
  };

  // NEW: Demo batching with complex state
  const handleComplexUpdate = () => {
    // Multiple state updates that React will batch
    setGuests(prev => prev.map(g => ({ ...g, isConfirmed: true })));
    setGuests(prev => prev.map(g => ({ ...g, rsvp: true })));
    
    // Log to show state hasn't updated yet
    console.log('Current state (before re-render):', guests);
    
    // This would fail - we can't access updated state immediately
    setTimeout(() => {
      console.log('State after re-render (in timeout):', guests);
    }, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎉 Event Planner</h1>
        <p className="subtitle">Manage your guests with ease</p>
      </header>
      
      <main className="main-content">
        <GuestForm onAddGuest={addGuest} />
        
        <StatsPanel guests={guests} />
        
        <GuestList 
          guests={guests} 
          onToggleConfirmation={toggleConfirmation}
          onToggleRSVP={toggleRSVP}
          onRemoveGuest={removeGuest}
          onUpdateGuest={updateGuest}
        />
        
        {guests.length > 0 && (
          <div className="demo-section">
            <button 
              className="demo-btn"
              onClick={handleComplexUpdate}
            >
              Confirm All & RSVP All (Demo Batching)
            </button>
            <p className="demo-note">
              Check browser console to see how React batches state updates.
            </p>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>Total Guests: {guests.length} | Data saved locally in your browser</p>
      </footer>
    </div>
  );
}

export default App;