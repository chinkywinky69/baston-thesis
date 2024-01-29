<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Teams Page</div>
    <div class="q-mb-sm">
      <q-tabs v-model="tab" c>
        <q-tab name="existing" label="EXISTING TEAMS" />
        <q-tab name="create" label="CREATE TEAMS" />
      </q-tabs>
    </div>

    <q-tab-panels v-model="tab" animated class="rb-1">
      <q-tab-panel name="create">
        <div class="row justify-center">
          <!-- SELECT PLAYERS TABLE -->
          <div class="col-12 col-md-6 q-pa-xs">
            <q-table @row-click="(evt, row, index) => handleSelect(row)" :loading="isLoadingMembersTable" flat bordered
              :filter="filter" :rows="approvedMembers" :columns="columnsSelectPlayer" row-key="name" class="rb-1">
              <template v-slot:top>
                <div>
                  <div class="text-subtitle1 text-bold">Players</div>
                  <div class="full-width">
                    <q-input placeholder="Search" outlined dense>
                      <template v-slot:prepend>
                        <q-icon name="search" />
                      </template>
                    </q-input>
                  </div>
                </div>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props" @click="handleSelect(props.row)"
                  :class="{ 'bg-red text-bold text-white': rowsTeam.includes(props.row) }">
                  <q-td>
                    {{ getFullname(props.row) }}
                  </q-td>
                  <q-td class="text-center">
                    {{ props.row.gender }}
                  </q-td>
                  <q-td class="text-center">
                    {{ getWeightClass(props.row.weight, props.row.gender) }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
          <!-- TEAM VIEW TABLE -->
          <div class="col-12 col-md-6 q-pa-xs">
            <div class="row full-width justify-center q-gutter-sm q-mb-md">
              <div>
                <q-input v-model="teamName" placeholder="Team Name" dense style="width: 280px;" />
              </div>
              <div>
                <q-select v-model="selectedCategory" style="width: 150px;" :options="categories" outlined bg-color="white"
                  dense />
              </div>
            </div>
            <q-list>
              <q-item v-for="(item, i) in rowsTeam" :key="i">
                <q-item-section avatar>
                  <q-avatar size="50px" color="grey-4">
                    <q-icon name="person" color="indigo" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ getFullname(item) }}</q-item-label>
                  <q-item-label caption>{{ getWeightClass(item.weight, item.gender) }} ({{ item.gender }})</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <!-- <q-table flat :rows="rowsTeam" :columns="columnsTeam" row-key="name" hide-pagination>
              <template v-slot:top>
                <div class="row full-width justify-center">
                  <q-input v-model="teamName" placeholder="Team Name" dense />
                </div>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn @click="removePlayerFromTeam(props.row)" icon="close" dense color="red-8" round size="sm"
                    outline />
                </q-td>
              </template>
            </q-table> -->
            <div v-if="rowsTeam.length > 0" class="row justify-center q-mt-md q-gutter-sm">
              <q-btn @click="handleCreateTeam" :disable="!teamName" label="create" color="red-8" />
              <q-btn @click="clearTable" label="clear" color="blue-8" />
            </div>
          </div>
        </div>
      </q-tab-panel>
      <!-- EXISTING TEAMS -->
      <q-tab-panel name="existing">
        <div class="text-subtitle1 text-bold">
          Existing Teams
        </div>
        <div class="row justify-center q-gutter-sm">
          <!-- <q-select class="col q-mb-sm" dense :options="weightDivision" outlined bg-color="white"
            label="Weight Division" />
          <q-select class="col q-mb-sm" dense :options="categories" outlined bg-color="white" label="Category" /> -->
        </div>
        <div class="row justify-start ">
          <div v-for="(item, i) in teams" :key="i" class="col-6 col-md-3 q-mt-md q-pa-xs">
            <q-card class="rb-1">
              <q-card-section>
                <div class="text-subtitle1 text-red-7 text-bold">
                  {{ item.name }}
                </div>
                <div>
                  <img width="100px" src="../img/arnispic1.png" />
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn label="View" @click="handleViewTeam(item.id)" class="rb-1" dense style="width: 75px;"
                  color="blue-8" />
                <q-space />
                <q-btn @click="deleteTeam(item)" size="sm" round icon="delete" outline color="red-8" />
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
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { Dialog } from 'quasar';
import { getFullname, getWeightClass } from 'src/composables/filters'

import { useMemberStore } from 'src/stores/members';
import { useTeamStore } from 'src/stores/teams';


const tab = ref('existing')

const router = useRouter();
const handleViewTeam = (teamId) => {
  router.push({ path: '/team/view/' + teamId });
}

const selectedPlayers = ref([])
const teamName = ref('')
const viewTeam = ref(false)

const selectedCategory = ref('Select')

const categories = [
  'Junior', 'Kids', 'Senior'
]

// DUMMY DATA RANI SIR
const columnsSelectPlayer = ref([
  { name: 'name', required: true, label: 'Name', format: (val, row) => getFullname(row), align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'weightCategory', label: 'Weight Class', field: 'weightCategory', format: (val, row) => getWeightClass(row.weight, row.gender), sortable: true },
])

const columnsTeam = ref([
  { name: 'name', required: true, label: 'Name', format: (val, row) => getFullname(row), align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'weightCategory', label: 'Weight Class', field: 'weightCategory', format: (val, row) => getWeightClass(row.weight, row.gender), sortable: true },
])

const rowsTeam = ref([])
//add player to team table
watch(() => selectedPlayers.value, (newSelectedPlayers) => {
  // Clear existing rowsTeam
  rowsTeam.value = [];

  // Add the selected players to rowsTeam
  rowsTeam.value.push(...newSelectedPlayers);

  // Remove the selected players from approvedMembers
  newSelectedPlayers.forEach((player) => {
    const index = approvedMembers.value.findIndex((selectPlayer) => selectPlayer === player);
    if (index !== -1) {
      approvedMembers.value.splice(index, 1);
    }
  });
});

const clearTable = () => {
  // Add the cleared players back to the select players table
  approvedMembers.value.push(...rowsTeam.value);

  // Clear the team table
  uniqueTeam.value.clear();
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
    approvedMembers.value.unshift(player);
  }
};


/*
Backend Codes
*/
const filter = ref('')
const approvedMembers = computed(() => useMemberStore().getApproved)
const isLoadingMembersTable = ref(false)
const fetchMembers = async () => {
  isLoadingMembersTable.value = true
  await useMemberStore().fetchAll()
  isLoadingMembersTable.value = false
}
onMounted(async () => {
  await fetchMembers()
})

const teams = computed(() => useTeamStore().teams)
const fetchTeams = async () => {
  await useTeamStore().fetchAll()
}
onMounted(async () => {
  await fetchTeams()
})

const uniqueTeam = ref(new Set());
const handleSelect = (row) => {
  if (!uniqueTeam.value.has(row)) {
    uniqueTeam.value.add(row);
    rowsTeam.value = Array.from(uniqueTeam.value);
  } else {
    uniqueTeam.value.delete(row);
    rowsTeam.value = Array.from(uniqueTeam.value);
  }
}

const handleCreateTeam = () => {
  Dialog.create({
    title: 'Create Team?',
    message: 'Are you sure you want to create this team?',
    cancel: true,
    persistent: true
  })
    .onOk(async () => {
      const res = await useTeamStore().create({
        name: teamName.value,
        players: rowsTeam.value
      })
      if (res) tab.value = 'existing'
    })
}

const deleteTeam = (team) => {
  useTeamStore().delete(team.id)
}
</script>
