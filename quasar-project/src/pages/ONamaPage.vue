<template>
  <q-page padding>
    <q-card dark bordered class="bg-grey-9 my-card">
      <q-card-section>
        <img alt="Slika Biljke" src="Logo.png">
          <div class="text-h3 text-weight-bolder absolute-bottom text-center">
            O nama
          </div>
        <img>
      </q-card-section>
      <q-card-section class="text-h4 text-justify">
        {{ o_nama }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  setup() {
    return {
      o_nama: 'Plantie Online Trg" je online trgovina specijalizirana za prodaju bilja, biljnih suplemenata i sličnih proizvoda. Na njihovoj platformi možete pronaći široku ponudu biljaka, začina, ljekovitih trava i drugih prirodnih proizvoda, koji su dostupni za kupovinu putem interneta. Trgovina se fokusira na kvalitetu, prirodnost i zdravlje svojih korisnika, nudeći proizvode koji podržavaju zdrav način života i održivost.'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
</style> neucitava mi se slika