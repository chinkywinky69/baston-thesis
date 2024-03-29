<template>
  <div>
    <div class="q-mb-sm">
      <q-btn @click="handleCreate" label="Create Competition" color="primary" />
    </div>

    <!-- List of Competitions -->
    <div class="row">
      <div v-for="(com, i) in competitions" :key="i" class="col-12 col-md-4 q-pa-xs">
        <q-card class="column justify-between" style="min-height: 365px;">
          <q-card-section>
            <div class="q-mb-sm">
              <div class="text-subtitle2 text-indigo-9 q-pb-none">{{ com.name }} </div>
              <div>Category: {{ com.category }} </div>
            </div>
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
                <q-item-section side>
                  <q-btn @click="routeTo(com, team)" round flat icon="open_in_new" />
                </q-item-section>
              </q-item>
              <div>
                <q-btn @click="handleTeam(com)" size="12px" label="Add Teams" flat color="primary"
                  class="full-width b-dashed rb-1" />
              </div>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn @click="deleteCom(com)" label="delete" color="red" size="sm" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { getFullname } from 'src/composables/filters';

import { useCompetitionStore } from 'src/stores/competitions';
import { useTournamentStore } from 'src/stores/tournaments';

// Components
import AnyoTeamDialog from 'components/dialog/AnyoTeamDialog.vue';
import CreateCompetitionDialog from 'components/dialog/CreateCompetitionDialog.vue';

const tournaStore = useTournamentStore()
const comStore = useCompetitionStore()

const tourna = computed(() => tournaStore.tournament)
const competitions = computed(() => comStore.competitions)

const selectedCom = ref('')
const $q = useQuasar()
const router = useRouter()

const routeTo = (comp, team) => {
  router.push({
    path: `/anyo-scoring/${comp.id}`,
    query: {
      type: comp.type,
      category: comp.category,
      teamId: team.id
    }
  })
}

const handleTeam = (com) => {
  $q.dialog({
    component: AnyoTeamDialog,
    componentProps: {
      competition: com
    }
  })
}

const handleCreate = (val) => {
  $q.dialog({
    component: CreateCompetitionDialog,
    componentProps: {
      tourna: tourna.value
    }
  })
}

const deleteCom = (com) => {
  useCompetitionStore().delete(com.id)
}
</script>
