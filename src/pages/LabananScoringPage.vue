<template>
  <q-page padding>
    <div v-if="matchData">
      <q-card class="text-center q-pa-md rb-1 q-mx-auto q-mb-sm" style="max-width: 100vw; width: 720px">
        <div class="text-h4"><span class=" text-bold">{{ matchData.division }}</span> <span>({{
                    matchData?.category == 'Male' ? 'Boys' : 'Girls' }})</span></div>
      </q-card>
      <div class="row justify-center q-gutter-md">
        <q-card class="" style="width: 350px;">
          <q-card-section class="text-center q-pb-none">
            <div class="text-subtitle1 fw-600">{{ getFullname(matchData.player1) }}</div>
          </q-card-section>
          <q-card-section class="q-my-sm bg-blue-8 q-pa-sm">
            <div class="text-white text-h5 fw-900">Match #: {{ matchData?.no }}</div>
          </q-card-section>
          <q-card-section class="row justify-center q-pa-none q-mt-md">
            <q-btn square class="q-px-xl text-body1 " color="blue-8" label="Player 1" />
          </q-card-section>
          <q-card-section>
            <div class="row justify-center">
              <div class="text-h1 q-pa-md">{{ matchData?.player1?.score ?? 0 }}</div>
            </div>
            <q-separator class="q-mb-md" />
            <div class="text-body1 row justify-between">
              <q-chip :label="`Fouls: ${matchData.player1?.foul ?? 0}`" />
              <q-chip :label="`Disarm: ${matchData.player1?.disarm ?? 0}`" />
            </div>
            <div class="row justify-around">
              <q-btn @click="updateStat('foul', 'player1', -1)" :disable="isDisabled('foul', 'player1')"
                icon="fa-solid fa-rotate-left" dense color="blue-8" outline size="sm" />
              <q-btn @click="updateStat('disarm', 'player1', -1)" :disable="isDisabled('disarm', 'player1')"
                icon="fa-solid fa-rotate-left" dense color="blue-8" outline size="sm" />
            </div>
            <q-separator class="q-mt-md" />
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="row justify-center q-gutter-sm">
              <div class="row justify-center q-gutter-sm">
                <button @click="updateStat('foul', 'player1', 1)" class="comic-button2"><q-img width="60px"
                    src="../img/foul.png" /></button>
                <button @click="updateStat('disarm', 'player1', 1)" class="comic-button2"><q-img width="60px"
                    src="../img/disarm.png" /></button>
                <button @click="declareWinner('player1', '1')" style="font-size: 10px;" class="comic-button2">Declare
                  Winner</button>
              </div>
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
                <q-item-label>Points: {{ match.player1.score }}</q-item-label>
                <q-item-label>Fouls: {{ match.player1.foul }}</q-item-label>
                <q-item-label>Disarm: {{ match.player1.disarm }}</q-item-label>

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
import { ref, computed, onBeforeMount, watchEffect } from 'vue'
import { Dialog } from 'quasar';
import { useRouter, useRoute } from 'vue-router';
import { useMatchStore } from 'src/stores/matches';
import { increment, arrayUnion } from 'firebase/firestore';
import { getFullname } from 'src/composables/filters';

const matchStore = useMatchStore()
const router = useRouter()
const matchData = computed(() => matchStore.match)
const route = useRoute()

const isDisabled = (stat, playerno) => {
  if (!matchData.value[playerno].hasOwnProperty(stat) || !matchData.value[playerno][stat]) return true
  else return false
}

const saveNote = async () => {
  const res = await matchStore.update(route.params.matchId, {
    note: note.value
  })
  if (res) noteDialog.value = false
}

const fetchMatch = async () => {
  await matchStore.fetchOne(route.params.matchId)
}

const updateStat = async (stat, playerNo, val) => {
  console.log(stat);
  if (stat == 'disarm') {
    let playerToScore = 'player1'
    let playerToSDisarm = 'player2'
    if (playerNo == 'player1') {
      playerToScore = 'player2'
      playerToSDisarm = 'player1'
    }
    await matchStore.updateStat(route.params.matchId, 'disarm', playerToSDisarm, val)
    await matchStore.updateStat(route.params.matchId, 'score', playerToScore, val)
  }
  await matchStore.updateStat(route.params.matchId, stat, playerNo, val)
}

onBeforeMount(() => fetchMatch())
watchEffect(async () => {
  if (matchData.value && !matchData.value.hasOwnProperty('currentRound')) {
    await matchStore.update(route.params.matchId, {
      currentRound: 1,
    });
  }
});

watchEffect(async () => {
  if (!matchData.value) return;
  if (matchData.value.player1?.wins === 2) {
    displayMatchResult('player1', 1, matchData.value.player1.id)
  } else if (matchData.value.player2?.wins === 2) {
    displayMatchResult('player2', 2, matchData.value.player2.id)
  }
});


const matchDone = () => {
  router.push({ path: `/matches/${matchData.value.tournaId}` })
}

const rounds = ref([]);

const noteDialog = ref(false)
const note = ref('')

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
    displayMatchResult(1);
  } else if (player2RoundsWon.value === 2) {
    matchWinner.value = 'Player 2';
    console.log('Match winner: Player 2');
    displayMatchResult(2);
  }
};

const displayMatchResult = (fieldKey, no, playerId) => {
  Dialog.create({
    title: `Player ${no} Wins!`,
    message: `Player ${no} wins the match, continue to show results`,
    persistent: true
  }).onOk(async () => {
    if (!matchData.value.winner) {
      await matchStore.update(route.params.matchId, {
        winner: {
          no: no,
          label: fieldKey,
          playerId: playerId
        }
      })
    }
    showMatchDetailsDialog.value = true
    resetScoresAndFouls();
  });
};


const playerDisqualified = (player) => {
  Dialog.create({
    title: `Player ${player} is Disqualified!`,
    message: `Proceed to the next round?`,
    persistent: true,
    cancel: true
  }).onOk(() => {
    addRoundData();
    resetScoresAndFouls();
    round.value++;
    if (player === '1') {
      player2RoundsWon.value++;
    } else if (player === '2') {
      player1RoundsWon.value++;
    }
    checkMatchWinner();
  })
}

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

round.value = 1;
player1RoundsWon.value = 0;
player2RoundsWon.value = 0;
matchWinner.value = null;



</script>

