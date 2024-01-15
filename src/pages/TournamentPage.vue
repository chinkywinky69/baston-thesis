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
      <q-card @click="labanan(' Full Contact (Bladed Weapon Concept) Padded Sticks Competition')"
        class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic2.png" alt="">
        </q-card-section>
        <div class="text-bold text-h5">
          Full Contact (Bladed Weapon Concept) Padded Sticks Competition
        </div>
      </q-card>
      <q-card @click="anyo('Anyo')" class="text-center card-type" style="width: 500px; height: 350px">
        <q-card-section>
          <img src="../img/arnispic1.png" alt="">
        </q-card-section>
        <div class="text-bold text-h5">
          Likha Anyo Competition
        </div>
      </q-card>
    </div>
    <div v-if="labananOptions" class="flex flex-center">
      <div class="q-mb-md text-h6 text-bold">Match Type: {{ selectedMatchType }}</div>
      <div class="row justify-center q-gutter-sm" style="width: 100%;">
        <div class="column items-center q-gutter-sm">
          <div class="text-bold">Girls Category</div>
          <q-btn to="/assignPlayersLabanan" style="width: 500px" class="text-white" color="grey-9" v-for="g in girlsCat"
            :key="g" :label="g" />
        </div>
        <div class="column items-center q-gutter-sm">
          <div class="text-bold">Boys Category</div>
          <q-btn to="/assignPlayersLabanan" style="width: 500px" class="text-white" color="grey-9" v-for="b in boysCat"
            :key="b" :label="b" />
        </div>
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


const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight'
]

const categories = [
  'Girls (Kids)', 'Boys (Kids)', 'Girls Secondary (Junior)', 'Boys Secondary (Junior)', 'Boys Senior', 'Girs Senior'
]

const girlsCat = [
  'Pinweight(36-40 kgs)', 'Bantamweight(40-44 kgs)', 'Featherweight(44-48 kgs)', 'Extra Lightweight(48-52 kgs)', 'Half Lightweight(52-56 kgs)'
]

const boysCat = [
  'Pinweight(43-47 kgs)', 'Bantamweight(47-51 kgs)', 'Featherweight(51-55 kgs)', 'Extra Lightweight(56-60 kgs)', 'Half Lightweight(60-65 kgs)'
]

const selectedGirlsCat = ref('')
const selectedBoysCat = ref('')
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
