<template>
  <q-page padding>
    <q-card flat class="text-h6 q-mb-sm q-py-sm rb-1 fw-600">
      <q-item v-if="tourna" class="q-px-none">
        <q-item-section avatar>
          <q-avatar size="60px">
            <q-icon name="fas fa-trophy" size="45" color="amber-10" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 fw-600"> {{ tourna.name }}</q-item-label>
          <q-item-label class="text-caption">Venue: <span class="fw-600">{{ tourna?.venue ?? 'Not set'
          }}</span></q-item-label>
          <q-item-label class="text-caption">Schedule: <span class="fw-600">{{ toDate(tourna.date) ?? 'Not set'
          }}</span></q-item-label>
          <q-item-label caption class="q-pt-sm">Published: {{ timestamp(tourna.createdAt.toDate()) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-tabs v-model="tab" dense>
        <q-tab label="Labanan" name="Labanan" />
        <q-tab label="Anyo" name="Anyo" />
      </q-tabs>
    </q-card>


    <q-tab-panels v-model="tab" animated class="rb-1" style="min-height: 65vh;">
      <q-tab-panel name="Labanan">
        <LabananTabPanel :tourna="tourna" :matches="labananMatches" />
      </q-tab-panel>
      <q-tab-panel name="Anyo">
        <AnyoTabPanel :tourna="tourna" :competitions="competitions" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { useTournamentStore } from 'src/stores/tournaments';
import { useTeamStore } from 'src/stores/teams';
import { onBeforeMount, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { timestamp, toDate } from 'src/composables/filters'

// COmponents
import LabananTabPanel from 'components/tourna/LabananTabPanel.vue'
import AnyoTabPanel from 'components/tourna/AnyoTabPanel.vue'
import { useMatchStore } from 'src/stores/matches';
import { useCompetitionStore } from 'src/stores/competitions';

const tab = ref('Labanan')
const tournaStore = useTournamentStore()
const matchStore = useMatchStore()
const comStore = useCompetitionStore()
const route = useRoute()
const tourna = computed(() => tournaStore.tournament)
const labananMatches = computed(() => matchStore.getLabananMatches)
const competitions = computed(() => comStore.competitions)

const fetchTourna = async () => {
  await tournaStore.fetchOne(route.params.id)
}
onBeforeMount(() => fetchTourna())


const fetchMatches = async () => {
  await matchStore.fetchAllViaTournaId(route.params.id)
}

const fetchCompetitions = async () => {
  await comStore.fetchAllViaTournaId(route.params.id)
}

const fetchTeams = async () => {
  await useTeamStore().fetchAll()
}

onMounted(async () => {
  await fetchMatches()
  await fetchCompetitions()
  await fetchTeams()
})
</script>
