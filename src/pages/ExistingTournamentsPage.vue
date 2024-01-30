<template>
  <q-page padding>
    <div class="text-center text-bold text-h6 q-mb-md">Existing tournament page</div>
    <div class="row justify-center q-gutter-sm">
      <div v-for="i in 5" :key="i">
        <q-card class="q-mb-sm col col-md-4" style="width: 350px">
          <q-card-section>
            Tournament Name
          </q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn label="Proceed" color="red-8" />
          </q-card-actions>
        </q-card>
      </div>

    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';


</script>
