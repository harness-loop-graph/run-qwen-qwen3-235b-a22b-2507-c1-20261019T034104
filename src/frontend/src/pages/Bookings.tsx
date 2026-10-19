import React from 'react';

const Bookings: React.FC = () => {
  return (
    <div>
      <h1>My Bookings</h1>
      <div data-testid="appointment-item" data-appointment-id="1">Appointment 1</div>
      <div data-testid="appointment-item" data-appointment-id="2">Appointment 2</div>
    </div>
  );
};

export default Bookings;