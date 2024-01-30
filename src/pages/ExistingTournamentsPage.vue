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
            {{ i.name }}
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn label="Matches" color="red-8" size="12px" class="rb-1" />
            <q-btn label="Edit" color="red-8" size="12px" outline class="rb-1" />
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

const tournaments = computed(() => useTournamentStore().tournaments)

const fetchTournaments = async () => {
  await useTournamentStore().fetchAll()
}

const handleDeleteTourna = async (tourna) => {
  await useTournamentStore().delete(tourna.id)
}

onBeforeMount(() => fetchTournaments())
</script>
