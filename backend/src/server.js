require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/medecins', require('./routes/medecins'));

app.listen(process.env.PORT, () =>
  console.log('Serveur demarre sur http://localhost:' + process.env.PORT)
);