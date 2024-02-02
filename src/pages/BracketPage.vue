<template>
  <q-page padding>
    <div class="text-center text-h6 q-mb-md text-bold">Matches</div>
    <q-chip class="text-white" label="Division: Heavyweight" color="red-8" />
    <q-chip class="text-white" label="Category: Boys Senior" color="blue-8" />

    <q-card flat class="bg-white q-mt-md">
      <q-list separator>
        <q-item v-for="(match, index) in dummyMatchData" :key="match.matchId">
          <q-item-section>
            <q-item-label overline>Match #{{ index + 1 }}</q-item-label>
            <q-item-label class="text-body1">{{ match.players[0].player1.name }}</q-item-label>
            <q-item-label class="text-body1">{{ match.players[0].player2.name }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn @click="startMatch" color="red-8" label="start match" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <q-card v-if="isMatchDone" flat class="bg-white q-mt-md">
      <q-list separator>
        <q-item v-for="(match, index) in dummyMatchData" :key="match.matchId">
          <q-item-section>
            <q-item-label overline>Match #{{ index + 1 }}</q-item-label>
            <q-item-label class="text-body1 lt ">{{ match.players[0].player1.name }}</q-item-label>
            <q-item-label class="text-body1">{{ match.players[0].player2.name }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn @click="startMatch" color="red-8" label="start match" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { uid, Dialog } from 'quasar';
import { useScoringStore } from 'src/stores/scoring';

const id = uid()
const router = useRouter()
const scoringStore = useScoringStore()
const isMatchDone = scoringStore.isMatchDone

const startMatch = () => {
  Dialog.create({
    title: 'Start Match?',
    message: 'Are you sure youre going to start this match?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    router.push({
      path: '/labananScoringPage'
    })
  })
}

// DUMMY DATA RANI SIR
const dummyMatchData = ref([
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Justin Villacampa',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
        player2: {
          playerId: id,
          name: 'Mikmok Villacampa',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
      },
    ]
  },
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Janbins Paderna',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
        player2: {
          playerId: id,
          name: 'Tiban',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
      },
    ]
  },
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Nami Dog',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
        player2: {
          playerId: id,
          name: 'Sopi Dog',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
      },
    ]
  },
  {
    matchId: id,
    players: [
      {
        player1: {
          playerId: id,
          name: 'Marnie Dog',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
        player2: {
          playerId: id,
          name: 'Chinky Winky',
          gender: "Boys Senior",
          weightClass: 'Heavyweight',
        },
      },
    ]
  }
])


</script>
