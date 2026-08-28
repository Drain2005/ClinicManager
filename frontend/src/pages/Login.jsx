import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
 
export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await login(form.username, form.password); }
    catch { setError('Identifiants incorrects'); }
  };
 
  return (
    <div className='login-container'>
      <div className='login-card'>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder='Nom utilisateur'
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})} />
          <input type='password' placeholder='Mot de passe'
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})} />
          <button type='submit'>Se connecter</button>
          {error && <p className='error'>{error}</p>}
        </form>
      </div>
    </div>
  );
}
