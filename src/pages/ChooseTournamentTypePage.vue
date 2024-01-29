<template>
  <q-page padding>
    <div>
      <div class="row justify-around q-gutter-md">
        <q-card @click="chooseMatch('Labanan')" class="text-center card-type col-md-12 col-xs-6"
          style="width: 500px; height: 350px">
          <q-card-section>
            <q-img width="250px" src="../img/arnispic2.png" />
          </q-card-section>
          <div class="text-bold text-h6 q-mt-lg">
            Full Contact (Bladed Weapon Concept) Padded Sticks Competition
          </div>
        </q-card>
        <q-card @click="chooseMatch('Anyo')" class="text-center card-type col-md-12 col-xs-6"
          style="width: 500px; height: 350px">
          <q-card-section>
            <q-img width="200px" src="../img/arnispic1.png" />
          </q-card-section>
          <div class="text-bold text-h6">
            Likha Anyo Competition
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

const selectedMatchType = ref('')


const chooseMatch = (matchType) => {
  selectedMatchType.value = matchType;
  if (matchType === 'Labanan') {
    router.push({
      name: 'labanan',
      params: { matchType: selectedMatchType.value },
      query: { tournaId: route.params.id }
    });
  } else {
    router.push({
      name: 'anyo',
      params: { matchType: selectedMatchType.value },
    });
  }

};



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
