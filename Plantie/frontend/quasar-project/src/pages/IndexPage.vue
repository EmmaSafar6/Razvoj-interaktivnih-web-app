<template>
  <q-page class="flex flex-center column">
    <h1>Plantie</h1>
    <img alt="Slika Biljke" src="~assets/OS_1477.jpg" />
    <p>Get plantie with Plantie!</p>

    <!-- Displaying the table -->
    <div style="width: 90%; max-width: 1200px; height: 600px; overflow: auto;">
      <q-table
        :rows="zahtjevi"
        :columns="columns"
        row-key="ID_Zahtjeva"
        style="font-size: 16px;"
      />

      <!-- Input for new comment -->
      <div class="q-mt-lg">
        <q-input v-model="noviZahtjev.Zahtjev" label="Ostavite poruku na našem zidu :)" />
        <q-btn color="green" label="Objavi" class="q-mt-md" @click="dodajZahtjev" />
      </div>
    </div>

    <!-- Spinner while loading -->
    <q-spinner v-if="loading" color="blue" />
  </q-page>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Reactive variables
const zahtjevi = ref([]); // Stores the fetched data
const noviZahtjev = ref({ Zahtjev: '' }); // Stores the new comment
const loading = ref(true); // Indicates whether data is being loaded

// Columns for q-table
const columns = [
  { name: 'Zahtjev', align: 'left', label: 'Komentari', field: 'Zahtjev' }
];

// Function to fetch comments from the API
const fetchZahtjevi = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/zahtjevi');
    zahtjevi.value = response.data; // Set the fetched data
  } catch (error) {
    console.error('Greška prilikom dohvaćanja zahtjeva:', error);
  } finally {
    loading.value = false; // Stop loading spinner
  }
};

// Function to add a new comment
const dodajZahtjev = async () => {
  if (!noviZahtjev.value.Zahtjev.trim()) {
    alert('Molimo unesite komentar!');
    return;
  }

  try {
    // Send a POST request to add a new comment
    const response = await axios.post('http://localhost:3000/api/zahtjev', {
      zahtjev: noviZahtjev.value.Zahtjev
    });

    // Add the new comment to the local list
    zahtjevi.value.push({
      ID_Zahtjeva: response.data.insertId, // Assuming API returns insertId
      Zahtjev: noviZahtjev.value.Zahtjev
    });

    // Clear the input field
    noviZahtjev.value.Zahtjev = '';
    alert('Komentar uspješno objavljen!');
  } catch (error) {
    console.error('Greška prilikom dodavanja komentara:', error);
    alert('Došlo je do greške prilikom objave komentara.');
  }
};

// Fetch comments when the component is mounted
onMounted(() => {
  fetchZahtjevi();
});
</script>
