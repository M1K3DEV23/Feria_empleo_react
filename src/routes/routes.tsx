import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import EventList from '../pages/EventList.tsx';
import EventBadge from '../pages/EventBadge.tsx';



const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/events' element={<EventList />} />
      <Route path='/event-badge' element={<EventBadge />} />
      {/* Ruta para paginas no encontradas */}
      <Route path='*' element={ <Navigate to='/' replace /> } />
    </Routes>
  )
}

export default AppRoutes;
