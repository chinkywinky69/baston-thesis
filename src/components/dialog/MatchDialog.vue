<template>
  <q-dialog ref='dialogRef'>
    <q-card style="width: 500px; border-radius: 10px">
      <q-card-section class="text-h6 fw-600">{{ match ? 'Update' : 'Create' }} Match</q-card-section>
      <q-form @submit="updateTourna">
        <q-card-section class="column q-gutter-sm">
          <div>
            <div class="">Match No.</div>
            <q-input mask="##" v-model="form.no" outlined dense :rules="[(val) => !!val]" style="width: 100px;" />
          </div>
          <div>
            <div class="">Tournament Venue </div>
            <q-input v-model="form.venue" outlined dense :rules="[(val) => !!val]" />
          </div>
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn type="submit" label="submit" color="red-8" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar'
import { reactive, onMounted } from 'vue';
import { useTeamStore } from 'stores/teams'
import { useTournamentStore } from 'stores/tournaments'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();

const props = defineProps({ tourna: Object, match: Object })

const form = reactive({
  no: '',
  venue: ''
})

onMounted(() => {
  if (props.tourna) {
    const data = props.tourna
    form.name = data.name
    form.venue = data.venue
    form.date = data.date
  }
})

const updateTourna = async () => {
  const res = await useTournamentStore().update(props.tourna.id, form)
  if (res) onDialogOK()
}
</script>
