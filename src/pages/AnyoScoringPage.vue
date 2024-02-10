<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-card v-if="compData && teamData" style="width: 350px;">
        <q-card-section class="text-center">
          <div class="text-h6 text-bold">DIVISION</div>
          <div class="text-body1">{{ compData.category == 'Male' ? 'Boys' : 'Girls' }}</div>
          <div v-if="compData.type == 'Team'">

          </div>
          <div v-else>
            <div class="text-subtitle2 q-mt-sm">{{ getFullname(teamData[compData.name][compData.category]) }}</div>
            <div class="text-caption">Team: {{ teamData.name }}</div>
          </div>
        </q-card-section>
        <q-card-section class="q-my-sm bg-blue-8 q-pa-md">
          <div class="text-white text-body1 text-bold text-center">{{ compData.name }}
          </div>
        </q-card-section>
        <q-chip :label="`Violations: ${violations}`" dense />
        <span v-if="matchDone"><q-btn @click="undoViolation" :disable="violations <= 0" icon="fa-solid fa-rotate-left"
            dense color="blue-8" outline size="sm" /></span>
        <q-card-section>
          <div class="row justify-center">
            <div class="text-h1 q-pa-md">{{ compData[teamData.id]?.averageScore ?? 0 }}</div>
          </div>
        </q-card-section>
        <q-separator v-if="matchDone" />
        <q-card-actions align="center">
          <q-btn v-if="matchDone" @click="subtractHalfPoint" label="add violation" color="red-8" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-mt-sm row justify-center q-gutter-x-xs">
      <q-card v-for="(i, index) in 5" :key="i" style="width:175px">
        <q-card-section>
          <div class="row justify-center">
            <input class="text-h3 judge-input" type="number" v-model="judgeScores[index]" min="1" max="10" step="0.1" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section class="bg-blue-8 text-white">
          <div class="text-body1 text-bold text-center">Judge {{ index + 1 }}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-center q-gutter-sm q-mt-md ">
      <q-btn v-if="matchOnGoing" :disable="!allJudgesScored" @click="calculateAverageScore" label="total score"
        color="red-8" />
      <q-btn v-if="matchDone" label="continue" color="blue-8" />
      <q-btn @click="back" v-if="matchDone" label="back" color="red-8" />
      <q-btn @click="noteDialog = true" label="Add Note" color="green-8" />

    </div>
    <!-- ADD NOTE DIALOG -->
    <q-dialog v-model="noteDialog">
      <q-card style="width: 500px" bordered>
        <q-card-section class="text-center text-bold text-h6">
          Add a Note
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div>
            <q-select v-model="selectedViolations" :model-value="compData[$route.query.teamId].violations ?? []"
              label="Add Violation" :options="violationChoices" outlined dense multiple use-chips />
          </div>
          <q-input v-model="note" type="textarea" outlined />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn @click="noteDialog = false" color="green-8" label="submit" dense />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>


<script setup>
import { ref, reactive, computed, onBeforeMount, watchEffect, watch } from 'vue'
import { useCompetitionStore } from 'src/stores/competitions';
import { useRoute } from 'vue-router';
import { getFullname } from 'src/composables/filters';



const matchDone = ref(false)
const matchOnGoing = ref(true)
const violations = ref(0)
const playerScore = ref(0)
const noteDialog = ref(false)
const note = ref('')
const selectedViolations = ref([])
const judgeScores = reactive(Array(5).fill(null))
const allJudgesScored = computed(() => {
  return judgeScores.every(score => score !== null && score !== '' && !isNaN(score));
});

// backend
const route = useRoute()
const compStore = useCompetitionStore()
const compData = computed(() => compStore.competition)
const teamData = computed(() => {
  return compData.value.teams.find(item => {
    return item.id == route.query.teamId
  })
})

watch(selectedViolations, async (newVal, oldVal) => {
  const oldCount = oldVal?.length ?? 0
  const newCount = newVal?.length ?? 0
  const diff = oldCount - newCount

  const aveKey = `${route.query.teamId}.averageScore`
  const vioKey = `${route.query.teamId}.violations`
  await compStore.updateAnyoScore(route.params.id, aveKey, vioKey, {
    ave: parseFloat((compData.value[route.query.teamId.id]?.averageScore ?? 0) + (diff * (0.5))),
    vio: newVal,
  })
})

const fetchComp = async () => {
  await compStore.fetchOne(route.params.id)
}
const updateComp = async (data) => {
  await compStore.update(route.params.id, data)
}
onBeforeMount(() => fetchComp())


watchEffect(() => {
  if (compData.value && compData.value[route.query.teamId]?.judgeScores) {
    const newScores = compData.value[route.query.teamId].judgeScores
    for (let i = 0; i < Math.min(judgeScores.length, newScores.length); i++) {
      judgeScores[i] = newScores[i]
    }
  }
})

const calculateAverageScore = () => {
  matchDone.value = true;
  matchOnGoing.value = false;
  // Filter out null or invalid scores first
  const validScores = judgeScores.filter(score => score !== null && score >= 1 && score <= 10 && !isNaN(score))
    .map(score => parseFloat(score));
  // Sort scores to easily find and remove the highest and lowest
  validScores.sort((a, b) => a - b);

  // Remove the highest and lowest scores
  if (validScores.length > 2) {
    validScores.pop(); // Remove the highest score
    validScores.shift(); // Remove the lowest score
  }

  // Calculate the average of the remaining scores
  const sum = validScores.reduce((acc, score) => acc + score, 0);
  const average = validScores.length > 0 ? (sum / validScores.length).toFixed(1) : 0;
  playerScore.value = average;
  updateComp({
    [route.query.teamId]: {
      averageScore: parseFloat(average),
      judgeScores: judgeScores
    }
  })
}


const subtractHalfPoint = () => {
  if (playerScore.value > 0) {
    playerScore.value = Math.max(0, (playerScore.value - 0.5).toFixed(1));
  }
  violations.value++
};

const undoViolation = () => {
  if (violations.value > 0) {
    violations.value -= 1; // Decrease violations by 1
    playerScore.value = (parseFloat(playerScore.value) + 0.5).toFixed(1); // Add 0.5 to the playerScore
  }
};

const back = () => {
  matchDone.value = false
  matchOnGoing.value = true
}

const violationChoices = [
  "Unintentionally dropping a weapon",
  "Time limit violation",
  "Line violation",
  "Starting over",
  "Failure to execute the Pugay",
  "Finishing in place different from where the form started"
]


</script>

<style scoped>
.judge-input {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  width: 100px;
  border-color: transparent transparent;
  text-align: center;
}
</style>
