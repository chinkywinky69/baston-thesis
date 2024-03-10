<template>
  <q-page padding>
    <div v-if="tourna" class="bg-white q-py-md q-px-sm">
      <div class="text-center text-h6 text-bold q-pt-md">{{ tourna.name }}</div>
      <div class="text-center text-body1">Tournament Tally</div>
      <div class="q-mt-md row justify-center">
        <!-- LABANAN -->
        <div class="col">
          <div class="text-center text-bold text-subtitle1">LABANAN</div>
          <q-list v-if="matches.length">
            <q-item v-for="item in matches" :key="item.id">
              <q-item-section avatar>
                <q-avatar color="grey-1">
                  <q-icon color="amber" name="fas fa-trophy" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle1 fw-600">
                  <div class="flex">
                    <span> {{ item.division }} </span>
                    <span class="q-ml-xs">({{ item.category == 'Male' ? 'Boys' : 'Girls' }})</span>
                    <q-badge v-if="!item.winner" align="middle" class="q-ml-xs">No Result</q-badge>
                  </div>
                </q-item-label>
                <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player1) }">
                  <div class="fw-600 text-blue">Team: {{ item.player1.team.name }}</div>
                  <div>
                    <div class="text-caption">
                      {{ getFullname(item.player1) }}
                      <q-chip dark v-if="isWinner(item, item.player1)" color="positive" label="Winner" size="sm" />
                    </div>
                  </div>

                </q-item-label>
                <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player2) }">

                  <div class="text-red fw-600">{{ item.player2.team.name }}</div>
                  <div class="text-caption">{{ getFullname(item.player2) }}
                    <q-chip dark v-if="isWinner(item, item.player2)" color="positive" label="Winner" size="sm" />
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator vertical class="q-ma-md" />
        <!-- ANYO -->
        <div class="col">
          <div class="text-center text-bold text-subtitle1 ">ANYO</div>
          <div v-if="coms.length" class="q-gutter-y-md">
            <q-card flat bordered v-for="com in coms" :key="com.id" class="rb-1">
              <q-card-section class="q-pa-xs">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-subtitle2">{{ com.name }} <span>({{ com.category == 'Male' ? 'Boys' :
      'Girls' }})</span></q-item-label>
                  </q-item-section>
                </q-item>

                <q-expansion-item expand-separator icon="groups" header-class="text-body2"
                  :label="`(${com?.teams?.length ?? 0}) Participants`" default-opened>

                  <q-list dense class="q-gutter-sm q-pa-sm">
                    <q-item v-for="team in com?.teams" :key="team.id" class="bg-grey-2 rb-1">
                      <q-item-section avatar>
                        <q-avatar :icon="com.type == 'Team' ? 'fas fa-people-group' : 'fas fa-user'"></q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label class="fw-600">{{ team.name }}</q-item-label>
                        <template v-if="com.type == 'Team'">
                          <q-item-label caption v-for="player in team[com.name][com.category]" :key="player.id">{{
      getFullname(player) }}
                          </q-item-label>
                        </template>
                        <q-item-label caption v-else>{{ getFullname(team[com.name][com.category]) }}</q-item-label>
                        <q-item-label class="row items-center  text-red  fw-600"
                          v-if="com.hasOwnProperty(team.id) && com[team.id].averageScore">
                          <div class="q-mr-sm">Score: </div>
                          <div class="text-subtitle2">{{ com[team.id].averageScore
                            }}</div>
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>

                </q-expansion-item>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="q-my-md text-center">
        <!-- <q-btn label="Print" color="red-8" /> -->
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore } from 'src/stores/matches';
import { useTournamentStore } from 'src/stores/tournaments';
import { useCompetitionStore } from 'src/stores/competitions';
import { getFullname } from 'src/composables/filters';

const route = useRoute()
const matchStore = useMatchStore()
const tournaStore = useTournamentStore()
const comStore = useCompetitionStore()

const tourna = computed(() => tournaStore.tournament)
const coms = computed(() => comStore.competitions)
const matches = computed(() => matchStore.matches)

const fetchTourna = async () => {
  await tournaStore.fetchOne(route.params.id)
}
const fetchMatches = async () => {
  await matchStore.fetchAllViaTournaId(route.params.id)
}
const fetchComs = async () => {
  await comStore.fetchAllViaTournaId(route.params.id)
}

onBeforeMount(async () => {
  await fetchTourna()
  await fetchMatches()
  await fetchComs()
})

const isWinner = (match, player) => {
  if (match.winner) {
    if (match.winner.playerId == player.id) return true;
    else return false
  } else {
    return false
  }
}

const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const anyo = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon", "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]

const dummyMembers = [
  'John Vince Paderna', 'Justin Villacampa', 'Angel Bert Tausa'
]
</script>
