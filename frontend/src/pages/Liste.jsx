import { useState, useEffect } from 'react';
import api from '../services/api';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Liste() {
  const [medecins, setMedecins] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState(null);
  
  // État pour la boîte de dialogue
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const load = () => api.get('/medecins').then(r => setMedecins(r.data));
  useEffect(() => { load(); }, []);

  const startEdit = (m) => { setEditId(m.id); setForm(m); };

  const saveEdit = async () => {
    try {
      const res = await api.put('/medecins/' + editId, form);
      setMsg({ ok: true, text: res.data.message });
      setEditId(null); load();
    } catch (err) {
      setMsg({ ok: false, text: err.response?.data?.message });
    }
  };

  // Ouvre la boîte de dialogue au lieu de confirm()
  const requestDelete = (id) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  // Supprime après confirmation
  const confirmDelete = async () => {
    try {
      const res = await api.delete('/medecins/' + deleteId);
      setMsg({ ok: true, text: res.data.message });
      load();
    } catch (err) {
      setMsg({ ok: false, text: err.response?.data?.message });
    }
    setDialogOpen(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  return (
    <div className='page'>
      <h2>Liste des médecins</h2>
      
      {msg && <p className={msg.ok ? 'success' : 'error'}>{msg.text}</p>}
      
      <table>
        <thead><tr>
          <th>N. Med.</th><th>Nom</th><th>Jours</th>
          <th>Taux</th><th>Prestation</th><th>Actions</th>
        </tr></thead>
        <tbody>{medecins.map(m => (
          <tr key={m.id}>
            <td>{editId===m.id ? <input value={form.numed} onChange={e=>setForm({...form,numed:e.target.value})}/> : m.numed}</td>
            <td>{editId===m.id ? <input value={form.nom} onChange={e=>setForm({...form,nom:e.target.value})}/> : m.nom}</td>
            <td>{editId===m.id ? <input type="number" value={form.jours} onChange={e=>setForm({...form,jours:e.target.value})}/> : m.jours}</td>
            <td>{editId===m.id ? <input type="number" step="0.01" value={form.taux} onChange={e=>setForm({...form,taux:e.target.value})}/> : Number(m.taux).toFixed(0)} AR</td>
            <td>{Number(m.prestation).toLocaleString()} AR</td>
            <td>
              {editId===m.id
                ? <button onClick={saveEdit}> Sauver</button>
                : <button onClick={() => startEdit(m)}> Modifier</button>}
              <button onClick={() => requestDelete(m.id)}> Supprimer</button>
            </td>
          </tr>
        ))}</tbody>
      </table>

      {/* Boîte de dialogue de confirmation */}
      <ConfirmDialog
        isOpen={dialogOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce médecin ?"
      />
    </div>
  );
}