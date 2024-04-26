import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import EventList from '../pages/EventList.tsx';
import EventBadge from '../pages/EventBadge.tsx';
import ScannerPage from '../pages/ScannerPage.tsx';



const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<EventList />} />
        <Route path='/event-badge' element={<EventBadge />} />
        <Route path='/event-reader' element={<ScannerPage />} />
        {/* Ruta para paginas no encontradas */}
        <Route path='*' element={ <Navigate to='/' replace /> } />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes;
