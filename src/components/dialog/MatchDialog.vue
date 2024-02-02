<template>
  <q-dialog ref='dialogRef'>
    <q-card style="width: 500px; border-radius: 10px">
      <q-card-section class="text-h6 fw-600 q-pb-none">{{ match ? 'Update' : 'Create' }} Match</q-card-section>
      <q-form @submit="updateTourna">
        <q-card-section class="column">
          <div class="text-center">
            <div class="">Match No.</div>
            <q-input class="q-mx-auto" mask="##" v-model="form.no" outlined dense :rules="[(val) => !!val]"
              style="width: 100px;" />
          </div>
          <div class="row justify-center">
            <div class="col-12 col-md-6 q-pa-xs">
              <div class="rb-1 bordered q-pa-md">
                <div class="text-subtitle2 text-center">Team 1</div>
                <q-select @update:model-value="(val) => checkRep(val, 'player1')" class="q-mb-sm" v-model="team1"
                  :options="teams" option-label="name" dense />
                <q-item v-if="form.player1 && form.player1 !== 'none'">
                  <q-item-section avatar>
                    <q-avatar color="red-1">
                      <q-icon name="person" size="50px" color="grey-7" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ getFullname(form.player1) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="form.player1 == 'none'">
                  <q-item-section avatar>
                    <q-avatar color="red-1">
                      <q-icon color="red" name="help" size="30px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-grey-6">No Player</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
            <div class="col-12 col-md-6 q-pa-xs">
              <div class="rb-1 bordered q-pa-md">
                <div class="text-center text-subtitle2">Team 2</div>
                <q-select @update:model-value="(val) => checkRep(val, 'player2')" class="q-mb-sm" v-model="team2"
                  :options="teams" option-label="name" dense />
                <q-item v-if="form.player2 && form.player2 !== 'none'">
                  <q-item-section avatar>
                    <q-avatar color="red-1">
                      <q-icon name="person" size="50px" color="grey-7" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ getFullname(form.player2) }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item v-if="form.player2 == 'none'">
                  <q-item-section avatar>
                    <q-avatar color="red-1">
                      <q-icon color="red" name="help" size="30px" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-grey-6">No Player</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn label="Cancel" flat v-close-popup />
          <q-btn type="submit" label="submit" color="red-8" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useDialogPluginComponent } from 'quasar'
import { reactive, ref, onMounted, computed } from 'vue';
import { useTeamStore } from 'stores/teams'
import { useTournamentStore } from 'stores/tournaments'
import { getFullname } from 'src/composables/filters';

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();

const props = defineProps({ tourna: Object, match: Object, division: String, gender: String })
const teams = computed(() => useTeamStore().teams)
const team1 = ref(null)
const team2 = ref(null)

const form = reactive({
  no: '',
  division: props?.division ?? '',
  player1: '',
  player2: '',
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

const fetchTeams = async () => {
  await useTeamStore().fetchAll()
}
onMounted(async () => {
  await fetchTeams()
})

const checkRep = (teamData, playerModel) => {
  if (teamData && teamData[props.division]) {
    const value = teamData[props.division][props.gender];
    const result = value !== undefined ? value : '';
    form[playerModel] = result
  } else {
    form[playerModel] = 'none'
  }
}
</script>
