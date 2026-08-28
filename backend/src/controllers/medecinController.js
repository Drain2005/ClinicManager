const pool = require('../config/db');
 
exports.getAll = async (req, res) => {
  const result = await pool.query(
    'SELECT *, (jours * taux) AS prestation FROM medecins ORDER BY id'
  );
  res.json(result.rows);
};
 
exports.create = async (req, res) => {
  const { numed, nom, jours, taux } = req.body;
  
  if (!numed || !nom || jours === '' || taux === '') {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }
  
  if (jours < 0 || taux < 0) {
    return res.status(400).json({ message: 'Les valeurs doivent être positives' });
  }
  
  try {
    await pool.query(
      'INSERT INTO medecins (numed, nom, jours, taux) VALUES ($1,$2,$3,$4)',
      [numed, nom, jours, taux]
    );
    res.json({ message: ' Insertion réussie' });
  } catch (err) {
    if (err.message.includes('duplicate') || err.message.includes('dupliquée')) {
      res.status(400).json({ message: 'Ce numéro de médecin existe déjà' });
    } else {
      res.status(400).json({ message: 'Erreur lors de l\'ajout' });
    }
  }
};
 
exports.update = async (req, res) => {
  const { numed, nom, jours, taux } = req.body;
  
  if (!numed || !nom || jours === '' || taux === '') {
    return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
  }
  
  if (jours < 0 || taux < 0) {
    return res.status(400).json({ message: 'Les valeurs doivent être positives' });
  }
  
  try {
    await pool.query(
      'UPDATE medecins SET numed=$1, nom=$2, jours=$3, taux=$4 WHERE id=$5',
      [numed, nom, jours, taux, req.params.id]
    );
    res.json({ message: ' Modification réussie' });
  } catch (err) {
    if (err.message.includes('duplicate') || err.message.includes('dupliquée')) {
      res.status(400).json({ message: 'Ce numéro de médecin existe déjà' });
    } else {
      res.status(400).json({ message: 'Erreur lors de la modification' });
    }
  }
};

exports.remove = async (req, res) => {
  try {
    await pool.query('DELETE FROM medecins WHERE id = $1', [req.params.id]);
    res.json({ message: ' Suppression réussie' });
  } catch (err) {
    res.status(400).json({ message: 'Erreur lors de la suppression' });
  }
};
exports.bilan = async (req, res) => {
  const result = await pool.query(
    'SELECT SUM(jours*taux) AS total, MIN(jours*taux) AS minimal, MAX(jours*taux) AS maximal FROM medecins'
  );
  res.json(result.rows[0]);
};
