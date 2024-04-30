import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// import Home from '../pages/Home.tsx';
import Register from '../pages/Register.tsx';
import Login from '../pages/Login.tsx';
import EventList from '../pages/EventList.tsx';
import EventBadge from '../pages/EventBadge.tsx';
import Home from '../pages/Home.tsx';
import EventScanner from '../pages/EventScanner.tsx';
import CountdownTimer from '../pages/CountdownTimer.tsx';
// import ProtectedRoute from './ProtectedRoute.tsx';



const AppRoutes: React.FC = () => {
  const location = useLocation();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsAuthenticated( !!token );
  // }, []);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/events' element={<EventList />} />
        <Route path='/event-badge' element={<EventBadge />} />
        <Route path='/events-scanner' element={<EventScanner />} />
        <Route path='/event-timer' element={<CountdownTimer />} />
        {/* Rutas protegidas */}
        {/* Ruta para paginas no encontradas */}
        <Route path='*' element={ <Navigate to='/'/> } />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes;
