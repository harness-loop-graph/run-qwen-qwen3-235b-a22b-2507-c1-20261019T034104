import React, { useState } from 'react';

const Encounter: React.FC = () => {
  const [notes, setNotes] = useState('');
  const [diagnosis, setDiagnosis] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle encounter submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          data-testid="encounter-notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes"
        />
        <input
          data-testid="encounter-diagnosis"
          type="text"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          placeholder="Diagnosis"
        />
        <button data-testid="encounter-submit" type="submit">Save</button>
      </form>
    </div>
  );
};

export default Encounter;