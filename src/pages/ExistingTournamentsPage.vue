<template>
  <q-page padding>
    <div class="text-center text-bold text-h6 q-mb-md">Existing tournament page</div>
    <div class="row justify-start q-mb-lg">
      <q-btn label="Create Tournament" to="/createTournament" color="blue-8" />
    </div>
    <div class="row">
      <div v-for="i in tournaments" :key="i.id" class="col-12 col-md-4 q-pa-xs">
        <q-card class="rb-1">
          <q-card-section>
            <q-item class="q-px-none">
              <q-item-section avatar>
                <q-avatar size="60px">
                  <q-icon name="fas fa-trophy" size="45" color="amber-10" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label :lines="2" class="text-h6 fw-600" style="min-height: 50px;"> {{ i.name }}</q-item-label>
                <q-item-label class="text-caption">Venue: <span class="fw-600">{{ i?.venue ?? 'Not set'
                    }}</span></q-item-label>
                <q-item-label class="text-caption">Schedule: <span class="fw-600">{{ toDate(i.date) ?? 'Not set'
                    }}</span></q-item-label>
                <q-item-label caption class="q-pt-sm">Published: {{ timestamp(i.createdAt.toDate()) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn label="Matches" color="red-8" :to="`/matches/${i.id}`" size="12px" class="rb-1" />
            <q-btn @click="handleEdit(i)" label="Edit" color="red-8" size="12px" outline class="rb-1" />
            <q-btn :to="`/tally/${i.id}`" label="Tally" color="blue-8" size="12px" outline class="rb-1" />
            <q-space />
            <q-btn @click="handleDeleteTourna(i)" round dense size="sm" icon="delete" color="negative" outline />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useTournamentStore } from 'src/stores/tournaments';
import { computed, onBeforeMount } from 'vue';
import { timestamp, toDate } from 'src/composables/filters'
import { useQuasar } from 'quasar';

import TournamentDialog from 'components/dialog/TournamentDialog.vue'

const tournaments = computed(() => useTournamentStore().tournaments)
const $q = useQuasar()

const fetchTournaments = async () => {
  await useTournamentStore().fetchAll()
}

const handleDeleteTourna = async (tourna) => {
  await useTournamentStore().delete(tourna.id)
}

const handleEdit = (tourna) => {
  $q.dialog({
    component: TournamentDialog,
    componentProps: {
      tourna: tourna
    }
  })
}

onBeforeMount(() => fetchTournaments())
</script>
