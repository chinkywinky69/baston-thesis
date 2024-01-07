<template>
  <q-page padding>
    <div class="text-center text-h6 text-bold q-mb-md">
      <div>Select Players</div>
    </div>
    <div class="q-mb-md" style="width:350px">
      <q-input label="search" filled bg-color="white" outlined dense />
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
    <div class="text-center q-mt-md">
      <q-btn label="Continue" color="red-8" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const selectedPlayers = ref([])

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
