<template>
  <q-layout class="main" view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <img class="q-mt-sm q-ml-xl" width="120px" src="../img/logo.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- footer -->
    <div class="bg-white text-black row justify-center">
      <q-item to="/auth" class=" q-pa-none">
        <q-item-section>
          <q-avatar>
            <img src="../img/bastonlogo.png">
          </q-avatar>
        </q-item-section>
      </q-item>
      <div class="text-caption text-bold q-my-md">Baston 2024 &#169;</div>
    </div>
  </q-layout>
</template>

<script setup>


</script>


<style>
.main {
  background-image: url("src/img/gray-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
