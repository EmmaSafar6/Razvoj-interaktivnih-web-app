const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:9000'
}));
app.use(bodyParser.json());

// MYSQL VEZA
const connection = mysql.createConnection({ //Stvaranje veze s bazom dmudric, te ispis njenih podataka
  host: 'ucka.veleri.hr',
  user: 'dmudric',
  password: '11',
  database: 'dmudric',
});
// VEZA S BAZOM PODATAKA
connection.connect((err) => {  //Uspostavljanje veze
  if (err) {
    console.error('Greška u povezivanju sa bazom:', err);  //Ako se dogodi greška ispis greške
  } else {
    console.log('Povezano sa bazom podataka!');  //Ako je uspjesno povezana
  }
});

////ENDPOINTI ZA ADMINA:-------------------------------------------------------------------------------------------


// ENDPOINT POPIS KORISNIKA
app.get("/api/korisnici", (request, response) => {
  connection.query("SELECT * FROM Korisnik", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});
// ENDPOINT POPIS Biljaka
app.get("/api/biljke", (request, response) => {
  connection.query("SELECT * FROM Biljka", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});
// ENDPOINT POPIS NARUDŽBA
app.get("/api/narudzbe", (request, response) => {
  connection.query("SELECT * FROM Kosarica", (error, results) => {
    if (error) throw error;
    response.send(results);
  });
});

 // ENDPOINT LogIn admina
    app.get('/Admin', (req, res) => {
      const adminId = req.query.adminId;
      const query = `SELECT EXISTS(SELECT * FROM Admin WHERE ID_admina = ?) AS id_exists;`
    
      connection.query(query, [adminId], (err, results) => {
        if (err) {
          console.error('Error during query execution:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }
      });
    });

    
    //ENDPOINT DODAJ KORISNIKA
    app.post('/api/Korisnik', (req, res) => {
      const { ime, prezime, email, telefon } = req.body;
      const query = `INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika, Kontakt_korisnika) VALUES (?, ?, ?, ?)`;
      
      connection.query(query, [ime, prezime, email, telefon], (err, results) => {
        if (err) {
          console.error('Greška pri dodavanju korisnika:', err);
          res.status(500).json({ error: 'Greška pri dodavanju korisnika' });
        } else {
          res.status(200).json({ id: results.insertId, message: 'Korisnik uspješno dodan' });
        }
      });
    });    
    

// API za brisanje korisnika
app.delete('/api/Korisnik/:ID_korisnika', (req, res) => {
  const ID_korisnika = req.params.ID_korisnika;
  
  const query = 'DELETE FROM Korisnik WHERE ID_korisnika = ?';
  connection.query(query, [ID_korisnika], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja korisnika:', err);
      return res.status(500).json({ error: 'Greška prilikom brisanja korisnika' });
    }
    res.json({ message: 'Korisnik uspješno obrisan' });
  });
});
  

// Backend API za dodavanje biljke
app.post("/api/Biljka", (req, res) => {
  const { naziv, vrsta, opis, kolicina, cijena } = req.body;
  const query = `INSERT INTO Biljka (nazivBiljke, vrstaBiljke, opisBiljke, dostupnaKolicina, cijena) VALUES (?, ?, ?, ?, ?)`;

  connection.query(query, [naziv, vrsta, opis, kolicina, cijena], (err, results) => {
    if (err) {
      console.error('Greška prilikom dodavanja biljke:', err);
      res.status(500).json({ error: 'Greška prilikom dodavanja biljke' });
    } else {
      // Ako je biljka uspješno dodana, vraćamo odgovor s podacima
      res.status(200).json({ id: results.insertId, message: 'Biljka uspješno dodana' });
    }
  });
});


// ENDPOINT - Brisanje biljke prema ID-u
app.delete("/api/biljke/:sifraBiljke", (req, res) => {
  const { sifraBiljke } = req.params;
  const query = 'DELETE FROM Biljka WHERE sifraBiljke = ?';

  connection.query(query, [sifraBiljke], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja biljke:', err);
      return res.status(500).json({ error: 'Greška prilikom brisanja biljke' });
    }
    res.json({ message: 'Biljka uspješno obrisana' });
  });
});

// ENDPOINT - dodavanje narudzbe

app.post("/api/PregledNarudzbiKorisnika", (req, res) => {
  const { nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke, datumPrimanja, total } = req.body;

  // Ako datum nije poslan, postaviti na trenutni datum u ispravnom formatu
  const datum = datumPrimanja || new Date().toISOString().slice(0, 19).replace("T", " "); // Prilagodba formata

  const query = `INSERT INTO Narudzba (nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke, datumPrimanja, total) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  connection.query(query, [nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke, datum, total], (err, results) => {
    if (err) {
      console.error('Greška prilikom dodavanja narudžbe:', err);
      return res.status(500).json({ error: 'Greška prilikom dodavanja narudžbe' });
    }

    res.status(201).json({
      message: 'Narudžba uspješno dodana',
      narudzbaId: results.insertId
    });
  });
});

// ENDPOINT - Brisanje narudžbe prema ID-u
app.delete("/api/narudzbe/:ID_narudzbe", (req, res) => {
  const ID_narudzbe = req.params.id;
  const query = 'DELETE FROM Narudzbe WHERE ID_narudzbe = ?';
  
  connection.query(query, [ID_narudzbe], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja narudžbe:', err);
      return res.status(500).json({ error: 'Greška prilikom brisanja narudžbe' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Narudžba nije pronađena' });
    }
    res.json({ message: 'Narudžba uspješno obrisana' });
  });
});



///KRAJ ADMINA--------------------------------------------------------------------------------------------------------------------------


app.use((err, req, res, next) => { //Greška u middleware funkciji
  console.error(err.stack);
  res.status(500).send('Greska u povezanosti!'); //Ispis poruke i greške
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});