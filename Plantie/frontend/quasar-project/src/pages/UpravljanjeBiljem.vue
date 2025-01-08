<template>
  <q-page padding>
    <q-table
      :rows="biljke"
      :columns="columns"
      row-key="naslov"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "UpravljanjeBiljem",
  setup() {
    const biljke = ref([]);
    const columns = [
  { name: 'sifraBiljke', align: 'left', label: 'ID', field: 'sifraBiljke' },
  { name: 'nazivBiljke', align: 'left', label: 'Naziv', field: 'nazivBiljke' },
  { name: 'vrstaBiljke', align: 'left', label: 'Vrsta', field: 'vrstaBiljke' },
{ name: 'opisBiljke', align: 'left', label: 'Opis', field: 'opisBiljke' },
{ name: 'dostupnaKolicina', align: 'left', label: 'Dostupna količina', field: 'dostupnaKolicina' },
{ name: 'cijena', align: 'left', label: 'Cijena', field: 'cijena', format: val => `${val} €` },
];

const fetchBiljka = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/biljke");
    console.log("Podaci iz API-ja:", response.data); // Ispisivanje podataka koje vraća API
    biljke.value = response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja bilja:", error);
  }
};
    onMounted(() => {
      fetchBiljka();
    });

    return {
      biljke,
      columns
    };
  }
};
</script>
