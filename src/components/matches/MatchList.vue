<template>
  <q-list class="q-gutter-sm">
    <q-item v-for="item in   matches  " :key="item.id" class="shadow-2 rb-1" style="max-width: 100vw; width: 280px;">
      <q-item-section>
        <q-item-label class="text-subtitle2">Match #: {{ item.no }}</q-item-label>
        <q-item-label :class="{ 'bg-grey rb-1': isLoser(item, item.player1) }">
          <div class="text-body2">
            <div>
              {{ getFullname(item.player1) }}
              <q-chip dark v-if="!isLoser(item, item.player1)" color="positive" label="Winner" size="sm" />
            </div>

          </div>
          <div class="text-caption text-blue">Team: {{ item.player1.team.name }}</div>
        </q-item-label>
        <q-item-label :class="{ 'bg-grey rb-1': isLoser(item, item.player2) }">
          <div class="text-body2">{{ getFullname(item.player2) }}
            <q-chip dark v-if="!isLoser(item, item.player2)" color="positive" label="Winner" size="sm" />
          </div>
          <div class="text-caption text-red">Team: {{ item.player2.team.name }}</div>
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-btn @click="handleDelete(item.id)" round dense flat icon="delete" size="14px" class="fw-600"
          color="negative" />
        <q-btn :to="`/labanan-scoring/${item.id}`" round dense flat icon="open_in_new" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { getFullname } from 'src/composables/filters';
import { useMatchStore } from 'src/stores/matches';

const props = defineProps({ matches: Array })

const handleDelete = (matchId) => {
  useMatchStore().delete(matchId)
}

const isLoser = (match, player) => {
  if (match.winner) {
    if (match.winner.playerId == player.id) return false;
    else return true
  } else {
    return false
  }
}
</script>
