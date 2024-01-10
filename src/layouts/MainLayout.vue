<template>
  <q-layout class="main" view="hHh lpR fFf">

    <q-header bordered class="bg-white text-white">
      <q-toolbar>
        <q-btn dense flat round color="black" icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-center">
          <img class="q-mt-sm" width="120px" src="../img/logo.png">
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-img class="text-center" src="../img/gray-bg.png">
        <div class="absolute-center bg-transparent">
          <div class="text-grey-8 text-h6 text-bold">WELCOME ADMIN</div>
        </div>
      </q-img>
      <q-separator class="q-mb-lg" />
      <div class="q-pa-md" style="max-width: 350px">
        <q-list>
          <q-item to="/" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="red-8" name="fa-regular fa-circle-user" />
            </q-item-section>
            <q-item-section>Members Info</q-item-section>
          </q-item>


          <q-item to="/createTeam" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="red-8" name="fa-solid fa-people-group" />
            </q-item-section>
            <q-item-section>Teams</q-item-section>
          </q-item>


          <q-item to="/tournament" clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="red-8" name="fa-solid fa-hand-fist" />
            </q-item-section>
            <q-item-section>Tournament</q-item-section>
          </q-item>


          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon color="red-8" name="fa-solid fa-tv" />
            </q-item-section>
            <q-item-section>Match List</q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-separator class="q-mt-xl" />

      <q-list class="q-pa-md text-center">
        <q-item>
          <q-item-section>
            <q-btn @click="logout" label="Logout" color="red-8" glossy />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section caption>
            BASTON 2023
          </q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
  useAuthStore().logOut()
}
</script>


<style>
.main {
  background-image: url("src/img/gray-bg.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
