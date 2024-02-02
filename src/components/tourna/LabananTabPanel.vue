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
      <MatchList v-if="matchesData" />
      <div v-else class="flex flex-center q-mt-lg">
        <div class="text-subtitle1 text-grey-8"><q-icon class="q-mr-sm" name="far fa-face-laugh-beam" size="md" />No
          matches available.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar';

// Components
import MatchList from 'components/matches/MatchList.vue'
import MatchDialog from '../dialog/MatchDialog.vue';

const $q = useQuasar();
const props = defineProps({ tourna: Object })
const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const gender = [
  { label: 'Boys', value: 'Male' },
  { label: 'Girls', value: 'Female' },
]

const selectedGender = ref('Male')
const selectedDivision = ref('Pinweight')
const matchesData = ref(null)

watch(selectedDivision, (newVal) => {
  matchesData.value = props.tourna?.matches ?? null
})

const handleMatch = (data) => {
  $q.dialog({
    component: MatchDialog,
    componentProps: {
      match: data,
      division: selectedDivision.value,
      gender: selectedGender.value
    }
  })
}
</script>
