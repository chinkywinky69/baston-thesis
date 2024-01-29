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
          <div class="text-white text-body1 text-bold text-end">Round: {{ round }}</div>
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
      <!-- match details -->
      <q-dialog v-model="showMatchDetailsDialog">
        <q-card style="width: 500px" bordered>
          <q-card-section>
            <div class="text-center text-h6 ">Match Details</div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 60vh" class="scroll">
            <q-list bordered separator>
              <div class="text-center text-bold text-h6">Winner: {{ matchWinner }}</div>

              <q-item class="flex column " v-for="(round, index) in rounds" :key="index">
                <q-item-section>
                  <div class="text-bold text-center">Round: {{ index + 1 }}</div>
                </q-item-section>

                <q-item-label class="text-body1 text-bold text-red-8">Player 1</q-item-label>
                <q-item-label>Points: {{ round.player1.points }}</q-item-label>
                <q-item-label>Fouls: {{ round.player1.fouls }}</q-item-label>
                <q-item-label>Disarm: {{ round.player1.disarm }}</q-item-label>

                <q-separator spaced />

                <q-item-label class="text-body1 text-bold text-blue-8">Player 2</q-item-label>
                <q-item-label>Points: {{ round.player2.points }}</q-item-label>
                <q-item-label>Fouls: {{ round.player2.fouls }}</q-item-label>
                <q-item-label>Disarm: {{ round.player2.disarm }}</q-item-label>
              </q-item>
              <q-separator v-if="index < rounds.length - 1" spaced />
            </q-list>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="matchDone" label="continue" color="blue-8" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';
import { useScoringStore } from 'src/stores/scoring';


const router = useRouter()
const scoringStore = useScoringStore()

const matchDone = () => {
  router.push({ path: '/bracketPage' })
  scoringStore.isMatchDone = true
}

const rounds = ref([]);


const player1Score = ref(0)
const player1FoulScore = ref(0)
const player1DisarmScore = ref(0)
const round = ref(1);
const player2Score = ref(0)
const player2FoulScore = ref(0)
const player2DisarmScore = ref(0)
const player1RoundsWon = ref(0);
const player2RoundsWon = ref(0);
const matchWinner = ref(null);
const showMatchDetailsDialog = ref(false)

const addRoundData = () => {
  rounds.value.push({
    roundNumber: 1,
    player1: {
      points: player1Score.value,
      fouls: player1FoulScore.value,
      disarm: player1DisarmScore.value,
    },
    player2: {
      points: player2Score.value,
      fouls: player2FoulScore.value,
      disarm: player2DisarmScore.value,
    }
  });
};

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
    player2Score.value += 1;

  }
  else if (playerScore === 'disarm2') {
    player2DisarmScore.value += 1;
    player1Score.value += 1;
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
    player2Score.value -= 1;

  }
  else if (playerScore === 'disarm2') {
    player2DisarmScore.value -= 1;
    player2Score.value += 1;

  }
}

const resetScoresAndFouls = () => {
  player1Score.value = 0;
  player2Score.value = 0;
  player1FoulScore.value = 0;
  player2FoulScore.value = 0;
  player1DisarmScore.value = 0;
  player2DisarmScore.value = 0;

};

const checkMatchWinner = () => {
  if (player1RoundsWon.value === 2) {
    matchWinner.value = 'Player 1';
    console.log('Match winner: Player 1');
    addRoundData()
    displayMatchResult(1);
  } else if (player2RoundsWon.value === 2) {
    matchWinner.value = 'Player 2';
    console.log('Match winner: Player 2');
    addRoundData()
    displayMatchResult(2);
  }
};

const displayMatchResult = (winnerPlayerNumber) => {
  Dialog.create({
    title: `Player ${winnerPlayerNumber} Wins!`,
    message: `Player ${winnerPlayerNumber} wins the match, continue to show results`,
    persistent: true
  }).onOk(() => {
    showMatchDetailsDialog.value = true
    resetScoresAndFouls();
  });
};

const checkRoundWinner = () => {
  if (player1FoulScore.value === 3) {
    player2RoundsWon.value++;
    checkMatchWinner();
    resetScoresAndFouls();
  } else if (player2FoulScore.value === 3) {
    player1RoundsWon.value++;
    checkMatchWinner();
    resetScoresAndFouls();
  } else if (player1Score.value === 5) {
    player1RoundsWon.value++;
    // Check if Player 1 has won two rounds and won the match
    if (player1RoundsWon.value === 2) {
      checkMatchWinner(); // This will display the match result if Player 1 has won
    } else {
      // If Player 1 hasn't won the match yet, ask to proceed to the next round
      Dialog.create({
        title: 'Player 1 Won!',
        message: 'Player 1 Won this round, proceed to next round?',
        ok: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        round.value += 1;
        resetScoresAndFouls();
        addRoundData()
      }).onCancel(() => {
        resetScoresAndFouls()
        player1RoundsWon.value = -1
      })
    }
  } else if (player2Score.value === 5) {
    player2RoundsWon.value++;
    // Check if Player 1 has won two rounds and won the match
    if (player2RoundsWon.value === 2) {
      checkMatchWinner(); // This will display the match result if Player 1 has won
    } else {
      // If Player 1 hasn't won the match yet, ask to proceed to the next round
      Dialog.create({
        title: 'Player 2 Won!',
        message: 'Player 2 Won this round, proceed to next round?',
        ok: true,
        cancel: true,
        persistent: true
      }).onOk(() => {
        round.value += 1;
        resetScoresAndFouls();
        addRoundData()
      }).onCancel(() => {
        resetScoresAndFouls()
        player2RoundsWon.value = -1
      })
    }
  } else if (player1RoundsWon.value === 2 && player2RoundsWon.value === 1 && round.value === 3) {
    resetScoresAndFouls();

  } else if (player1RoundsWon.value === 1 && player2RoundsWon.value === 2 && round.value === 3) {
    resetScoresAndFouls();

  }
};

// Initial setup or after a match is complete
round.value = 1;
player1RoundsWon.value = 0;
player2RoundsWon.value = 0;
matchWinner.value = null;

watch([player1Score, player2Score, player1FoulScore, player2FoulScore], checkRoundWinner);


</script>

