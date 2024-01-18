<template>
  <q-page padding>
    <div class="row justify-center q-gutter-md">
      <q-card class="" style="width: 350px;">
        <q-card-section class="text-center q-pa-">
          <div class="text-h6 text-bold">DIVISION</div>
          <div class="text-body1">Girls</div>
        </q-card-section>
        <q-card-section class="q-my-sm bg-blue-8 q-pa-md">
          <div class="text-white text-body1 text-bold">Bout Number #: 420</div>
        </q-card-section>
        <q-card-section class="row justify-center q-pa-none q-mt-md">
          <q-btn square class="q-px-xl text-body1 " color="blue-8" label="Player 1" />
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <div class="text-h1 q-pa-md">{{ player1Score }}</div>
          </div>
          <q-separator class="q-mb-md" />
          <div class="text-body1 row justify-between">
            <q-chip :label="`Fouls: ${player1FoulScore}`" />
            <q-chip :label="`Disarm: ${player1DisarmScore}`" />
          </div>
          <div class="row justify-around">
            <q-btn @click="minus1('foul1')" :disable="player1FoulScore <= 0" icon="fa-solid fa-rotate-left" dense
              color="blue-8" outline size="sm" />
            <q-btn @click="minus1('disarm1')" :disable="player1DisarmScore <= 0" icon="fa-solid fa-rotate-left" dense
              color="blue-8" outline size="sm" />
          </div>
          <q-separator class="q-mt-md" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row justify-center q-gutter-sm">
            <div class="row justify-center q-gutter-sm">
              <button @click="plus1('foul1')" class="comic-button2"><q-img width="60px" src="../img/foul.png" /></button>
              <button @click="plus1('disarm1')" class="comic-button2"><q-img width="60px"
                  src="../img/disarm.png" /></button>
            </div>
          </div>
          <div class="q-mt-sm row justify-center q-gutter-sm">
            <q-btn @click="plus1(1)" class="q-pa-sm" icon="fa-solid fa-plus" color="blue-8" dense outline />
            <q-btn @click="minus1(1)" :disable="player1Score <= 0" class="q-pa-sm" icon="fa-solid fa-minus" color="blue-8"
              dense outline />
          </div>
        </q-card-section>
      </q-card>
      <q-card class="" style="width: 350px;">
        <q-card-section class="text-center q-pa-">
          <div class="text-h6 text-bold">CATEGORY</div>
          <div class="text-body1">Openweight</div>
        </q-card-section>
        <q-card-section class="q-my-sm bg-red-8 q-pa-md">
          <div class="text-white text-body1 text-bold text-end">Round: 1</div>
        </q-card-section>
        <q-card-section class="row justify-center q-pa-none q-mt-md">
          <q-btn square class="q-px-xl text-body1 " color="red-8" label="Player 2" />
        </q-card-section>
        <q-card-section>
          <div class="row justify-center">
            <div class="text-h1 q-pa-md">{{ player2Score }}</div>
          </div>
          <q-separator class="q-mb-md" />
          <div class="text-body1 row justify-between">
            <q-chip :label="`Fouls: ${player2FoulScore}`" />
            <q-chip :label="`Disarm: ${player2DisarmScore}`" />
          </div>
          <div class="row justify-around">
            <q-btn @click="minus1('foul2')" :disable="player2FoulScore <= 0" icon="fa-solid fa-rotate-left" dense
              color="red-8" outline size="sm" />
            <q-btn @click="minus1('disarm2')" :disable="player2DisarmScore <= 0" icon="fa-solid fa-rotate-left" dense
              color="red-8" outline size="sm" />
          </div>
          <q-separator class="q-mt-md" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <div class="row justify-center q-gutter-sm">
            <button @click="plus1('foul2')" class="comic-button"><q-img width="60px" src="../img/foul.png" /></button>
            <button @click="plus1('disarm2')" class="comic-button"><q-img width="60px" src="../img/disarm.png" /></button>
          </div>
          <div class="q-mt-sm row justify-center q-gutter-sm">
            <q-btn @click="plus1(2)" class="q-pa-sm" icon="fa-solid fa-plus" color="red-8" dense outline />
            <q-btn @click="minus1(2)" :disable="player2Score <= 0" class="q-pa-sm" icon="fa-solid fa-minus" color="red-8"
              dense outline />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const player1Score = ref(0)
const player1FoulScore = ref(0)
const player1DisarmScore = ref(0)

const player2Score = ref(0)
const player2FoulScore = ref(0)
const player2DisarmScore = ref(0)


const plus1 = (playerScore) => {
  if (playerScore === 1) {
    player1Score.value += 1;
  }
  else if (playerScore === 2) {
    player2Score.value += 1;
  }
  else if (playerScore === 'foul1') {
    player1FoulScore.value += 1;
  }
  else if (playerScore === 'foul2') {
    player2FoulScore.value += 1;
  }
  else if (playerScore === 'disarm1') {
    player1DisarmScore.value += 1;
  }
  else if (playerScore === 'disarm2') {
    player2DisarmScore.value += 1;
  }
}

const minus1 = (playerScore) => {
  if (playerScore === 1) {
    player1Score.value -= 1;
  }
  else if (playerScore === 2) {
    player2Score.value -= 1;
  }
  else if (playerScore === 'foul1') {
    player1FoulScore.value -= 1;
  }
  else if (playerScore === 'foul2') {
    player2FoulScore.value -= 1;
  }
  else if (playerScore === 'disarm1') {
    player1DisarmScore.value -= 1;
  }
  else if (playerScore === 'disarm2') {
    player2DisarmScore.value -= 1;
  }
}
</script>

<style scoped>
.score {
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  width: 100px;
  border-color: transparent transparent;
  text-align: center;
  font-size: 100px;
}

.comic-button {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #ff5252;
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  transition: all 0.3s ease;
  cursor: pointer;
}

.comic-button:hover {
  background-color: #fff;
  color: #ff5252;
  border: 2px solid #ff5252;
  box-shadow: 5px 5px 0px #ff5252;
}

.comic-button:active {
  background-color: #fcf414;
  box-shadow: none;
  transform: translateY(4px);
}

.comic-button2 {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: #127EB4;
  border: 2px solid #000;
  border-radius: 10px;
  box-shadow: 5px 5px 0px #000;
  transition: all 0.3s ease;
  cursor: pointer;
}

.comic-button2:hover {
  background-color: #fff;
  color: #127EB4;
  border: 2px solid #127EB4;
  box-shadow: 5px 5px 0px #127EB4;
}

.comic-button2:active {
  background-color: #fcf414;
  box-shadow: none;
  transform: translateY(4px);
}
</style>
