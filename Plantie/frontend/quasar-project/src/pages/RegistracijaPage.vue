<template>
  <q-page>
    <h1>Registracija</h1>
    
    <q-input filled v-model="userId" label="ID" />
    <q-input filled v-model="firstName" label="Ime" />
    <q-input filled v-model="lastName" label="Prezime" />
    <q-input filled v-model="username" label="Korisničko ime" />
    <q-input filled v-model="password" label="Lozinka" type="password" />

    <q-btn color="primary" label="Potvrdi" @click="registerUser" />
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',      // ID korisnika
      firstName: '',   // Ime
      lastName: '',    // Prezime
      username: '',    // Korisničko ime
      password: '',    // Lozinka
    };
  },
  methods: {
    async registerUser() {
      // Provjera da li su svi podaci uneseni
      if (this.userId && this.firstName && this.lastName && this.username && this.password) {
        try {
          const response = await axios.post('http://localhost:3000/api/registracija', {
            id: this.userId,
            ime: this.firstName,
            prezime: this.lastName,
            korime: this.username,
            lozinka: this.password
          });

          // Ako je registracija uspješna
          alert(response.data.message);
          // Ovdje možete preusmjeriti korisnika na drugu stranicu nakon uspješne registracije
        } catch (error) {
          alert(error.response.data.error || 'Došlo je do greške pri registraciji.');
          console.error(error);
        }
      } else {
        alert('Molimo ispunite sva polja.');
      }
    },
  },
};
</script>


