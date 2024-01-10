<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Create a Tournament</div>
    <div class="flex justify-between q-mt-lg">
      <div class="text-h4">
        Select Match Type
      </div>
      <div class="q-mb-md">
        <img width="100px" src="../img/sccarnislogo.png" />
      </div>
    </div>
    <div v-if="tournamentTypes" class="row justify-around q-gutter-md">
      <q-card @click="labanan('Labanan')" class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic2.png" alt="">
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-h5">
            Labanan
          </div>
        </q-card-section>
      </q-card>
      <q-card @click="anyo('Anyo')" class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic1.png" alt="">
        </q-card-section>
        <q-card-section>
          <div class="text-bold text-h5">
            Anyo
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-if="labananOptions" class="flex flex-center">
      <div class="q-mb-md text-h6 text-bold">Match Type: {{ selectedMatchType }}</div>
      <div style="width: 100%;">
        <q-select class="q-mb-sm" :options="matchRules" outlined bg-color="white" label="Rules" />
        <q-select class="q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
      </div>
      <div class="row q-gutter-sm q-mt-md">
        <q-btn @click="back" label="back" color="blue-8" />
        <q-btn to="/selectPlayers" label="continue" color="red-8" />
      </div>
    </div>

    <div v-if="anyoOptions" class="flex flex-center">
      <div class="q-mb-md text-h6 text-bold">Match Type: {{ selectedMatchType }}</div>
      <div style="width: 100%;">
        <q-select class="q-mb-sm" :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="q-mb-sm" :options="categories" outlined bg-color="white" label="Category" />
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

const labananOptions = ref(false)
const anyoOptions = ref(false)
const tournamentTypes = ref(true)
const selectedMatchType = ref('')

const back = () => {
  labananOptions.value = false
  tournamentTypes.value = true
  labananOptions.value = false
  anyoOptions.value = false
}

const labanan = (matchType) => {
  labananOptions.value = true
  anyoOptions.value = false
  selectedMatchType.value = matchType
  tournamentTypes.value = false
}

const anyo = (matchType) => {
  labananOptions.value = false
  anyoOptions.value = true
  selectedMatchType.value = matchType
  tournamentTypes.value = false
}

const matchRules = [
  'Palarong Pambansa Guidelines 2023', 'Continuous Strike'
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
