<template>
  <q-page padding>
    <div class="text-h6 text-center text-bold q-mb-md">Choose Anyo Type</div>
    <div class="row justify-center q-gutter-sm">
      <div v-for="a in anyoTypes" :key="a">
        <q-card class="q-mb-sm col col-md-4" style="width: 350px;">
          <q-card-section>
            <div class="text-body1 ">
              {{ a }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions class="row justify-end">
            <q-btn @click="proceed(a)" label="Proceed" color="red-8" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const proceed = (anyoType) => {
  router.push({
    name: "choose-anyo-team",
    params: { anyoType },
  });
}

const anyoTypes = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon", "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]


</script>
