<template>
  <q-page padding>
    <div class="text-center text-h6 text-bold">Tournament Tally</div>

    <div class="q-mt-xl bg-white q-pa-md row justify-center">
      <!-- LABANAN -->
      <div class="col">
        <div class="text-center text-bold text-h5">LABANAN</div>
        <div v-for="(w, index) in weightDivision" :key="index">
          <div class="text-h6 ">{{ w }} Boys</div>
          <div v-for="(m, index ) in dummyMembers" :key="index">
            <q-item clickable>
              <q-item-section class="text-body2">{{ m }}</q-item-section>
              <q-item-section side>
                <q-item-label caption>{{ index + 1 }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <q-separator />
        </div>
      </div>
      <q-separator vertical class="q-ma-md" />
      <!-- ANYO -->
      <div class="col">
        <div class="text-center text-bold text-h5 ">ANYO</div>
        <div v-for="(a, index) in anyo" :key="index">
          <div class="text-h6 ">{{ a }} Boys</div>
          <div v-for="(m, index ) in dummyMembers" :key="index">
            <q-item clickable>
              <q-item-section class="text-body2">{{ m }}</q-item-section>
              <q-item-section side>
                <q-item-label caption>{{ index + 1 }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <q-separator />
        </div>
      </div>
    </div>
    <div class="q-my-md text-center">
      <q-btn label="Print" color="red-8" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const weightDivision = [
  'Pinweight', 'Bantamweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const anyo = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon", "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]

const dummyMembers = [
  'John Vince Paderna', 'Justin Villacampa', 'Angel Bert Tausa'
]
</script>
