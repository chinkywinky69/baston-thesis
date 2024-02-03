<template>
  <div>
    <div class="q-mb-sm">
      <div class="text-subtitle2">Add Competition</div>
      <q-select @update:model-value="create" v-model="selectedCom" :options="anyoTypes" outlined dense
        style="max-width: 100vw; width: 300px" />
    </div>

    <!-- List of Competitions -->
    <div class="row">
      <div v-for="(com, i) in competitions" :key="i" class="col-12 col-md-4 q-pa-xs">
        <q-card style="min-height: 250px;">
          <q-card-section class="text-subtitle2 text-indigo-9 q-pb-none flex">
            <div>{{ com.name }} </div>
            <q-space />
            <q-btn @click="deleteCom(com)" round dense icon="delete" color="red" size="sm" />
          </q-card-section>
          <q-card-section>
            <q-list dense class="q-gutter-sm q-pa-sm">
              <q-item v-for="team in com?.teams" :key="team.id" class="bg-grey-2 rb-1">
                <q-item-section avatar>
                  <q-avatar icon="fas fa-people-group"></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="fw-600">{{ team.name }}</q-item-label>
                </q-item-section>
              </q-item>
              <div>
                <q-btn @click="handleTeam(com)" size="12px" label="Add Teams" color="primary" class="full-width" />
              </div>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue'

// Components
import AnyoTeamDialog from '../dialog/AnyoTeamDialog.vue';
import { useCompetitionStore } from 'src/stores/competitions';

const anyoTypes = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon", "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]

const props = defineProps({ tourna: Object, competitions: Array })
const selectedCom = ref('')
const $q = useQuasar()

const handleTeam = (com) => {
  $q.dialog({
    component: AnyoTeamDialog,
    componentProps: {
      competition: com
    }
  })
}

const create = async (val) => {
  const res = await useCompetitionStore().create({
    name: val,
    tournamentId: props.tourna.id
  })
  if (res.success) selectedCom.value = ''
}

const deleteCom = (com) => {
  useCompetitionStore().delete(com.id)
}
</script>
