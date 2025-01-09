<template>
  <q-page padding>
    <!-- Tablica biljaka -->
    <q-table
      :rows="biljke"
      :columns="columns"
      row-key="sifraBiljke"
    />

    <!-- FAB gumb za dodavanje i brisanje biljaka -->
    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije admina"
        color="green"
        icon="menu"
        direction="down"
        size="sm"
      >
        <!-- Akcija za dodavanje biljke -->
        <q-fab-action color="primary" @click="otvoriDodavanjeBiljke" icon="add" label="Dodaj biljku" />
        
        <!-- Akcija za uklanjanje biljke -->
        <q-fab-action color="negative" @click="otvoriUklanjanjeBiljke" icon="delete" label="Ukloni biljku" />
      </q-fab>
    </div>

    <!-- Popup za dodavanje biljke -->
    <q-dialog v-model="prikaziDodajBiljku">
      <q-card>
        <q-card-section>
          <div class="text-h6">Dodavanje biljke</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="novaBiljka.naziv" label="Naziv biljke" />
          <q-input v-model="novaBiljka.vrsta" label="Vrsta biljke" />
          <q-input v-model="novaBiljka.opis" label="Opis biljke" />
          <q-input v-model="novaBiljka.kolicina" label="Dostupna količina" type="number" />
          <q-input v-model="novaBiljka.cijena" label="Cijena" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziDodajBiljku = false" />
          <q-btn flat label="Dodaj" color="primary" @click="dodajBiljku" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Popup za uklanjanje biljke -->
    <q-dialog v-model="prikaziUkloniBiljku">
      <q-card>
        <q-card-section>
          <div class="text-h6">Uklanjanje biljke</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="idBiljkeZaUklanjanje" label="Unesite ID biljke" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziUkloniBiljku = false" />
          <q-btn flat label="Ukloni" color="negative" @click="ukloniBiljku(idBiljkeZaUklanjanje)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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

    const fab = ref(false);
    const prikaziDodajBiljku = ref(false);
    const prikaziUkloniBiljku = ref(false);
    const novaBiljka = ref({ naziv: '', vrsta: '', opis: '', kolicina: 0, cijena: 0 });
    const idBiljkeZaUklanjanje = ref("");

    // Axios poziv za dohvat svih biljaka
    const fetchBiljke = async () => {
      try {
        // Ovdje je Axios GET poziv za dohvat svih biljaka iz API-ja
        const response = await axios.get("http://localhost:3000/api/biljke");
        biljke.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja biljaka:", error);
      }
    };

    // Axios poziv za dodavanje nove biljke
    const dodajBiljku = async () => {
      try {
        // Ovdje je Axios POST poziv za dodavanje biljke u bazu
        const response = await axios.post("http://localhost:3000/api/biljke", novaBiljka.value);
        biljke.value.push(response.data); // Dodaj novu biljku u tablicu
        prikaziDodajBiljku.value = false;
      } catch (error) {
        console.error("Greška prilikom dodavanja biljke:", error);
      }
    };

    // Axios poziv za brisanje biljke prema ID-u
    const ukloniBiljku = async (idBiljke) => {
      try {
        // Ovdje je Axios DELETE poziv za brisanje biljke prema ID-u
        await axios.delete(`http://localhost:3000/api/biljke/${idBiljke}`);
        biljke.value = biljke.value.filter(b => b.sifraBiljke !== idBiljke); // Ukloni biljku iz tablice
        prikaziUkloniBiljku.value = false;
      } catch (error) {
        console.error("Greška prilikom brisanja biljke:", error);
      }
    };

    const otvoriDodavanjeBiljke = () => {
      prikaziDodajBiljku.value = true;
    };

    const otvoriUklanjanjeBiljke = () => {
      prikaziUkloniBiljku.value = true;
    };

    onMounted(() => {
      fetchBiljke(); // Poziv za dohvat biljaka kada se stranica učita
    });

    return {
      biljke,
      columns,
      fab,
      prikaziDodajBiljku,
      prikaziUkloniBiljku,
      novaBiljka,
      idBiljkeZaUklanjanje,
      dodajBiljku,
      ukloniBiljku,
      otvoriDodavanjeBiljke,
      otvoriUklanjanjeBiljke,
    };
  }
};
</script>
