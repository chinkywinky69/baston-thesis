<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Create a Tournament</div>
    <div class="flex justify-between q-mt-lg">
      <div class="text-h4">
        Please select the Arnis Rules to follow
      </div>
      <div class="q-mb-md">
        <img width="100px" src="../img/sccarnislogo.png" />
      </div>
    </div>
    <div v-if="tournamentTypes" class="row justify-around q-gutter-md">
      <q-card @click="setTournament('PEKAF')" class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic2.png" alt="">
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-h5">
            PEKAF(Philippine Eskrema Kali Arnis Federation)
          </div>
        </q-card-section>
      </q-card>
      <q-card @click="setTournament('ArPhi')" class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic1.png" alt="">
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-h5">
            ArPhi(Arnis Philippines)
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="tournamentOptions" class="flex flex-center">
      <div class="q-mb-md text-h6 text-bold">Match Type: {{ selectedRule }}</div>
      <div style="width: 100%;">
        <q-select class="q-mb-sm" :options="matchType" outlined bg-color="white" label="Match Type" />
        <q-select class="q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
        <q-input class="q-mb-sm" outlined bg-color="white" label="Number of Teams" type="number" />
      </div>
      <div class="row q-gutter-sm q-mt-md">
        <q-btn @click="back" label="back" color="blue-8" />
        <q-btn to="/selectPlayers" label="continue" color="red-8" />
      </div>
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const tournamentOptions = ref(false)
const tournamentTypes = ref(true)
const selectedRule = ref('')

const setTournament = (rule) => {
  tournamentOptions.value = true
  tournamentTypes.value = false
  selectedRule.value = rule
}

const back = () => {
  tournamentOptions.value = false
  tournamentTypes.value = true
}
const matchType = [
  'Labanan', 'Anyo'
]

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight'
]

const categories = [
  'Girls (Kids)', 'Boys (Kids)', 'Girls Secondary (Junior)', 'Boys Secondary (Junior)', 'Boys Senior', 'Girs Senior'
]
</script>


<style scoped>
.card-type {
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background-color 0.5s ease;

}

.card-type:hover {
  background-color: #d43e3e;
  color: white;


}
</style>
