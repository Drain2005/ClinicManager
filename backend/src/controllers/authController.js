const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM utilisateurs WHERE username = $1', [username]
    );
    
    if (result.rows.length === 0)
      return res.status(401).json({ message: 'Identifiants incorrects' });
    
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    
    if (!valid)
      return res.status(401).json({ message: 'Identifiants incorrects' });
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
    
    res.json({ token, username: user.username });
  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};