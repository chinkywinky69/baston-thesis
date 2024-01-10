<template>
  <q-layout class="main" view="hHh lpR fFf">
    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <img class="q-mt-sm" width="120px" src="../img/logo.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>

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
