<template>
  <q-page padding>
    <div v-if="pickWeight">
      <div class="text-center text-h6 q-mb-md text-bold">Choose Weight Division</div>
      <div class="row justify-center q-gutter-sm">
        <div v-for="w in weightDivision" :key="w">
          <q-card class="q-mb-sm col col-md-4" style="width: 350px;">
            <q-card-section>
              <div class="text-h6 ">
                {{ w }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="row justify-end">
              <q-btn @click="proceed" label="Proceed" color="red-8" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row justify-center" v-if="pickPlayers">
      <div class="col col-md-12 row justify-center q-gutter-sm">
        <div>
          <q-select v-model="selectedGender" style="width: 150px;" :options="gender" placeholder="Category" outlined
            bg-color="white" dense />
        </div>
        <div>
          <q-select v-model="selectedCategory" style="width: 150px;" :options="categories" placeholder="Category" outlined
            bg-color="white" dense />
        </div>
      </div>
      <div class="col col-md-6 col-xs-12 q-pa-xs">
        <div class="text-center text-h6 q-mb-md text-bold">Choose Players</div>
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:top>
            <div class="text-h6 q-mr-md">Players</div>
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
      <div class="col col-md-6 col-xs-12 q-pa-xs">
        <div class="text-center text-h6 q-mb-md text-bold">Matches</div>
        <q-card class="bg-white q-mt-md">
          <q-list separator>
            <q-item v-for="match in dummyMatchData" :key="match.matchNumber" clickable v-ripple>
              <q-item-section>
                <q-item-label overline>Match #{{ match.matchNumber }}</q-item-label>
                <q-item-label class="text-body1">{{ match.players[0].player1 }}</q-item-label>
                <q-item-label class="text-body1">{{ match.players[0].player2 }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn color="blue-8" label="edit" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="q-mt-md">
        <q-btn color="blue-8" @click="back" label="back" />
      </div>
      <q-dialog>
        <div>
          Are you sure you're going to match these players?

        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const selectedGender = ref('Boys')
const selectedCategory = ref('Kids')

const pickPlayers = ref(false)
const pickWeight = ref(true)

const proceed = () => {
  pickPlayers.value = true
  pickWeight.value = false
}

const back = () => {
  pickPlayers.value = false
  pickWeight.value = true
}

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const gender = [
  'Boys', 'Girls'
]

const categories = [
  'Kids', 'Junior', 'Senior'
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

const dummyMatchData = [
  {
    matchNumber: 1,
    players: [
      {
        player1: 'Justin Villacampa',
        player2: 'John Vince Paderna',
      },
    ],
  },
  {
    matchNumber: 2,
    players: [
      {
        player1: 'Sir Clint',
        player2: 'Nami',
      },
    ],
  },
  {
    matchNumber: 3,
    players: [
      {
        player1: 'Angel',
        player2: 'Oreo',
      },
    ],
  },
];


</script>
