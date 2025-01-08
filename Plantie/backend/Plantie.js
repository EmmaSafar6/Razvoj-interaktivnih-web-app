const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:9000'
}));
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

////ENDPOINTI ZA ADMINA:


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

///KRAJ ADMINA


app.use((err, req, res, next) => { //Greška u middleware funkciji
  console.error(err.stack);
  res.status(500).send('Greska u povezanosti!'); //Ispis poruke i greške
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});