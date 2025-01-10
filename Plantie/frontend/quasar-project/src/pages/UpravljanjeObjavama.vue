<template>
  <q-page padding>
    <!-- Carousel na vrhu s ponudama -->
    <div class="q-pa-md">
      <q-carousel
        v-model="slide"
        vertical
        transition-prev="slide-down"
        transition-next="slide-up"
        swipeable
        animated
        control-color="white"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="300px"
        class="bg-teal text-white shadow-1 rounded-borders"
      >
        <!-- Ponuda 1 -->
        <q-carousel-slide name="ponuda1" class="column no-wrap flex-center">
          <q-icon name="local_offer" size="56px" />
          <div class="q-mt-md text-center">
            <div class="text-h6">20% popusta na Ruže!</div>
            <div class="text-body1">Iskoristite priliku da uljepšate svoj dom.</div>
          </div>
        </q-carousel-slide>
        <!-- Ponuda 2 -->
        <q-carousel-slide name="ponuda2" class="column no-wrap flex-center">
          <q-icon name="local_florist" size="56px" />
          <div class="q-mt-md text-center">
            <div class="text-h6">Posebna cijena za Kaktuse!</div>
            <div class="text-body1">Savršeni za svaki interijer.</div>
          </div>
        </q-carousel-slide>
        <!-- Ponuda 3 -->
        <q-carousel-slide name="ponuda3" class="column no-wrap flex-center">
          <q-icon name="spa" size="56px" />
          <div class="q-mt-md text-center">
            <div class="text-h6">Popust na Sobne biljke!</div>
            <div class="text-body1">Unesite svježinu u svoj prostor.</div>
          </div>
        </q-carousel-slide>
        <!-- Ponuda 4 -->
        <q-carousel-slide name="ponuda4" class="column no-wrap flex-center">
          <q-icon name="eco" size="56px" />
          <div class="q-mt-md text-center">
            <div class="text-h6">Akcija na Bonsai drveće!</div>
            <div class="text-body1">Dodajte egzotični šarm svom vrtu.</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>

    <!-- Kartice biljaka ispod -->
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
      slide: "ponuda1", // Početni slajd
      biljke: [
        { id: 1, naziv: "Ruza", opis: "Najelegantniji cvijet u ponudi." },
        { id: 2, naziv: "Kaktus", opis: "Savršen za svaki interijer." },
        { id: 3, naziv: "Sobna biljka", opis: "Unesite svježinu u prostor." },
        { id: 4, naziv: "Bonsai", opis: "Egzotični šarm za vaš vrt." },
        { id: 5, naziv: "Orhideja", opis: "Luksuzan dodatak vašem domu." },
        { id: 6, naziv: "Lavanda", opis: "Mirisna biljka za opuštanje." },
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
