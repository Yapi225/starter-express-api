const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
  connectionString: 'postgres://nowyswud:lYHFHIahOonLgXc6uK3uRSfmKmn2WJRX@motty.db.elephantsql.com/nowyswud',
});

app.post('/Participant', async (req, res) => {
  const { nom, prenom, tel, email } = req.body;
  const query = 'INSERT INTO Participant (nom, prenom, tel, email) VALUES ($1, $2, $3, $4)';
  const values = [nom, prenom, tel, email];

  try {
    await pool.query(query, values);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/Participants', async (req, res) => {
  const query = 'SELECT * FROM Participant';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
