<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Teams Page</div>
    <!-- EXISTING TEAMS -->
    <div class="text-subtitle1 text-bold">
      Existing Teams
    </div>
    <div class="text-right">
      <q-btn @click="handleCreateTeam" label="Create Team" color="primary" />
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
            <q-btn label="Draft" @click="handleViewTeam(item.id)" class="rb-1 text-bold" dense style="width: 75px;"
              color="blue-8" size="12px" outline />
            <q-btn label="edit" @click="handleEditTeam(item.id)" class="rb-1 text-bold" dense style="width: 75px;"
              color="green-8" size="12px" outline />
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
  </q-page>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { getFullname, getWeightClass } from 'src/composables/filters'

import { useMemberStore } from 'src/stores/members';
import { useTeamStore } from 'src/stores/teams';
import TeamDialog from 'src/components/dialog/TeamDialog.vue';

const $q = useQuasar()
const router = useRouter();
const handleViewTeam = (teamId) => {
  router.push({ path: '/team/view/' + teamId });
}

const handleEditTeam = (teamId) => {
  router.push({ path: '/editTeam/' + teamId });
}

const selectedPlayers = ref([])
const teamName = ref('')
const viewTeam = ref(false)

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

const deleteTeam = (team) => {
  useTeamStore().delete(team.id)
}

const handleCreateTeam = async () => {
  $q.dialog({
    component: TeamDialog
  })
}
</script>
