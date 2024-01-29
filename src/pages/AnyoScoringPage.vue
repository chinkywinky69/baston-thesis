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
    <div class="text-center q-mt-md">
      <q-btn @click="calculateAverageScore" label="total score" color="red-8" />
    </div>
  </q-page>
</template>


<script setup>
import { ref, reactive } from 'vue'


const playerScore = ref(0)
const judgeScores = reactive(Array(5).fill(null))

const calculateAverageScore = () => {
  const validScores = judgeScores.filter(score => score !== null && score >= 1 && score <= 10);
  const sum = validScores.reduce((acc, score) => acc + parseFloat(score), 0);
  const average = validScores.length > 0 ? (sum / validScores.length).toFixed(1) : 0;
  playerScore.value = average;
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
