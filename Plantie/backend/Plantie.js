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

// ENDPOINT LogIn korisnika
app.get('/api/login', (req, res) => {
  const { id, lozinka } = req.query;  // Koristi 'id' i 'lozinka' jer su to parametri koje šalje frontend
  console.log('Received id:', id, 'lozinka:', lozinka); // Provjera podataka

  const query = 'SELECT * FROM korisnik WHERE id = ? AND lozinka = ?';
  connection.query(query, [id, lozinka], (err, results) => {
    if (err) {
      console.error('Error querying database:', err); // Provjera grešaka u SQL upitu
      return res.status(500).json({ error: 'Greška pri prijavi korisnika' });
    }
    if (results.length > 0) {
      const korisnik = results[0];
      res.json({
        success: true,
        message: `Uspješno ste logirani! Ime i prezime: ${korisnik.ime} ${korisnik.prezime}`
      });
    } else {
      res.status(404).json({ error: 'Neispravan ID ili lozinka.' });
    }
  });
});

// ENDPOINT REGISTRACIJA KORISNIKA
app.post('/api/registracija', (req, res) => {
  const { id, ime, prezime, korime, lozinka } = req.body;

  // Provjera da li su svi podaci uneseni
  if (!id || !ime || !prezime || !korime || !lozinka) {
    return res.status(400).json({ error: 'Molimo unesite sve podatke: ID, ime, prezime, korisničko ime i lozinku.' });
  }

  // Provjera da li već postoji korisnik s tim ID-om
  const checkQuery = 'SELECT * FROM korisnik WHERE id = ?';
  connection.query(checkQuery, [id], (err, results) => {
    if (err) {
      console.error('Greška pri provjeri ID-a:', err);
      return res.status(500).json({ error: 'Greška pri provjeri ID-a.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'ID je već u uporabi. Molimo odaberite drugi ID.' });
    }

    // Unos korisnika u bazu podataka
    const query = `INSERT INTO korisnik (id, ime, prezime, korime, lozinka) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [id, ime, prezime, korime, lozinka], (err, results) => {
      if (err) {
        console.error('Greška pri registraciji korisnika:', err);
        return res.status(500).json({ error: 'Greška pri registraciji korisnika' });
      }

      res.status(200).json({
        message: 'Korisnik uspješno registriran!',
        id: id  // Vraćamo ID korisnika koji je ručno unesen
      });
    });
  });
});

// ENDPOINT biljke
app.get("/api/biljke", (req, res) => {
  const { searchQuery, searchByCategory, searchByName } = req.query;

  let query = "SELECT * FROM Biljka WHERE 1=1"; // Osnovni upit
  const params = [];

  if (searchQuery) {
    if (searchByCategory === "true") {
      query += " AND vrstaBiljke LIKE ?";
      params.push(`%${searchQuery}%`);  // Pretraga prema vrsti biljke
    }
    if (searchByName === "true") {
      query += " AND nazivBiljke LIKE ?";
      params.push(`%${searchQuery}%`);  // Pretraga prema nazivu biljke
    }
  }

  connection.query(query, params, (error, results) => {
    if (error) {
      console.error("Greška prilikom pretrage biljaka:", error);
      return res.status(500).json({ error: "Greška prilikom pretrage biljaka" });
    }
    res.json(results); // Pošaljite rezultate
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
      const query = `INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika,Lozinka_korisnika, Adresa_korisnika, Kontakt_korisnika) VALUES (?, ?, ?, ?, ?, ?)`;
      
      connection.query(query, [ime, prezime, email, lozinka, adresa ,telefon], (err, results) => {
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

app.post("/api/dodavanjenarudzbe", (req, res) => {
  const { nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke } = req.body;

  // SQL upit za dodavanje narudžbe
  const query = `
    INSERT INTO Kosarica (nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [nazivBiljke, velicinaBiljke, kolicina, ID_korisnika, sifraBiljke], (err, results) => {
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
app.delete("/api/brisanjenarudzbe/:ID_Kosarice", (req, res) => {
  const ID_Kosarice = req.params.ID_Kosarice;  // Correctly reference the URL parameter
  const query = 'DELETE FROM Kosarica WHERE ID_Kosarice = ?';
  
  connection.query(query, [ID_Kosarice], (err, results) => {
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