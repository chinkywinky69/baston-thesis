<template>
  <q-page padding>
    <div>
      <div class="text-subtitle1 q-mb-xs">Today's Matches</div>
      <MatchHistoryList :matches="matchesToday" />
    </div>

    <div class="q-mt-md">
      <div class="text-subtitle1 q-mb-xs">History</div>
      <MatchHistoryTable :matches="matchesAgo" />
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue'
import { useMatchStore } from 'stores/matches'

import MatchHistoryList from 'components/history/MatchHistoryList.vue'
import MatchHistoryTable from 'components/history/MatchHistoryTable.vue'

const matchStore = useMatchStore()
const matchesToday = computed(() => matchStore.getMatchesToday)
const matchesAgo = computed(() => matchStore.getMatchesAgo)

const fetchMatches = async () => {
  await matchStore.fetchAll()
}

onBeforeMount(async () => {
  await fetchMatches()
})
</script>
