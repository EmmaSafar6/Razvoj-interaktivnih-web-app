const express = require('express'); // Uvoz Express modula
const mysql = require('mysql'); // Uvoz MySQL modula
const app = express(); // Kreiranje Express aplikacije
const PORT = process.env.PORT || 3001; // Postavljanje porta na kojem će aplikacija slušati

// Middleware za parsiranje JSON tijela zahtjeva
app.use(express.json());

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
// ENDPOINT  Informacije o biljkama
app.get('/Biljka', (req, res) => {  //Endpoint za dobivanje podataka s baze
  const query = 'SELECT * FROM Biljka'; //U query u bazi što se upisuje

   connection.query(query, (err, results) => {  //veza sa query u bazi
    if (err) {
      console.error('Error tokom izvođenja query:', err);  //Neuspješna veza i error ispis
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);  //Ako je veza uspjela ispiši podatke
    }
  });
});
// ENDPOINT Infromacije o korisnicima
app.get('/Korisnik', (req, res) => {
  const query = 'SELECT * FROM Korisnik'; 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error tokom izvođenja query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});  
  // ENDPOINT  Ispis Zahtjeva korisnika adminu
  app.get('/ZahtjeviZaAdmina', (req, res) => {
    const query = 'SELECT * FROM ZahtjeviZaAdmina'; 
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error tokom izvođenja query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });
  // ENDPOINT Informacije svim narudžbama
app.get('/Kosarica', (req, res) => {
  const query = 'SELECT * FROM Kosarica'; 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error tokom izvođenja query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }});
});

    // ENDPOINT Ispis admina
    app.get('/Admin', (req, res) => {
      const query = 'SELECT * FROM Admin'; 
    
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Error tokom izvođenja query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(results);
        }});
    });
// ENDPOINT Dodavanje korisnika
app.post('/Korisnik', (req, res) => { //Endpoint za dodavanje podataka u baza
  const NoviKorisnik = req.body;   // Podaci novog korisnika iz zahtjeva
  const unosKorisnika = "INSERT INTO Korisnik (Ime_korisnika, Prezime_korisnika, Email_korisnika, Lozinka_korisnika) VALUES (?, ?, ?,?)";
  connection.query(unosKorisnika, [NoviKorisnik.Ime_korisnika,NoviKorisnik.Prezime_korisnika, NoviKorisnik.Email_korisnika, NoviKorisnik.Lozinka_korisnika], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);  //Greška tokom upisa u query
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Unos uspješan!');  //Unos u bazu uspješan
    }
  });
});
// ENDPOINT 8 Dodavanje biljki u bazu
app.post('/Biljka', (req, res) => {
  const NovaBiljka = req.body;
  const unosBiljka = "INSERT INTO Biljka(nazivBiljke, vrstaBiljke, opisBiljke,dostupnaKolicina,cijena ) VALUES (?, ?, ?,?,?)";
  connection.query(unosBiljka, [NovaBiljka.nazivBiljke, NovaBiljka.vrstaBiljke, NovaBiljka.opisBiljke,NovaBiljka.dostupnaKolicina,NovaBiljka.cijena ], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Unos uspješan!');
    }
  });
});
// ENDPOINT 9 Dodavanje admina u bazu
app.post('/Admin', (req, res) => {
  const NoviAdmin = req.body;
  const unosAdmina = "INSERT INTO Admin(ID_Admina) VALUES (?)";
  connection.query(unosAdmina, [NoviAdmin.ID_Admina], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Unos uspješan!');
    }
  });
});
// ENDPOINT 10 narudžbe(kosarice) u bazu
app.post('/Kosarica', (req, res) => {
  const NovaKosarica = req.body;
  const unosKosarice = "INSERT INTO Kosarica(nazivBiljke,velicinaBiljke,kolicina,ID_korisnika,sifraBiljke) VALUES (?,?,?, ?, ?)";
  connection.query(unosKosarice, [NovaKosarica.nazivBiljke, NovaKosarica.velicinaBiljke, NovaKosarica.kolicina,NovaKosarica.ID_korisnikao,NovaKosarica.sifraBiljke], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Unos uspješan!');
    }
  });
});
// ENDPOINT 11 slanje zahtjeva adminu
app.post('/ZahtjeviZaAdmina', (req, res) => {
  const NoviZahtjev = req.body;
  const unosZahtjeva = "INSERT INTO ZahtjeviZaAdmina(Zahtjev) VALUES (?)";
  connection.query(unosZahtjeva, [NoviZahtjev.Zahtjev], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Unos uspješan!');
    }
  });
});



