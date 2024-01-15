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
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()


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


const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight'
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
