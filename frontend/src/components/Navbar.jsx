import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
 
export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className='navbar'>
      <span className='brand'>Gestion de Medecin</span>
      <div>
        <Link to='/ajout'>Ajout</Link>
        <Link to='/liste'>Liste </Link>
        <Link to='/bilan'>Bilan & Graphique</Link>
      </div>
      <span>{user} <button onClick={logout}>Déconnexion</button></span>
    </nav>
  );
}