// ENDPOINT 13 Brisanje korisnika
app.delete('/Korisnik/:ID_korisnika', (req, res) => {
  const ID_korisnika = req.params.ID_korisnika;

  const query = 'DELETE FROM Korisnik WHERE ID_korisnika = ?';

  connection.query(query, [ID_korisnika], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja korisnika:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Korisnik uspješno obrisan' });
    }
  });
});

// ENDPOINT 14 Brisanje biljke
app.delete('/Biljka/:sifraBiljke', (req, res) => {
  const sifraBiljke = req.params.sifraBiljke;

  const query = 'DELETE FROM Biljka WHERE sifraBiljke = ?';

  connection.query(query, [sifraBiljke], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja biljke:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Biljka uspješno obrisana' });
    }
  });
});

// ENDPOINT 15 Brisanje admina
app.delete('/Admin/:ID_Admina', (req, res) => {
  const ID_Admina = req.params.ID_Admina;

  const query = 'DELETE FROM Admin WHERE ID_Admina = ?';

  connection.query(query, [ID_Admina], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja admina:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Admin uspješno obrisan' });
    }
  });
});

// ENDPOINT 16 Brisanje zahtjeva za admina
app.delete('/ZahtjeviZaAdmina/:ID_Zahtjeva', (req, res) => {
  const ID_Zahtjeva = req.params.ID_Zahtjeva;

  const query = 'DELETE FROM ZahtjeviZaAdmina WHERE ID_Zahtjeva = ?';

  connection.query(query, [ID_Zahtjeva], (err, results) => {
    if (err) {
      console.error('Greška prilikom brisanja zahtjeva za admina:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Zahtjev za admina uspješno obrisan' });
    }
  });
});


// ENDPOINT 18 za dobivanje narudžbi korisnika s detaljima o biljkama,korisnik i narudzbi
app.get('/NarudzbeKorisnika/:korisnikId', (req, res) => {
  const korisnikId = req.params.korisnikId;
  const query = `
    SELECT k.*, b.nazivBiljke, b.vrstaBiljke, b.opisBiljke
    FROM Kosarica k
    JOIN Biljka b ON k.sifraBiljke = b.sifraBiljke
    WHERE k.ID_korisnika = ?;
  `;
  connection.query(query, [korisnikId], (err, results) => {
    if (err) {
      console.error('Greška tokom izvođenja query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
// ENDPOINT 19 za dobivanje  popis naruceenih biljki s kolicinom
app.get('/NaruceneBiljke', (req, res) => {
  const query = `
    SELECT b.nazivBiljke, COUNT(*) AS brojNarudzbi
    FROM Kosarica k
    JOIN Biljka b ON k.sifraBiljke = b.sifraBiljke
    GROUP BY b.nazivBiljke
    ORDER BY brojNarudzbi DESC
    LIMIT 10;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Greška tokom izvođenja query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});
//ENDPOINT Azuriranje podataka korisnika
app.put('/Korisnik/:ID_korisnika', (req, res) => {
  const ID_korisnika = req.params.ID_korisnika;
  console.log('Received PUT request for ID_korisnika:', ID_korisnika);

  const { Ime_korisnika, Prezime_korisnika, Email_korisnika, Lozinka_korisnika, Adresa_korisnika } = req.body;
  console.log('Request body:', req.body);

  const query = `
    UPDATE Korisnik 
    SET Ime_korisnika = ?, Prezime_korisnika = ?, Email_korisnika = ?, Lozinka_korisnika = ?, Adresa_korisnika = ?
    WHERE ID_korisnika = ?;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error during query execution:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.send('Korisnik uspješno ažuriran!');
    }
  });
});



app.use((err, req, res, next) => { //Greška u middleware funkciji
  console.error(err.stack);
  res.status(500).send('Greska u povezanosti!'); //Ispis poruke i greške
});
