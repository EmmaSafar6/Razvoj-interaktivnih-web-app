<template>
  <q-page>
    <h1>Popis svih biljaka</h1>
    <!-- Tabela za prikaz biljaka -->
    <q-table
      :rows="biljke"
      :columns="columns"
      row-key="sifraBiljke"
      flat
    />
    <!-- Spinner dok se učitavaju podaci -->
    <q-spinner v-if="loading" color="blue" />
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loading: false, // Za spinner dok se podaci učitavaju
      biljke: [], // Podaci o biljkama koji će biti dohvaćeni iz API-ja
      columns: [
        { name: 'sifraBiljke', label: 'Šifra biljke', align: 'left', field: row => row.sifraBiljke },
        { name: 'nazivBiljke', label: 'Naziv biljke', align: 'left', field: row => row.nazivBiljke },
        { name: 'vrstaBiljke', label: 'Vrsta biljke', align: 'left', field: row => row.vrstaBiljke },
        { name: 'opisBiljke', label: 'Opis biljke', align: 'left', field: row => row.opisBiljke },
        { name: 'dostupnaKolicina', label: 'Dostupna količina', align: 'center', field: row => row.dostupnaKolicina },
        { name: 'cijena', label: 'Cijena', align: 'center', field: row => `${row.cijena} €` },
      ],
    };
  },
  methods: {
    // Funkcija za dohvaćanje biljaka iz API-ja
    async fetchBiljke() {
      this.loading = true; // Prikaz spinnera
      try {
        const response = await axios.get("http://localhost:3000/api/biljke");
        this.biljke = response.data; // Postavljanje podataka
      } catch (error) {
        console.error("Greška prilikom dohvaćanja biljaka:", error);
      } finally {
        this.loading = false; // Skrivanje spinnera
      }
    },
  },
  mounted() {
    this.fetchBiljke(); // Automatski dohvaća biljke kad se komponenta učita
  },
};
</script>

