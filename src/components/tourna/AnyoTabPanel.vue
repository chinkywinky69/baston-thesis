<template>
  <div>
    <div class="flex q-gutter-x-sm">
      <div>
        <div class="text-caption">Weight Division</div>
        <q-select v-model="selectedDivision" :options="weightDivision" outlined dense style="max-width: 200px" />
      </div>
      <div>
        <div class="text-caption">Category</div>
        <q-select v-model="selectedGender" :options="gender" option-label="label" option-value="value" emit-value
          map-options outlined dense style="max-width: 200px" />
      </div>
    </div>

    <div v-if="selectedDivision">
      <div class="text-right">
        <q-btn @click="handleMatch(null)" label="Create Match" color="primary" />
      </div>

      <!-- List of Matches -->
      <MatchList v-if="matches" :matches="filteredMatchesByGender()" />

      <div v-else class="flex flex-center q-mt-lg">
        <div class="text-subtitle1 text-grey-8"><q-icon class="q-mr-sm" name="far fa-face-laugh-beam" size="md" />No
          matches available.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar';

// Components
import MatchList from 'components/matches/MatchList.vue'
import MatchDialog from '../dialog/MatchDialog.vue';

const $q = useQuasar();
const props = defineProps({ tourna: Object, matches: Array })
const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const gender = [
  { label: 'Boys', value: 'Male' },
  { label: 'Girls', value: 'Female' },
]

const selectedGender = ref('Male')
const selectedDivision = ref('Pinweight')

const filteredMatchesByGender = () => {
  return props.matches.filter(item => item.category == selectedGender.value && item.division == selectedDivision.value)
}

const handleMatch = (matchData) => {
  $q.dialog({
    component: MatchDialog,
    componentProps: {
      data: {
        tournaId: props.tourna.id,
        match: matchData,
        matchType: 'Anyo',
        division: selectedDivision.value,
        gender: selectedGender.value
      }
    }
  })
}
</script>
