<template>
  <q-page padding>
    <!-- Naslov narudžbe s ikonom -->
    <div class="q-mb-md flex items-center">
      <img src="~assets/shopcart2.png" alt="Ikona košarice" class="q-mr-sm" style="width: 32px; height: 32px;" />
      <div class="text-h5">Vaša narudžba</div>
    </div>
    
    <!-- Tablica narudžbi -->
    <q-table
      :rows="narudzbe"
      :columns="columns"
      row-key="ID_Kosarice"
    />

    <!-- FAB gumb za opcije korisnika -->
    <div class="q-pa-md flex flex-center">
      <q-fab
        v-model="fab"
        label="Opcije"
        color="green"
        icon="menu"
        direction="down"
        size="sm"
      >
        <!-- Akcija za dodavanje narudžbe -->
        <q-fab-action color="primary" @click="otvoriDodavanjeNarudzbe" icon="add" label="Dodaj narudžbu" />
      </q-fab>
    </div>

    <!-- Sekcija za dodavanje narudžbe -->
    <q-card v-if="prikaziDodajNarudzbu">
      <q-card-section>
        <div class="text-h6">Dodavanje narudžbe</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="novaNarudzba.nazivBiljke" label="Naziv biljke" />
        <q-input v-model="novaNarudzba.velicinaBiljke" label="Veličina biljke" />
        <q-input v-model="novaNarudzba.kolicina" label="Količina" type="number" />
        <q-input v-model="novaNarudzba.ID_korisnika" label="ID korisnika" />
        <q-input v-model="novaNarudzba.sifraBiljke" label="ID biljke" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Odustani" color="primary" @click="prikaziDodajNarudzbu = false" />
        <q-btn flat label="Dodaj" color="primary" @click="dodajNarudzbu" />
      </q-card-actions>
    </q-card>
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
    const novaNarudzba = ref({ nazivBiljke: "", velicinaBiljke: "", kolicina: 0, ID_korisnika: "", sifraBiljke: "", total: 0 });

    // Funkcija za formatiranje datuma u željeni format
    const formatirajDatum = (datum) => {
      const d = new Date(datum);
      const godina = d.getFullYear();
      const mjesec = String(d.getMonth() + 1).padStart(2, '0');
      const dan = String(d.getDate()).padStart(2, '0');
      const sati = String(d.getHours()).padStart(2, '0');
      const minuti = String(d.getMinutes()).padStart(2, '0');
      const sekunde = String(d.getSeconds()).padStart(2, '0');
      return `${godina}-${mjesec}-${dan} ${sati}:${minuti}:${sekunde}`;
    };

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
        // Send a POST request to add a new order
        const response = await axios.post("http://localhost:3000/api/dodavanjenarudzbe", {
          nazivBiljke: novaNarudzba.value.nazivBiljke,
          velicinaBiljke: novaNarudzba.value.velicinaBiljke,
          kolicina: novaNarudzba.value.kolicina,
          ID_korisnika: novaNarudzba.value.ID_korisnika,
          sifraBiljke: novaNarudzba.value.sifraBiljke,
        });

        // Add the new order to the local list of orders
        narudzbe.value.push({
          ID_Kosarice: response.data.narudzbaId,  // Assuming your backend returns the new ID
          nazivBiljke: novaNarudzba.value.nazivBiljke,
          velicinaBiljke: novaNarudzba.value.velicinaBiljke,
          kolicina: novaNarudzba.value.kolicina,
          ID_korisnika: novaNarudzba.value.ID_korisnika,
          sifraBiljke: novaNarudzba.value.sifraBiljke,
        });

        // Clear the form
        novaNarudzba.value = { nazivBiljke: "", velicinaBiljke: "", kolicina: 0, ID_korisnika: "", sifraBiljke: "" };
        prikaziDodajNarudzbu.value = false;

        // Optionally provide feedback
        alert("Narudžba uspješno dodana!");
      } catch (error) {
        console.error("Greška prilikom dodavanja narudžbe:", error);
        alert("Došlo je do greške prilikom dodavanja narudžbe.");
      }
    };

    const otvoriDodavanjeNarudzbe = () => {
      prikaziDodajNarudzbu.value = true;
    };

    onMounted(() => {
      fetchNarudzbe(); // Dohvati narudžbe kada se stranica učita
    });

    return {
      narudzbe,
      columns,
      fab,
      prikaziDodajNarudzbu,
      novaNarudzba,
      dodajNarudzbu,
      otvoriDodavanjeNarudzbe,
    };
  }
};
</script>

