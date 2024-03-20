<template>
  <div class="q-gutter-y-md">
    <div v-for="(roundMatches, round) in groupedMatches" :key="round">
      <div class="text-h6 fw-600 q-mb-md text-indigo-10">{{ round }}</div>
      <q-list class="q-gutter-sm">
        <q-item v-for="item in roundMatches" :key="item.id" class="shadow-1 rb-1">
          <q-item-section>
            <q-item-label class="text-subtitle2">Match #: {{ item.no }}</q-item-label>
            <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player1) }">
              <div class="text-body2">
                <div>
                  {{ getFullname(item.player1) }}
                  <q-chip dark v-if="isWinner(item, item.player1)" color="positive" label="Winner" size="sm" />
                </div>

              </div>
              <div class="text-caption text-blue">Team: {{ item.player1.team?.name }}</div>
            </q-item-label>
            <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player2) }">
              <div class="text-body2">{{ getFullname(item.player2) }}
                <q-chip dark v-if="isWinner(item, item.player2)" color="positive" label="Winner" size="sm" />
              </div>
              <div class="text-caption text-red">Team: {{ item.player2.team?.name }}</div>
            </q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn @click="handleDelete(item.id)" round dense flat icon="delete" size="14px" class="fw-600"
              color="negative" />
            <q-btn @click="routeToScoringPage(item.id)" round dense flat icon="open_in_new" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getFullname } from 'src/composables/filters';
import { useMatchStore } from 'src/stores/matches';
import { useRouter } from 'vue-router';

const props = defineProps({ matches: Array })
const router = useRouter()

const handleDelete = (matchId) => {
  useMatchStore().delete(matchId)
}

const routeToScoringPage = async (matchId) => {
  const isNull = await useMatchStore().setMatchToNull()
  if (isNull) router.push(`/labanan-scoring/${matchId}`)
}

const isWinner = (match, player) => {
  if (match.winner) {
    if (match.winner.playerId == player.id) return true;
    else return false
  } else {
    return false
  }
}

const groupedMatches = computed(() => {
  const grouped = {};
  props.matches.forEach(match => {
    if (!grouped[match.round]) {
      grouped[match.round] = [];
    }
    grouped[match.round].push(match);
  });
  return grouped;
});
</script>
