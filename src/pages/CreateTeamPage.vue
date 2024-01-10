<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Create a Team</div>
    <div class="q-mb-sm">
      <div class="row justify-center q-gutter-sm">
        <q-btn @click="existingTeamToggle" label="Existing Teams" color="blue-8" />
        <q-btn @click="createTeamToggle" label="Create a Team" color="red-8" />
      </div>
    </div>
    <div v-if="createTeam">
      <div class="row justify-center q-gutter-sm">
        <q-select class="col q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="col q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
      </div>
      <div class="row justify-center">
        <div class="col-12 col-md-6 q-pa-xs">
          <q-table :rows="rows" :columns="columns" row-key="name">
            <template v-slot:top>
              <div class="text-h6 q-mr-md">Users</div>
              <q-input placeholder="search" outlined dense>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-radio v-model="selectedPlayers" color="red-8" dense />
              </q-td>
            </template>
          </q-table>
        </div>
        <div class="col-12 col-md-6 q-pa-xs">
          <q-table :rows="rows" :columns="columns" row-key="name">
            <template v-slot:top>
              <q-input placeholder="Team Name" dense />
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn icon="delete" dense color="red-8" />
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
      <div class="text-center q-mt-md">
        <q-btn label="Submit" color="red-8" />
      </div>
    </div>
    <div v-if="existingTeam">
      <div class="text-h6 text-bold">
        Existing Teams:
      </div>
      <div class="row justify-center q-gutter-sm">
        <q-select class="col q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="col q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
      </div>
      <div class="row justify-start ">
        <div v-for="(item, i) in 5" :key="i" class="col-6 col-md-3 q-mt-md q-pa-xs">
          <q-card>
            <q-card-section class="text-h6 text-bold">
              <div>
                Team Name
              </div>

              <div>

              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn class="" label="View" @click="toggleTeam" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <q-dialog v-model="viewTeam">
        <q-card>
          <q-card-section>
            <q-list>
              <q-item>
                Justin Villacampa
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const selectedPlayers = ref([])
const createTeam = ref(false)
const existingTeam = ref(false)
const viewTeam = ref(false)

const toggleTeam = () => {
  viewTeam.value = true
}

const existingTeamToggle = () => {
  existingTeam.value = true
  createTeam.value = false
}

const createTeamToggle = () => {
  existingTeam.value = false
  createTeam.value = true
}

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
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
