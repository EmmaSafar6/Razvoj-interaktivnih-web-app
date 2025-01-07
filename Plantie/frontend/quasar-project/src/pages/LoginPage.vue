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
    loginUser() {
      if (this.userId && this.userPassword) {
        alert(`Prijava uspješna za korisnika ID: ${this.userId}`);
      } else {
        alert('Molimo unesite ID korisnika i lozinku.');
      }},
      async loginAdmin() {
  if (this.adminId) {  // Corrected to use adminId
    try {
      // Call your backend API to check admin ID
      const response = await axios.get('http://localhost:3000/Admin', {  // Ensure the endpoint is correct
        params: { adminId: this.adminId }  // Corrected the parameter name
      });

      // Check if admin exists in the database
      if (response.data && response.data[0].id_exists === 1) {
      // Redirect to AdminPage.vue if the admin ID is valid
      this.$router.push({ name: 'AdminPage' });
    } else {
      // Notify the user if the admin ID is invalid (id_exists is 0)
      alert('Neispravan ID admina.');}
    } catch (error) {
      console.error('Error during admin login:', error);
      alert('Došlo je do greške pri prijavi.');
    }
  } else {
    alert('Molimo unesite ID admina.');
  }
}
,
  },
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


