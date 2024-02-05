<template>
  <q-list class="q-gutter-sm">
    <q-item v-for="item in matches" :key="item.id" class="shadow-2 rb-1" style="max-width: 100vw; width: 280px;">
      <q-item-section>
        <q-item-label class="text-subtitle2">Match #: {{ item.no }}</q-item-label>
        <q-item-label>
          <div class="text-body2">{{ getFullname(item.player1) }}</div>
          <div class="text-caption text-blue">{{ item.player1.team.name }}</div>
        </q-item-label>
        <q-item-label>
          <div class="text-body2">{{ getFullname(item.player2) }}</div>
          <div class="text-caption text-red">{{ item.player2.team.name }}</div>
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <q-btn @click="handleDelete(item.id)" round dense flat icon="delete" size="14px" class="fw-600"
          color="negative" />
        <q-btn :to="`/labanan-scoring/${item.id}`" round dense flat icon="open_in_new" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { getFullname } from 'src/composables/filters';
import { useMatchStore } from 'src/stores/matches';

const props = defineProps({ matches: Array })

const handleDelete = (matchId) => {
  useMatchStore().delete(matchId)
}
</script>
