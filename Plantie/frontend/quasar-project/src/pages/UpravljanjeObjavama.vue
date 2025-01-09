<template>
  <q-page padding>
    <div class="kvadrati-container">
      <div v-for="(biljka, index) in biljke" :key="biljka.id" class="kvadrat">
        <q-card class="my-card">
          <!-- Sekcija s naslovom i opisom -->
          <q-card-section class="no-padding">
            <div class="text-h6">Biljka br. {{ index + 1 }}</div>
            <div class="text-subtitle2">{{ biljka.opis }}</div>
          </q-card-section>

          <!-- Sekcija s q-uploader -->
          <q-card-section class="no-padding">
            <q-uploader
              url="http://localhost:4444/upload"
              :label="'Dodaj sliku za ' + biljka.naziv"
              color="teal"
              flat
              bordered
              style="max-width: 100%;"
            >
              <template v-slot:thumbnail="{ url }">
                <div class="image-wrapper">
                  <img :src="url" class="custom-thumbnail" />
                </div>
              </template>
            </q-uploader>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "ObjavePage",
  data() {
    return {
      biljke: [
        { id: 1, naziv: "Ruza", opis: "Najelegantniji cvijet u ponudi." },
        { id: 2, naziv: "Biljka2", opis: "Opis biljke." },
        { id: 3, naziv: "Biljka3", opis: "Opis biljke." },
        { id: 4, naziv: "Biljka4", opis: "Opis biljke." },
        { id: 5, naziv: "Biljka5", opis: "Opis biljke." },
        { id: 6, naziv: "Biljka6", opis: "Opis biljke." },
      ],
    };
  },
};
</script>

<style scoped>
.kvadrati-container {
  display: flex;
  flex-wrap: wrap; /* Omogućuje prijelaz u novi red */
  gap: 15px; /* Razmak između kvadrata */
  justify-content: space-between; /* Razmak između kvadrata u redu */
}

.kvadrat {
  flex: 1 1 calc(33.333% - 20px); /* Svaki kvadrat zauzima 1/3 širine reda */
  max-width: calc(33.333% - 20px); /* Osigurava maksimalnu širinu 1/3 */
}

.my-card {
  height: 420px; /* Povećana visina kvadrata */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.no-padding {
  padding: 0; /* Uklanjanje padding-a za sekcije */
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px; /* Manja visina okvira za slike */
  overflow: hidden;
  margin-bottom: 5px; /* Smanjenje razmaka između slike i opisa */
}

.custom-thumbnail {
  max-height: 100%; /* Slika se prilagođava visini okvira */
  max-width: 100%; /* Slika se prilagođava širini okvira */
  object-fit: cover; /* Održava proporcije slike */
  display: block; /* Uklanja eventualni razmak ispod slike */
}

.text-h6, .text-subtitle2 {
  margin-top: 0; /* Uklanjanje razmaka između naslova i opisa */
  margin-bottom: 5px; /* Smanjenje razmaka između naslova i opisa */
}
</style>
