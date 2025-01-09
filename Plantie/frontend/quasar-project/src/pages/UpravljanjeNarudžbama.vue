<template>
  <q-page padding>
    <!-- Tablica narudžbi -->
    <q-table
      :rows="narudzbe"
      :columns="columns"
      row-key="ID_Kosarice"
    />

    <!-- FAB gumb za administrativne opcije -->
    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije admina"
        color="green"
        icon="menu"
        direction="down"
        size="sm"
      >
        <!-- Akcija za dodavanje narudžbe -->
        <q-fab-action color="primary" @click="otvoriDodavanjeNarudzbe" icon="add" label="Dodaj narudžbu" />
        
        <!-- Akcija za uklanjanje narudžbe -->
        <q-fab-action color="negative" @click="otvoriUklanjanjeNarudzbe" icon="delete" label="Ukloni narudžbu" />
      </q-fab>
    </div>

    <!-- Popup za dodavanje narudžbe -->
    <q-dialog v-model="prikaziDodajNarudzbu">
      <q-card>
        <q-card-section>
          <div class="text-h6">Dodavanje narudžbe</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="novaNarudzba.nazivBiljke" label="Naziv biljke" />
          <q-input v-model="novaNarudzba.velicinaBiljke" label="Veličina biljke" />
          <q-input v-model="novaNarudzba.kolicina" label="Količina" type="number" />
          <q-input v-model="novaNarudzba.ID_korisnika" label="ID korisnika" />
          <q-input v-model="novaNarudzba.sifraBiljke" label="ID biljke" />
          <q-input v-model="novaNarudzba.total" label="Ukupni iznos" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziDodajNarudzbu = false" />
          <q-btn flat label="Dodaj" color="primary" @click="dodajNarudzbu" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Popup za uklanjanje narudžbe -->
    <q-dialog v-model="prikaziUkloniNarudzbu">
      <q-card>
        <q-card-section>
          <div class="text-h6">Uklanjanje narudžbe</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="idNarudzbeZaUklanjanje" label="Unesite ID narudžbe" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Odustani" color="primary" @click="prikaziUkloniNarudzbu = false" />
          <q-btn flat label="Ukloni" color="negative" @click="ukloniNarudzbu(idNarudzbeZaUklanjanje)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      { name: 'nazivBiljke', align: 'left', label: 'Naziv biljke', field: 'nazivBiljke' },
      { name: 'velicinaBiljke', align: 'left', label: 'Veličina biljke', field: 'velicinaBiljke' },
      { name: 'kolicina', align: 'left', label: 'Količina', field: 'kolicina' },
      { name: 'ID_korisnika', align: 'left', label: 'ID korisnika', field: 'ID_korisnika' },
      { name: 'sifraBiljke', align: 'left', label: 'ID biljke', field: 'sifraBiljke' },
      { name: 'datumPrimanja', align: 'left', label: 'Datum narudžbe', field: 'datumPrimanja' },
      { name: 'total', align: 'left', label: 'Iznos narudžbe', field: 'total' },
    ];

    const fab = ref(false);
    const prikaziDodajNarudzbu = ref(false);
    const prikaziUkloniNarudzbu = ref(false);
    const novaNarudzba = ref({
      nazivBiljke: '',
      velicinaBiljke: '',
      kolicina: 0,
      ID_korisnika: '',
      sifraBiljke: '',
      total: 0,
    });
    const idNarudzbeZaUklanjanje = ref("");

    // Axios poziv za dohvat svih narudžbi
    const fetchNarudzbe = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/narudzbe");
        narudzbe.value = response.data;
      } catch (error) {
        console.error("Greška prilikom dohvaćanja narudžbi:", error);
      }
    };

    // Axios poziv za dodavanje narudžbe
    const dodajNarudzbu = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/narudzbe", novaNarudzba.value);
        narudzbe.value.push(response.data); // Dodaj novu narudžbu u tablicu
        prikaziDodajNarudzbu.value = false;
      } catch (error) {
        console.error("Greška prilikom dodavanja narudžbe:", error);
      }
    };

    // Axios poziv za brisanje narudžbe prema ID-u
    const ukloniNarudzbu = async (idNarudzbe) => {
      try {
        await axios.delete(`http://localhost:3000/api/narudzbe/${idNarudzbe}`);
        narudzbe.value = narudzbe.value.filter(n => n.ID_Kosarice !== idNarudzbe); // Ukloni narudžbu iz tablice
        prikaziUkloniNarudzbu.value = false;
      } catch (error) {
        console.error("Greška prilikom brisanja narudžbe:", error);
      }
    };

    const otvoriDodavanjeNarudzbe = () => {
      prikaziDodajNarudzbu.value = true;
    };

    const otvoriUklanjanjeNarudzbe = () => {
      prikaziUkloniNarudzbu.value = true;
    };

    onMounted(() => {
      fetchNarudzbe(); // Dohvati narudžbe kada se stranica učita
    });

    return {
      narudzbe,
      columns,
      fab,
      prikaziDodajNarudzbu,
      prikaziUkloniNarudzbu,
      novaNarudzba,
      idNarudzbeZaUklanjanje,
      dodajNarudzbu,
      ukloniNarudzbu,
      otvoriDodavanjeNarudzbe,
      otvoriUklanjanjeNarudzbe,
    };
  }
};
</script>
