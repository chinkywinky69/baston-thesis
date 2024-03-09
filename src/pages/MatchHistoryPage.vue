<template>
  <q-page padding>
    <q-tabs v-model="tab" class="q-mb-md">
      <q-tab name="labanan" label="Labanan" />
      <q-tab name="anyo" label="Anyo" />
    </q-tabs>

    <q-tab-panels v-model="tab" class="rb-1">
      <q-tab-panel name="labanan">
        <div>
          <div>
            <div class="text-subtitle1 q-mb-sm">Recent Matches</div>
            <MatchHistoryList :matches="matchesToday" />
          </div>

          <div class="q-mt-md">
            <div class="text-subtitle1 q-mb-xs">History</div>
            <MatchHistoryTable :matches="matchesAgo" />
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="anyo">
        <div>
          <div class="text-subtitle1 q-mb-sm">Recent Competitions</div>
          <AnyoHistoryList :competitions="comToday" />
        </div>

        <div class="q-mt-md">
          <div class="text-subtitle1 q-mb-xs">History</div>
          <AnyoHistoryTable :competitions="comAgo" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { computed, ref, onBeforeMount } from 'vue'
import { useMatchStore } from 'stores/matches'
import { useCompetitionStore } from 'stores/competitions'

import AnyoHistoryList from 'components/history/AnyoHistoryList.vue'
import AnyoHistoryTable from 'components/history/AnyoHistoryTable.vue'
import MatchHistoryList from 'components/history/MatchHistoryList.vue'
import MatchHistoryTable from 'components/history/MatchHistoryTable.vue'

const tab = ref('labanan')
const matchStore = useMatchStore()
const comStore = useCompetitionStore()
const matchesToday = computed(() => matchStore.getMatchesToday)
const matchesAgo = computed(() => matchStore.getMatchesAgo)
const comToday = computed(() => comStore.getCompetitionsToday)
const comAgo = computed(() => comStore.getCompetitionsAgo)

const fetchMatches = async () => {
  await matchStore.fetchAll()
}

const fetchCompetitions = async () => {
  await comStore.fetchAll()
}

onBeforeMount(async () => {
  await fetchMatches()
  await fetchCompetitions()
})
</script>
