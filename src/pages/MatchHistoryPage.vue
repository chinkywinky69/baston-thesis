<template>
  <q-page padding>
    <div class="text-center text-bold text-h6 q-mb-md">History page</div>
    <div class="row">
      <q-card class="col-md-3 col-xs-12 q-ma-xs" v-for="i in 5" :key="i">
        <q-card-section class="row justify-between">
          <div class="text-bold text-body1">Tournament Name</div>
          <div><q-img width="70px" src="../img/arnispic1.png" /></div>
        </q-card-section>
        <q-separator />
        <q-card-actions class="row justify-between">
          <q-btn label="view" color="red-8" />
          <div>1/24/2024</div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>


