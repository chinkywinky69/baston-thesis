<template>
  <q-page padding>
    <div class="text-h6 text-bold text-center q-mb-md">Edit Team</div>
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
  </q-page>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { Dialog } from 'quasar';
import { getFullname, getWeightClass } from 'src/composables/filters'

import { useMemberStore } from 'src/stores/members';
import { useTeamStore } from 'src/stores/teams';


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

