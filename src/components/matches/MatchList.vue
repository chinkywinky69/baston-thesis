<template>
  <q-list>
    <q-item v-for="item in matches" :key="item.id">
      <q-item-section avatar>
        <q-avatar icon="fas fa-medal"></q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>Match #: {{ item.no }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
const props = defineProps({ matches: Array })
</script>
