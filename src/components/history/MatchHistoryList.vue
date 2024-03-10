<template>
  <q-card flat bordered class="rb-1">
    <q-list v-if="matches.length">

      <q-item v-for="item in matches" :key="item.id">
        <q-item-section avatar>
          <q-avatar color="grey-1">
            <q-icon color="amber" name="fas fa-trophy" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-subtitle2">{{ item.division }} <span>({{ item.category == 'Male' ? 'Boys' : 'Girls'
              }})</span></q-item-label>
          <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player1) }">
            <div>
              <div>
                {{ getFullname(item.player1) }}
                <q-chip dark v-if="isWinner(item, item.player1)" color="positive" label="Winner" size="sm" />
              </div>
            </div>
            <div class="text-caption text-blue">Team: {{ item.player1.team.name }}</div>
          </q-item-label>
          <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(item, item.player2) }">
            <div>{{ getFullname(item.player2) }}
              <q-chip dark v-if="isWinner(item, item.player2)" color="positive" label="Winner" size="sm" />
            </div>
            <div class="text-caption text-red">Team: {{ item.player2.team.name }}</div>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else class="text-center q-pa-md">
      <div class="text-subtitle1 text-grey">No matches data available</div>
    </div>
  </q-card>
</template>

<script setup>
import { getFullname } from 'src/composables/filters';

const props = defineProps({ matches: Array })

const isWinner = (match, player) => {
  if (match.winner) {
    if (match.winner.playerId == player.id) return true;
    else return false
  } else {
    return false
  }
}

</script>
