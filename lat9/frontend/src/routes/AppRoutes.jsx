import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditMovie from '../pages/Edit';
import AddMovie from '../pages/Add';
import Home from '../pages/Home';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddMovie />} />
      <Route path="/edit/:id" element={<EditMovie />} />
    </Routes>
  );
}

export default AppRoutes;
