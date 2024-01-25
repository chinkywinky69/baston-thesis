<template>
  <q-page padding>
    <div class="text-center q-mb-xl text-h6 text-bold">Create a Tournament</div>
    <div v-if="submitTournamentName" class="flex flex-center">
      <q-card style="width: 500px;">
        <q-card-section class="column q-gutter-sm">
          <div>
            <div class="">Tournament Name</div>
            <q-input v-model="tournamentForm.name" outlined dense />
          </div>
          <div>
            <div class="">Tournament Venue </div>
            <q-input v-model="tournamentForm.venue" outlined dense />
          </div>
          <div>
            <div class="">Tournament Date </div>
            <q-input v-model="tournamentForm.date" outlined dense type="date" />
          </div>
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn :disable="!tournamentForm.name" @click="handleSubmitTournamentName" label="submit" color="red-8" />
        </q-card-actions>
      </q-card>
    </div>
    <div v-if="pickTournamentType">
      <div class="row justify-around q-gutter-md">
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
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const submitTournamentName = ref(true)
const pickTournamentType = ref(false)

const tournamentForm = reactive({
  name: '',
  venue: '',
  date: ''
})

const handleSubmitTournamentName = () => {
  submitTournamentName.value = false
  pickTournamentType.value = true
}

const selectedMatchType = ref('')


const labanan = (matchType) => {
  selectedMatchType.value = matchType;
  router.push({
    name: 'chooseMatch',
    params: { matchType: selectedMatchType.value },
  });
};


const anyo = (matchType) => {
  labananOptions.value = false
  anyoOptions.value = true
  selectedMatchType.value = matchType
  tournamentTypes.value = false
}
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
