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
            <q-input
              outlined
              filled
              v-model="adminPassword"
              label="Lozinka"
              type="password"
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
export default {
  data() {
    return {
      // Podaci za korisnika
      userId: '',
      userPassword: '',
      // Podaci za admina
      adminId: '',
      adminPassword: '',
    };
  },
  methods: {
    loginUser() {
      if (this.userId && this.userPassword) {
        alert(`Prijava uspješna za korisnika ID: ${this.userId}`);
      } else {
        alert('Molimo unesite ID korisnika i lozinku.');
      }
    },
    loginAdmin() {
      if (this.adminId && this.adminPassword) {
        alert(`Prijava uspješna za administratora ID: ${this.adminId}`);
      } else {
        alert('Molimo unesite ID admina i lozinku.');
      }
    },
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


