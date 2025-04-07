import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Binder from '../pages/Binder';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/binder" element={
      <ProtectedRoute>
        <Binder />
      </ProtectedRoute>
    } />
  </Routes>
);

export default AppRoutes;