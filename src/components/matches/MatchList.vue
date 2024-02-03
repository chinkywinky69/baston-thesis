<template>
  <q-list class="q-gutter-sm">
    <q-item v-for="item in matches" :key="item.id" class="shadow-2 rb-1" style="max-width: 100vw; width: 280px;">
      <q-item-section avatar>
        <q-avatar icon="fas fa-medal" color="amber"></q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-subtitle2">Match #: {{ item.no }}</q-item-label>
        <q-item-label class="text-subtitle1">{{ getFullname(item.player1) }}</q-item-label>
        <q-item-label class="text-subtitle1">{{ getFullname(item.player2) }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { getFullname } from 'src/composables/filters';

const props = defineProps({ matches: Array })
</script>
