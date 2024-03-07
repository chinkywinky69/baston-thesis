<template>
  <div>
    <q-table :filter="filter" flat bordered :rows="matches" :columns="columns" :pagination="{ rowsPerPage: 10 }"
      class="rb-1">
      <template v-slot:top>
        <q-input v-model="filter" outlined dense placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td colspan="100%">
            <q-item>
              <q-item-section avatar>
                <q-avatar color="grey-1">
                  <q-icon color="amber" name="fas fa-trophy" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="flex">
                  <div class="text-subtitle2 ">
                    {{ props.row.division }} <span>({{ props.row.category == 'Male' ? 'Boys' : 'Girls' }})</span>
                  </div>
                  <q-space />
                  <div class="text-caption text-grey">{{ date.formatDate(props.row.updatedAt.toDate(), 'MMMM D, YYYY')
                    }}</div>
                </q-item-label>

                <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(props.row, props.row.player1) }">
                  <div>
                    <div>
                      {{ getFullname(props.row.player1) }}
                      <q-chip dark v-if="isWinner(props.row, props.row.player1)" color="positive" label="Winner"
                        size="sm" />
                    </div>

                  </div>
                  <div class="text-caption text-blue">Team: {{ props.row.player1.team?.name }}</div>
                </q-item-label>
                <q-item-label class="q-pa-xs" :class="{ 'bg-blue-1 rb-1': isWinner(props.row, props.row.player2) }">
                  <div>{{ getFullname(props.row.player2) }}
                    <q-chip dark v-if="isWinner(props.row, props.row.player2)" color="positive" label="Winner"
                      size="sm" />
                  </div>
                  <div class="text-caption text-red">Team: {{ props.row.player2.team?.name }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { date } from 'quasar'
import { getFullname } from 'src/composables/filters';
import { useMatchStore } from 'src/stores/matches';

const props = defineProps({ matches: Array })
const filter = ref('')
const columns = [
  { name: 'division', field: 'division' },
  { name: 'category', field: 'category', format: (val) => val == 'Male' ? 'Boys' : 'Girls' },
  { name: 'player1', field: 'player1', format: (val, row) => getFullname(row.player1) },
  { name: 'player2', field: 'player2', format: (val, row) => getFullname(row.player2) },
  { name: 'team1', field: 'team1', format: (val, row) => row.player1.team?.name },
  { name: 'team2', field: 'team1', format: (val, row) => row.player2.team?.name },
]

const handleDelete = (matchId) => {
  useMatchStore().delete(matchId)
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
