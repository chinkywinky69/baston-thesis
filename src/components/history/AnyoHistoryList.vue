<template>
  <div class="q-gutter-y-xs">
    <div v-if="competitions.length">
      <q-card flat bordered v-for="com in competitions" :key="com.id" class="rb-1">
        <q-card-section class="q-pa-xs">
          <q-item>
            <q-item-section>
              <q-item-label class="text-subtitle2">{{ com.name }} <span>({{ com.category == 'Male' ? 'Boys' :
      'Girls' }})</span></q-item-label>
            </q-item-section>
          </q-item>

          <q-expansion-item expand-separator icon="groups" header-class="text-body2"
            :label="`(${com?.teams?.length ?? 0}) Participants`">

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
                    <div class="text-h6">{{ com[team.id].averageScore
                      }}</div>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
    <q-card flat bordered v-else class="text-center q-pa-md">
      <div class="text-subtitle1 text-grey">No competition data available</div>
    </q-card>
  </div>
</template>

<script setup>
import { getFullname } from 'src/composables/filters';

const props = defineProps({ competitions: Array })
</script>
