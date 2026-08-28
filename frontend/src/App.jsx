import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar       from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login  from './pages/Login';
import Ajout  from './pages/Ajout';
import Liste  from './pages/Liste';
import Bilan  from './pages/Bilan';
 
export default function App() {
  const { user } = useAuth();
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/ajout' element={<PrivateRoute><Ajout /></PrivateRoute>} />
        <Route path='/liste' element={<PrivateRoute><Liste /></PrivateRoute>} />
        <Route path='/bilan' element={<PrivateRoute><Bilan /></PrivateRoute>} />
        <Route path='*' element={<Navigate to={user ? '/ajout' : '/login'} />} />
      </Routes>
    </>
  );
}
