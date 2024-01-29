<template>
  <q-page padding>
    <div class="text-center text-bold text-h6">Choose Team</div>
    <div class="row justify-start ">
      <div v-for="i in 5" :key="i" class="col-6 col-md-3 q-mt-md q-pa-xs">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-red-7 text-bold">
              Team Name
            </div>
            <div>
              <img width="100px" src="../img/arnispic1.png" />
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn @click="proceed" label="Proceed" color="blue-8" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const proceed = () => {
  router.push({
    path: "/anyoScoringPage"
  })
}

</script>
