<template>
  <q-page padding>
    <div v-if="tourna" class="bg-white q-py-md q-px-sm">
      <div class="text-center text-h6 text-bold q-pt-md">{{ tourna.name }}</div>
      <div class="text-center text-body1">Tournament Tally</div>
      <div class="q-mt-md row justify-center">
        <!-- LABANAN -->
        <div class="col">
          <div class="row justify-between">
            <div class="col text-center text-bold text-subtitle1">LABANAN</div>
            <q-select v-model="seltectedCategory" class="col" :options="category" dense outlined label="Category" />
          </div>
          <q-list v-if="matches.length" class="q-mt-sm q-mx-sm">
            <div v-for="item in filteredMatches" :key="item.id" class="q-my-md">
              <div>
                <div class="flex text-subtitle1 fw-600">
                  <span> {{ item.division }} </span>
                  <span class="q-ml-xs">({{ item.category == 'Male' ? 'Boys' : 'Girls' }})</span>
                </div>
                <div class="text-caption">Finished: {{ date.formatDate(item.updatedAt.toDate(), 'MMM D, YYYY | h:mm a')
                }}</div>
              </div>
              <template v-if="item.round == 'Finals' && item.winner">
                <q-item dense>
                  <q-item-section avatar>
                    <span class="text-bold text-h6">1st</span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div class="fw-600 text-subtitle2 text-blue">Team: {{ item[`player${item.winner.no}`].team.name }}
                      </div>
                      <div>
                        <div>
                          {{ getFullname(item[`player${item.winner.no}`]) }}
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item dense>
                  <q-item-section avatar>
                    <span class="text-bold text-h6">2nd</span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div class="fw-600 text-subtitle2 text-blue">Team: {{ item[`player${item.winner.no == 1 ? 2 :
                        1}`].team.name }}
                      </div>
                      <div>
                        <div>
                          {{ getFullname(item[`player${item.winner.no == 1 ? 2 :
                            1}`]) }}
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-if="item.round == 'Fight For 3rd' && item.winner">
                <q-item dense>
                  <q-item-section avatar>
                    <span class="text-bold text-h6">3rd</span>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <div class="fw-600 text-subtitle2 text-blue">Team: {{ item[`player${item.winner.no}`].team.name }}
                      </div>
                      <div>
                        <div>
                          {{ getFullname(item[`player${item.winner.no}`]) }}
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </div>
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
import { date } from 'quasar';
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

const filteredMatches = computed(() => {
  return matches.value.filter(item => {
    return (item.round === 'Finals' || item.round === 'Fight For 3rd') && item.category === seltectedCategory.value;
  }).sort((a, b) => {
    return a.division.localeCompare(b.division);
  });
});

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

const category = ['Male', 'Female'];
const seltectedCategory = ref('Male')


</script>
