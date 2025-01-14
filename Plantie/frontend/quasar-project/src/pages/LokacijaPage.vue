<template>
  <div>
    <!-- Div za Leaflet kartu -->
    <div id="map" style="height:600;"></div>

    <!-- Quasar stranica -->
    <q-page padding>
      <!-- Naslov -->
      <div class="text-h5 text-weight-bolder text-center">
        Lokacija Planite Trgovine
      </div>
      <!-- Kartica s opisom -->
      <q-card>
        <q-card-section class="text-h2 text-justify">
          {{ o_nama }}
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";

export default {
  setup() {
    // Varijabla za kartu
    const initialMap = ref(null);
    // Varijabla za tekst
    const o_nama = ref('Vukovarska ul. 58, 51000, Rijeka');

    // Inicijalizacija Leaflet karte
    onMounted(() => {
      initialMap.value = L.map('map').setView([45.338053, 14.424339], 19);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(initialMap.value);
    });

    return {
      initialMap,
      o_nama
    };
  }
};
</script>

<style>
#map {
  height: 500px;
  position: relative; /* Omogućuje pozicioniranje sadržaja unutar karte */
}
</style>
