<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Create a Team</div>
    <div class="q-mb-sm">
      <div class="row justify-center q-gutter-sm">
        <q-btn @click="existingTeamToggle" label="Existing Teams" color="blue-8" />
        <q-btn @click="createTeamToggle" label="Create a Team" color="red-8" />
      </div>
    </div>
    <div v-if="createTeam">
      <div class="row justify-center">
        <!-- SELECT PLAYERS TABLE -->
        <div class="col-12 col-md-6 q-pa-xs">
          <q-table v-model:selected="selectedPlayers" selection="multiple" :rows="rowsSelectPlayer"
            :columns="columnsSelectPlayer" row-key="name">
            <template v-slot:top>
              <div class="text-h6 q-mr-md">Players</div>
              <q-input placeholder="search" outlined dense>
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-select class="q-ml-sm" style="width: 100px;" label="Weight" :options="weightDivision" dense outlined />
              <q-select class="q-ml-sm" style="width: 100px;" label="Gender" :options="gender" dense outlined />
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-radio v-model="selectedPlayers" color="red-8" dense />
              </q-td>
            </template>
          </q-table>
        </div>
        <!-- TEAM VIEW TABLE -->
        <div class="col-12 col-md-6 q-pa-xs">
          <q-table :rows="rowsTeam" :columns="columnsTeam" row-key="name" hide-pagination>
            <template v-slot:top>
              <q-input v-model="teamName" placeholder="Team Name" dense />
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn @click="removePlayerFromTeam(props.row)" icon="close" dense color="red-8" round size="sm"
                  outline />
              </q-td>
            </template>
          </q-table>
          <div v-if="rowsTeam.length > 0" class="row justify-center q-mt-md q-gutter-sm">
            <q-btn @click="handleCreateTeam" :disable="!teamName" label="create" color="red-8" />
            <q-btn @click="clearTable" label="clear" color="blue-8" />
          </div>
        </div>
      </div>
    </div>
    <!-- EXISTING TEAMS -->
    <div v-if="existingTeam">
      <div class="text-h6 text-bold">
        Existing Teams:
      </div>
      <div class="row justify-center q-gutter-sm">
        <q-select class="col q-mb-sm" dense :options="weightDivision" outlined bg-color="white" label="Weight Division" />
        <q-select class="col q-mb-sm" dense :options="categories" outlined bg-color="white" label="Category" />
      </div>
      <div class="row justify-start ">
        <div v-for="(item, i) in 5" :key="i" class="col-6 col-md-3 q-mt-md q-pa-xs">
          <q-card>
            <q-card-section class="row justify-between text-h6 text-bold">
              <div>
                Team Name
              </div>
              <div>
                <img width="100px" src="../img/arnispic1.png" />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn label="View" @click="handleViewTeam" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <q-dialog v-model="viewTeam">
        <q-card style="width: 500px;">
          <q-card-section>
            <div class="text-center text-h6 text-bold">
              Team Pura
            </div>
            <q-separator />
            <div class="row justify-between q-mt-sm">
              <div class="text-bold">
                Bantamweight
              </div>
              <div class="text-bold">
                Boys Senior
              </div>
            </div>
            <q-separator />
          </q-card-section>
          <q-list>
            <q-item clickable v-ripple>
              <q-item-section>Justin Villacampa</q-item-section>
              <q-item-section avatar>
                <q-btn color="red" icon="delete" dense />
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions>
            <q-btn label="Add Member" dense />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { Dialog } from 'quasar';


const router = useRouter();
const handleViewTeam = () => {
  router.push({ name: 'viewTeam' });
}

const selectedPlayers = ref([])
const teamName = ref('')
const createTeam = ref(false)
const existingTeam = ref(true)
const viewTeam = ref(false)

const existingTeamToggle = () => {
  existingTeam.value = true
  createTeam.value = false
}

const createTeamToggle = () => {
  existingTeam.value = false
  createTeam.value = true
}

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const categories = [
  'Girls (Kids)', 'Boys (Kids)', 'Girls Secondary (Junior)', 'Boys Secondary (Junior)', 'Boys Senior', 'Girs Senior'
]

const gender = [
  'Boy', 'Girl'
]

// DUMMY DATA RANI SIR
const columnsSelectPlayer = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'weightClass', label: 'Weight Class', field: 'weightClass', sortable: true },
])

const columnsTeam = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'weightClass', label: 'Weight Class', field: 'weightClass', sortable: true },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
])
const rowsSelectPlayer = ref([
  {
    name: 'Alice Smith',
    gender: 'Female',
    weightClass: 'Heavyweight'


  },
  {
    name: 'Bob Johnson',
    gender: 'Male',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Charlie Davis',
    gender: 'Non-Binary',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Diana Taylor',
    gender: 'Female',
    weightClass: 'Heavyweight'

  },
  {
    name: 'Edward Brown',
    gender: 'Male',
    weightClass: 'Heavyweight'

  },
])

const rowsTeam = ref([

])
//add player to team table
watch(() => selectedPlayers.value, (newSelectedPlayers) => {
  // Clear existing rowsTeam
  rowsTeam.value = [];

  // Add the selected players to rowsTeam
  rowsTeam.value.push(...newSelectedPlayers);

  // Remove the selected players from rowsSelectPlayer
  newSelectedPlayers.forEach((player) => {
    const index = rowsSelectPlayer.value.findIndex((selectPlayer) => selectPlayer === player);
    if (index !== -1) {
      rowsSelectPlayer.value.splice(index, 1);
    }
  });
});

const clearTable = () => {
  // Add the cleared players back to the select players table
  rowsSelectPlayer.value.push(...rowsTeam.value);

  // Clear the team table
  rowsTeam.value = [];

  // Deselect all players
  selectedPlayers.value = [];
};



const removePlayerFromTeam = (player) => {
  // Remove the player from rowsTeam
  const index = rowsTeam.value.findIndex((teamPlayer) => teamPlayer.name === player.name);
  if (index !== -1) {
    rowsTeam.value.splice(index, 1);

    // Deselect the player
    const playerIndex = selectedPlayers.value.findIndex((selectedPlayer) => selectedPlayer.name === player.name);
    if (playerIndex !== -1) {
      selectedPlayers.value.splice(playerIndex, 1);
    }
    // Add the player back to selectPlayersTable
    rowsSelectPlayer.value.unshift(player);
  }
};

const handleCreateTeam = () => {
  Dialog.create({
    title: 'Create Team?',
    message: 'Are you sure you want to create this team?',
    cancel: true,
    persistent: true
  })
    .onOk(() => {
      existingTeamToggle()
    })

}
</script>
