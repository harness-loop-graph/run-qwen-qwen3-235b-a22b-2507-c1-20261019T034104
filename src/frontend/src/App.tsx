import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Bookings from './pages/Bookings';
import Search from './pages/Search';
import Agenda from './pages/Agenda';
import Encounter from './pages/Encounter';
import History from './pages/History';
import Admin from './pages/Admin';
import Audit from './pages/Audit';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/encounter/:id" element={<Encounter />} />
        <Route path="/history/:id" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/audit" element={<Audit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;