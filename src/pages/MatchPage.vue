<template>
  <q-page padding>
    <div class="text-h6 text-center text-bold q-mb-md">Available Matches</div>
    <div>
      <q-table table-header-class="text-red" :columns="columns" :rows="rows">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Matches</div>
          <q-input placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-select class="q-ml-sm" style="width: 150px;" label="Weight" :options="weightDivision" dense outlined />
          <q-select class="q-ml-sm" style="width: 150px;" label="Gender" :options="gender" dense outlined />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn @click="startMatch" label="Proceed" color="red-8" size="sm" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog } from 'quasar';
import { useRouter } from 'vue-router';

const router = useRouter()

const startMatch = () => {
  Dialog.create({
    title: "Start a new match?",
    message: "Are you sure you're going to start this match?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    router.push({
      path: '/bracketPage'
    })
  })
}

const columns = ref([
  { name: 'weightDivision', required: true, label: 'Weight Division', align: 'left', field: 'weightDivision', sortable: true },
  { name: 'category', align: 'center', label: 'Category', field: 'category', sortable: true },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
])

const rows = ref([
  {
    weightDivision: 'Heavy Weight',
    category: 'Boys Senior'
  },
  {
    weightDivision: 'Pinweight',
    category: 'Girls Senior'
  },
  {
    weightDivision: 'Openweight',
    category: 'Boys Junior'
  },

])

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]
const gender = [
  'Boy', 'Girl'
]
</script>
