<template>
  <q-page padding>
    <div class="text-h6 text-center text-bold q-mb-md">Available Matches</div>
    <div>
      <q-table table-header-class="text-red" :columns="columns" :rows="rows">
        <template v-slot:top>
          <q-input v-model="teamName" placeholder="Search" dense outlined />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn @click="removePlayerFromTeam(props.row)" icon="fa-solid fa-right-long" dense color="red-8" size="sm"
              outline />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const columns = ref([
  { name: 'weightDivision', required: true, label: 'Weight Division', align: 'left', field: 'weightDivision', sortable: true },
  { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
])

const rows = ref([
  {
    weightDivision: 'Heavy Weight',
    category: 'Boys Senior'
  },
  {
    weightDivision: 'Pinweight',
    category: 'Girls Senior'
  },
  {
    weightDivision: 'Openweight',
    category: 'Boys Junior'
  },

])

</script>
