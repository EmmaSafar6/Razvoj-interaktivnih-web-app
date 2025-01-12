<template>
  <q-page class="flex flex-center bg-dark-green">
    <div class="q-pa-md text-left" style="width: 100%;">
      <h1 class="text-white text-normal">Login</h1>
      <div class="row q-mt-lg justify-around q-gap-md">
        <!-- Korisnik -->
        <q-card class="bg-light-green text-dark" style="width: 300px">
          <q-card-section>
            <h3 class="text-dark">Prijavite se kao korisnik:</h3>
            <q-input
              outlined
              filled
              v-model="userId"
              label="ID Korisnika"
              class="q-mt-md bg-input-green"
            />
            <q-input
              outlined
              filled
              v-model="userPassword"
              label="Lozinka"
              type="password"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md"
              @click="loginUser"
            />
          </q-card-section>
        </q-card>

        <!-- Admin -->
        <q-card class="bg-light-green text-dark" style="width: 300px">
          <q-card-section>
            <h3 class="text-dark">Prijavite se kao admin:</h3>
            <q-input
              outlined
              filled
              v-model="adminId"
              label="ID Admina"
              class="q-mt-md bg-input-green"
            />
            <q-btn
              color="primary"
              label="Prijava"
              class="q-mt-md"
              @click="loginAdmin"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      userId: '',
      userPassword: '',
      adminId: ''
    };
  },
  methods: {
    // Metoda za prijavu korisnika
    async loginUser() {
      if (this.userId && this.userPassword) {
        console.log('Sending id:', this.userId, 'lozinka:', this.userPassword);  // Dodan console log za praćenje unesenih podataka
        try {
          // API poziv za prijavu korisnika
          const response = await axios.get('http://localhost:3000/api/login', {
            params: {
              id: this.userId,            // 'id' umjesto 'userId'
              lozinka: this.userPassword   // 'lozinka' umjesto 'userPassword'
            }
          });

          // Ako je prijava uspješna, prikazuje se poruka s imenom i prezimenom
          alert(response.data.message);
        } catch (error) {
          // Ako je došlo do greške, prikazuje se odgovarajuća poruka
          console.error('Error during login:', error);  // Ispisuje cijeli error objekt
          alert(error.response ? error.response.data.error : 'Došlo je do greške pri prijavi.');
        }
      } else {
        alert('Molimo unesite ID korisnika i lozinku.');
      }
    },

    // Metoda za prijavu admina
    async loginAdmin() {
      if (this.adminId) {
        try {
          // API poziv za provjeru ID-a admina
          const response = await axios.get('http://localhost:3000/Admin', {
            params: { adminId: this.adminId }
          });

          // Ako je admin ID ispravan, redirektira na AdminPage
          if (response.data && response.data[0].id_exists === 1) {
            this.$router.push({ name: 'AdminPage' });
          } else {
            alert('Ne, ne! Neispravan ID admina.');
          }
        } catch (error) {
          console.error('Error during admin login:', error);  // Ispisuje cijeli error objekt
          alert('Došlo je do greške pri prijavi.');
        }
      } else {
        alert('Molimo unesite ID admina.');
      }
    }
  }
};
</script>

<style>
.bg-dark-green {
  background-color: #2e8b57; /* Tamnija zelena za pozadinu */
}
.bg-light-green {
  background-color: #a9d18e; /* Svjetlija zelena za kartice */
}
.bg-input-green {
  background-color: #eaf4dc; /* Vrlo svijetla zelena za unosna polja */
}
.text-dark {
  color: #2e3d2f; /* Tamna zelena za tekst */
}
.text-white {
  color: white;
}
.text-normal {
  font-weight: normal; /* Nema podebljanja */
}
</style>




