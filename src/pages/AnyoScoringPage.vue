<template>
  <q-page padding>
    <div class="flex flex-center">
      <q-card style="width: 350px;">
        <q-card-section class="text-center q-pa-">
          <div class="text-h6 text-bold">DIVISION</div>
          <div class="text-body1">Girls</div>
          <div>Player Name</div>
        </q-card-section>
        <q-card-section class="q-my-sm bg-blue-8 q-pa-md">
          <div class="text-white text-body1 text-bold text-center">Individual Likha Single Weapon
          </div>
        </q-card-section>
        <q-chip v-if="matchDone" :label="`Violations: ${violations}`" dense />
        <span v-if="matchDone"><q-btn @click="undoViolation" :disable="violations <= 0" icon="fa-solid fa-rotate-left"
            dense color="blue-8" outline size="sm" /></span>
        <q-card-section>
          <div class="row justify-center">
            <div class="text-h1 q-pa-md">{{ playerScore }}</div>
          </div>
        </q-card-section>
        <q-separator v-if="matchDone" />
        <q-card-actions align="center">
          <q-btn v-if="matchDone" @click="subtractHalfPoint" label="add violation" color="red-8" />
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-mt-md row justify-center q-gutter-sm">
      <q-card v-for="(i, index) in 5" :key="i" style="width:200px">
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
            <q-select v-model="selectedViolations" label="Add Violation" :options="violationChoices" outlined dense
              multiple use-chips />
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
import { ref, reactive, computed } from 'vue'

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
