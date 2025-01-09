<template>
  <q-page padding>
    <!-- Tablica korisnika -->
    <q-table
      :rows="korisnici"
      :columns="columns"
      row-key="naslov"
    />

    <!-- Button ispod tablice -->
    <div class="q-pa-md">
      <q-btn 
        label="Dodaj korisnika" 
        color="primary" 
        @click="dodajKorisnika" 
        class="full-width" 
      />
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "UpravljanjeKorisnicima",
  setup() {
    const korisnici = ref([]);
    const columns = [
      { name: 'ID_korisnika', align: 'left', label: 'ID', field: 'ID_korisnika' },
      { name: 'Ime_korisnika', align: 'left', label: 'Ime', field: 'Ime_korisnika' },
      { name: 'Prezime_korisnika', align: 'left', label: 'Prezime', field: 'Prezime_korisnika' },
      { name: 'Email_korisnika', align: 'left', label: 'Email', field: 'Email_korisnika' },
      { name: 'Adresa_korisnika', align: 'left', label: 'Adresa', field: 'Adresa_korisnika' },
      { name: 'Kontakt_korisnika', align: 'left', label: 'Telefon', field: 'Kontakt_korisnika' },
      {
        name: 'korisnik',
        align: 'left',
        label: 'Korisnik',
        field: row => `${row.Ime_korisnika} ${row.Prezime_korisnika}` // Spajamo ime i prezime
      }
    ];

    const fetchKorisnik = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/korisnici");
        console.log("Podaci iz API-ja:", response.data); // Ispisivanje podataka koje vraća API
        korisnici.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja korisnika:", error);
      }
    };

    const dodajKorisnika = () => {
      console.log("Klik na 'Dodaj korisnika'");
      // Ovdje dodaj logiku za dodavanje korisnika
    };

    onMounted(() => {
      fetchKorisnik();
    });

    return {
      korisnici,
      columns,
      dodajKorisnika
    };
  }
};
</script>
