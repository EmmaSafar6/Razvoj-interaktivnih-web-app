<template>
  <q-page padding>
    <!-- Naslov -->
    <div class="q-mb-md text-h5">Postavite pitanje</div>

    <!-- Forma za postavljanje pitanja -->
    <q-card>
      <q-card-section>
        <q-input v-model="pitanje" label="Postavite svoje pitanje" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Pošaljite" color="primary" @click="posaljiPitanje" />
      </q-card-actions>
    </q-card>

    <!-- Prikaz svih pitanja i odgovora -->
    <div v-if="pitanja.length">
      <div v-for="pitanje in pitanja" :key="pitanje.ID_Pitanja" class="q-mb-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Pitanje:</div>
            <div>{{ pitanje.pitanje }}</div>
            <div v-if="pitanje.odgovor" class="text-h6 q-mt-md">Odgovor:</div>
            <div v-if="pitanje.odgovor">{{ pitanje.odgovor }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: "PitanjaStranica",
  setup() {
    const pitanje = ref('');
    const pitanja = ref([]);

    // Funkcija za dohvat svih pitanja i odgovora
    const fetchPitanja = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/pitanja");
        pitanja.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja pitanja:", error);
      }
    };

    // Funkcija za slanje pitanja
    const posaljiPitanje = async () => {
      try {
        if (pitanje.value.trim() !== '') {
          const response = await axios.post("http://localhost:3000/api/pitanja", {
            pitanje: pitanje.value,
          });

          // Dodaj novo pitanje u lokalni popis pitanja
          pitanja.value.push(response.data);
          pitanje.value = '';  // Očisti input
        }
      } catch (error) {
        console.error("Greška prilikom slanja pitanja:", error);
        alert("Došlo je do greške prilikom slanja pitanja.");
      }
    };

    onMounted(() => {
      fetchPitanja(); // Dohvati pitanja prilikom učitavanja stranice
    });

    return {
      pitanje,
      pitanja,
      posaljiPitanje,
    };
  },
};
</script>
