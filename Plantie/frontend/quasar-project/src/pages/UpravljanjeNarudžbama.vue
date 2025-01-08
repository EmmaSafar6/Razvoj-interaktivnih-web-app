<template>
  <q-page padding>
    <q-table
      :rows="narudzbe"
      :columns="columns"
      row-key="naslov"
    />
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "UpravljanjeNarudžbama",
  setup() {
    const narudzbe = ref([]);
    const columns = [
  { name: 'ID_Kosarice', align: 'left', label: 'ID', field: 'ID_Kosarice' },
  { name: 'nazivBiljke', align: 'left', label: 'Naziv', field: 'nazivBiljke' },
  { name: 'velicinaBiljke', align: 'left', label: 'Veličina biljke', field: 'velicinaBiljke' },
{ name: 'kolicina', align: 'left', label: 'Količina bilja', field: 'kolicina' },
{ name: 'ID_korisnika', align: 'left', label: 'ID Naručitelja', field: 'ID_korisnika' },
{ name: 'sifraBiljke', align: 'left', label: 'ID Biljke', field: 'sifraBiljke'},
{ name: 'datumPrimanja', align: 'left', label: 'Datum narudžbe', field: 'datumPrimanja'},
{ name: 'total', align: 'left', label: 'Iznos narudžbe', field: 'total'},
];

const fetchBiljka = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/narudzbe");
    console.log("Podaci iz API-ja:", response.data); // Ispisivanje podataka koje vraća API
    narudzbe.value = response.data;
  } catch (error) {
    console.error("Greška prilikom dohvaćanja bilja:", error);
  }
};
    onMounted(() => {
      fetchBiljka();
    });

    return {
      narudzbe,
      columns
    };
  }
};
</script>
