<template>
  <q-page padding>
    <div class="text-h6 fw-600">
      <q-item dense v-if="tourna" class="q-px-none">
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
    </div>

    <q-tabs v-model="tab" dense class="q-mb-sm">
      <q-tab label="Labanan" name="Labanan" />
      <q-tab label="Anyo" name="Anyo" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="rb-1" style="min-height: 65vh;">
      <q-tab-panel name="Labanan">
        <LabananTabPanel :tourna="tourna" />
      </q-tab-panel>
      <q-tab-panel name="Anyo">
        sdas
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { useTournamentStore } from 'src/stores/tournaments';
import { onBeforeMount, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { timestamp, toDate } from 'src/composables/filters'

// COmponents
import LabananTabPanel from 'components/tourna/LabananTabPanel.vue'

const tab = ref('Labanan')
const tournaStore = useTournamentStore()
const route = useRoute()
const tourna = computed(() => tournaStore.tournament)

const fetchTourna = async () => {
  await tournaStore.fetchOne(route.params.id)
}
onBeforeMount(() => fetchTourna())
</script>
