<template>
  <div>
    <q-table dense separator="none" :filter="filter" flat :rows="competitions" :columns="columns"
      :pagination="{ rowsPerPage: 10 }" class="rb-1">
      <template v-slot:top>
        <q-input v-model="filter" outlined dense placeholder="Search" style="max-width: 100vw; width: 350px">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" no-hover>
          <q-td colspan="100%" class="q-px-xs">
            <q-card flat bordered class="rb-1">
              <q-item>
                <q-item-section avatar>
                  <q-avatar color="grey-1">
                    <q-icon color="amber" name="fas fa-trophy" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="flex">
                    <div class="text-subtitle2 ">
                      {{ props.row.name }} <span>({{ props.row.category == 'Male' ? 'Boys' :
      'Girls' }})</span>
                    </div>
                    <q-space />
                    <div class="text-caption text-grey">{{ date.formatDate(props.row.updatedAt.toDate(),
      'MMMM D, YYYY')
                      }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-expansion-item expand-separator icon="groups" header-class="text-body2"
                :label="`(${props.row?.teams?.length ?? 0}) Participants`">
                <q-list dense>
                  <q-item v-for="team in props.row?.teams" :key="team.id" class="bg-red-1 rb-1 q-ma-xs">
                    <q-item-section avatar>
                      <q-avatar :icon="props.row.type == 'Team' ? 'fas fa-people-group' : 'fas fa-user'"></q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label class="fw-600">{{ team.name }}</q-item-label>
                      <template v-if="props.row.type == 'Team'">
                        <q-item-label caption v-for="player in team[props.row.name][props.row.category]"
                          :key="player.id">{{
      getFullname(player) }}
                        </q-item-label>
                      </template>
                      <q-item-label caption v-else>{{ getFullname(team[props.row.name][props.row.category])
                        }}</q-item-label>
                      <q-item-label class="row items-center  text-red  fw-600"
                        v-if="props.row.hasOwnProperty(team.id) && props.row[team.id].averageScore">
                        <div class="q-mr-sm">Score: </div>
                        <div class="text-h6">{{ props.row[team.id].averageScore
                          }}</div>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>

            </q-card>
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

const props = defineProps({ competitions: Array })
const filter = ref('')
const columns = [
  { name: 'name', field: 'name' },
  { name: 'category', field: 'category', format: (val) => val == 'Male' ? 'Boys' : 'Girls' },
]
</script>
