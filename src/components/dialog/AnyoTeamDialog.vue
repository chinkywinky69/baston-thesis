<template>
  <q-dialog ref='dialogRef'>
    <q-card class="rb-1" style="width: 500px; max-width: 100vw; border-radius: 10px;">
      <q-card-section class="text-h6 fw-600">Add Teams</q-card-section>
      <q-card-section>
        <div>Competition: <span class="fw-600">{{ competition.name }}</span></div>
        <q-select v-model="selectedTeams" :options="teams" option-label="name" outlined use-chips multiple />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="addTeams" dense label="Submit" color="primary" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useTeamStore } from 'src/stores/teams';
import { useCompetitionStore } from 'src/stores/competitions';
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const props = defineProps({ competition: Object })

const teamStore = useTeamStore()
const teams = computed(() => teamStore.teams)
const selectedTeams = ref([])

const addTeams = async () => {
  const res = await useCompetitionStore().update(props.competition.id, {
    teams: selectedTeams.value
  })
  if (res) onDialogOK()
}

onMounted(() => {
  if (props.competition?.teams?.length) {
    selectedTeams.value = props.competition.teams
  }
})
</script>
