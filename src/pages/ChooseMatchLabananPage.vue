<template>
  <q-page padding>
    <div class="text-center text-h6 q-mb-md">Choose A Match</div>
    <q-table title="Match List" :columns="columns" :rows="rows" row-key="name">
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn flat color="primary" icon="fa-solid fa-right-long" @click="onActionClick(props.row)" />
        </q-td>
      </template>
    </q-table>

    <bracket :rounds="rounds">
      <template #player="{ player }">
        {{ player.name }}
      </template>
    </bracket>
  </q-page>
</template>


<script setup>
import Bracket from "vue-tournament-bracket";

const rounds = [
  //Semi finals
  {
    games: [
      {

        player1: { id: "1", name: "Competitor 1", winner: false },
        player2: { id: "4", name: "Competitor 4", winner: true },
      },
      {

        player1: { id: "5", name: "Competitor 5", winner: false },
        player2: { id: "8", name: "Competitor 8", winner: true },
      }
    ]
  },
  //Final
  {
    games: [
      {

        player1: { id: "4", name: "Competitor 4", winner: false },
        player2: { id: "8", name: "Competitor 8", winner: true },
      }
    ]
  }
];

const columns = [
  {
    name: 'weight',
    required: true,
    label: 'Weight Division',
    align: 'left',
    field: 'weight',
    sortable: true
  },
  {
    name: 'category',
    required: true,
    label: 'Category',
    align: 'left',
    field: 'category',
    sortable: true
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: 'status',
    sortable: true
  },
  {
    name: 'action',
    label: 'Action',
    align: 'center',
    sortable: false
  }
]

const rows = [
  {
    weight: 'Pinweight',
    category: 'Girls Senior',
    status: 'To Complete'
  },
  {
    weight: 'Bantamweight',
    category: 'Boys Senior',
    status: 'Done'
  },
  {
    weight: 'Featherweight',
    category: 'Girls Junior',
    status: 'To Complete'
  },
  {
    weight: 'Extralightweight',
    category: 'Boys Junior',
    status: 'Done'
  },
]



</script>
