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
        <q-table :rows="rows" :columns="columns" row-key="name" selection="multiple" v-model:selected="selectedPlayers">
          <template v-slot:top>
            <div class="text-h6 q-mr-md">Players</div>
            <q-input placeholder="search" outlined dense>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </div>
      <div class="col col-md-6 col-xs-12 q-pa-xs">
        <div class="text-center text-h6 q-mb-md text-bold">Matches</div>
        <q-card class="bg-white q-mt-md">
          <q-list separator>
            <q-item v-for="(match, index) in dummyMatchData" :key="match.matchId" clickable v-ripple>
              <q-item-section>
                <q-item-label overline>Match #{{ index + 1 }}</q-item-label>
                <q-item-label class="text-body1">{{ match.players[0].player1.name }}</q-item-label>
                <q-item-label class="text-body1">{{ match.players[0].player2.name }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn color="blue-8" label="edit" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <div class="q-mt-md flex q-gutter-sm">
        <q-btn color="blue-8" @click="back" label="back" />
      </div>
      <q-dialog v-model="pairDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              Pair Players?
            </div>
            <div>
              Are you sure you're going to pair and match these players?
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat @click="cancel" label="Cancel" color="primary" v-close-popup />
            <q-btn flat @click="matchPlayers" label="Yes" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { uid } from 'quasar';

const id = uid()

const pairDialog = ref(false)
const selectedPlayers = ref([])

const matchPlayers = () => {
  const newMatch = {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: selectedPlayers.value[0].name,
        },
        player2: {
          playerId: id,
          name: selectedPlayers.value[1].name,
        },
      },
    ]
  }
  dummyMatchData.value.push(newMatch)
  selectedPlayers.value = []
}

// trigger dialog if 2 players are selected.
watchEffect(() => {
  if (selectedPlayers.value.length === 2) {
    pairDialog.value = true
  }
})

const cancel = () => {
  selectedPlayers.value = []
}


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

const dummyMatchData = ref([
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Justin Villacampa'
        },
        player2: {
          playerId: id,
          name: 'John Vince Paderna'
        },
      },
    ],
  },
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Sir Clint'
        },
        player2: {
          playerId: id,
          name: 'Nami Dog'
        },
      },
    ],
  },
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Angel'
        },
        player2: {
          playerId: id,
          name: 'Oreo'
        },
      },
    ],
  },
])


</script>
