<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Create a Team</div>
    <div style="width: 100%;">
      <q-select class="q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
      <q-select class="q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
    </div>
    <div>
      <q-table title="Users" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-checkbox v-model="selectedPlayers" color="red-8" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const selectedPlayers = ref([])


const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight'
]

const categories = [
  'Girls (Kids)', 'Boys (Kids)', 'Girls Secondary (Junior)', 'Boys Secondary (Junior)', 'Boys Senior', 'Girs Senior'
]

// DUMMY DATA RANI SIR
const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'weightClass', label: 'Weight Class', field: 'weightClass', sortable: true },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
]
const rows = [
  {
    name: 'Alice Smith',
    gender: 'Female',
    weightClass: 'Heavyweight'


  },
  {
    name: 'Bob Johnson',
    gender: 'Male',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Charlie Davis',
    gender: 'Non-Binary',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Diana Taylor',
    gender: 'Female',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Edward Brown',
    gender: 'Male',
    weightClass: 'Heavyweight'

  },
]
</script>
