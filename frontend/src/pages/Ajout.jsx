import { useState } from 'react';
import api from '../services/api';

export default function Ajout() {
  const [form, setForm] = useState({ numed: '', nom: '', jours: '', taux: '' });
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null); 
    
    try {
      const res = await api.post('/medecins', form);
      setMsg({ ok: true, text:   res.data.message });
      setForm({ numed: '', nom: '', jours: '', taux: '' });
    }  catch (err) {
  setMsg({ ok: false, text:  (err.response?.data?.message || 'Erreur inconnue') });
}
  };

  return (
    <div className='page'>
      <h2>Ajouter un médecin</h2>
      <form onSubmit={handleSubmit} className='form-card'>
        <input placeholder='N. Medecin' value={form.numed} required
  onChange={e => setForm({...form, numed: e.target.value})} />
<input placeholder='Nom complet' value={form.nom} required
  onChange={e => setForm({...form, nom: e.target.value})} />
<input type='number' placeholder='Nombre de jours' value={form.jours} required min="0"
  onChange={e => setForm({...form, jours: e.target.value})} />
<input type='number' placeholder='Taux journalier' value={form.taux} required min="0"
  onChange={e => setForm({...form, taux: e.target.value})} />
        <button type='submit'>Enregistrer</button>
        {msg && <p className={msg.ok ? 'success' : 'error'}>{msg.text}</p>}
      </form>
    </div>
  );
}