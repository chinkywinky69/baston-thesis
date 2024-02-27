<template>
  <q-dialog ref='dialogRef'>
    <q-card class="rb-1" style="width: 500px; max-width: 100vw; border-radius: 10px;">
      <q-card-section class="text-h6 fw-600">Create Team</q-card-section>
      <q-card-section>
        <q-input v-model="teamName" label="Team Name" />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn @click="createTeam" :disable="!teamName" dense label="Submit" color="primary" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useTeamStore } from 'src/stores/teams';
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();

const teamName = ref('')

const createTeam = async () => {
  const res = await useTeamStore().create({ name: teamName.value })
  if (res.success) onDialogOK()
}
</script>
