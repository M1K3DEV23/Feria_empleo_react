import { BrowserRouter as Router} from 'react-router-dom';
// Rutas de mi aplicacion
import AppRoutes from './routes/routes';

// Componentes
import Header from './components/Header';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  )
}

export default App
