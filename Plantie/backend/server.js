const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json());

// Spajanje na MySQL bazu
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // ili tvoji podaci za pristup
  password: '',  // postavi password ako ga imaš
  database: 'biljke_db'  // naziv tvoje baze
});

db.connect((err) => {
  if (err) {
    console.error('Greška pri povezivanju na bazu:', err);
  } else {
    console.log('Uspješno povezan na bazu');
  }
});

// Ruta za dohvat biljaka
app.get('/api/biljke', (req, res) => {
  db.query('SELECT * FROM biljke', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Ruta za dodavanje nove biljke
app.post('/api/biljke', (req, res) => {
  const { naziv, vrsta, opis, dostupnaKolicina, cijena } = req.body;
  db.query('INSERT INTO biljke (nazivBiljke, vrstaBiljke, opisBiljke, dostupnaKolicina, cijena) VALUES (?, ?, ?, ?, ?)', 
    [naziv, vrsta, opis, dostupnaKolicina, cijena],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: 'Biljka dodana', id: result.insertId });
      }
    }
  );
});

// Ruta za brisanje biljke
app.delete('/api/biljke/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM biljke WHERE sifraBiljke = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Biljka uspješno obrisana' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server pokrenut na http://localhost:${3000}`);
});
