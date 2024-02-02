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
        <q-card-section>
          <div class="row justify-center">
            <div class="text-h1 q-pa-md">{{ playerScore }}</div>
          </div>
        </q-card-section>
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
    <div class="text-center q-mt-md ">
      <q-btn v-if="matchOnGoing" :disable="!allJudgesScored" @click="calculateAverageScore" label="total score"
        color="red-8" />
      <q-btn v-if="matchDone" label="continue" color="blue-8" />
      <q-btn class="q-ml-sm" @click="back" v-if="matchDone" label="back" color="green-8" />

    </div>
  </q-page>
</template>


<script setup>
import { ref, reactive, computed } from 'vue'

const matchDone = ref(false)
const matchOnGoing = ref(true)
const playerScore = ref(0)
const judgeScores = reactive(Array(5).fill(null))
const allJudgesScored = computed(() => {
  return judgeScores.every(score => score !== null && score !== '' && !isNaN(score));
});

const calculateAverageScore = () => {
  matchDone.value = true
  matchOnGoing.value = false
  const validScores = judgeScores.filter(score => score !== null && score >= 1 && score <= 10);
  const sum = validScores.reduce((acc, score) => acc + parseFloat(score), 0);
  const average = validScores.length > 0 ? (sum / validScores.length).toFixed(1) : 0;
  playerScore.value = average;
}

const back = () => {
  matchDone.value = false
  matchOnGoing.value = true
}


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
