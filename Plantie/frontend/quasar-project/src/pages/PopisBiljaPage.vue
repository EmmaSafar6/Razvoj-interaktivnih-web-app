<template>
  <q-page>
    <h1>Popis svih biljaka</h1>
    <q-table
      :rows="books"
      :columns="columns"
      row-key="id"
      flat
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { name: 'title', label: 'Naslov', align: 'left', field: row => row.title },
        { name: 'author', label: 'Autor', align: 'left', field: row => row.author },
        { name: 'year', label: 'Godina', align: 'center', field: row => row.year },
      ],
      books: [
        { id: 1, title: 'Fahrenheit 451', author: 'Ray Bradbury', year: 1953 },
        { id: 2, title: 'Knjiga 2', author: 'Autor 2', year: 2024 },
        { id: 3, title: 'Knjiga 3', author: 'Autor 3', year: 2010 },
      ],
    };
  },
};
</script>
