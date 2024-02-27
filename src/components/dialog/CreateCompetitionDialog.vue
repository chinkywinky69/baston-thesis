<template>
  <q-dialog ref='dialogRef'>
    <q-card class="rb-1" style="width: 400px; max-width: 100vw; border-radius: 10px;">
      <q-card-section class="text-h6 fw-600">Create Competition</q-card-section>
      <q-form @submit="create">
        <q-card-section>
          <div class="q-mb-sm">
            <div>Select</div>
            <q-select v-model="form.name" :options="anyoTypes" outlined dense :rules="[(val) => !!val]" />
          </div>
          <div>
            <div>Category</div>
            <q-select v-model="form.category" :options="gender" option-label="label" option-value="value" emit-value
              map-options outlined dense :rules="[(val) => !!val]" />
          </div>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn type="submit" dense label="Submit" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { reactive } from 'vue'
import { useDialogPluginComponent } from 'quasar'
import { useCompetitionStore } from 'src/stores/competitions';
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();
const props = defineProps({ tourna: Object })
const anyoTypes = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon", "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]
const gender = [
  { label: 'Boys', value: 'Male' },
  { label: 'Girls', value: 'Female' },
]

const form = reactive({
  type: "",
  name: "",
  tournamentId: props.tourna.id,
  category: ""
})

const create = async (val) => {
  if (form.name.includes('Individual')) form.type = 'Individual'
  else form.type = 'Team'

  const res = await useCompetitionStore().create(form)
  if (res.success) onDialogOK()
}
</script>
