<template>
  <q-dialog ref='dialogRef'>
    <q-card style="width: 500px; border-radius: 10px">
      <q-card-section class="text-h6 fw-600 q-pb-none">{{ data.match ? 'Update' : 'Create' }} Match</q-card-section>
      <q-form @submit="data.match ? update() : create()">
        <q-card-section class="column">
          <div class="q-mb-sm">
            <div>Weight Division: <span class="fw-600">{{ data.division }}</span></div>
            <div>Category: <span class="fw-600">{{ data.gender }}</span></div>
          </div>
          <div class="flex q-gutter-x-md">
            <div>
              <div class="">Round</div>
              <q-select v-model="form.round" outlined dense :options="roundsOpts" :rules="[(val) => !!val]"
                style="width: 200px;" />
            </div>
            <div>
              <div class="">Match No.</div>
              <q-input mask="##" v-model="form.no" outlined dense :rules="[(val) => !!val]" style="width: 100px;" />
            </div>
          </div>
          <div class="row justify-center">
            <div class="col-12 col-md-6 q-pa-xs">
              <div class="rb-1 bordered q-pa-md">
                <div class="text-subtitle2 text-center">Team 1</div>
                <q-select @update:model-value="(val) => checkRep(val, 'player1')" class="q-mb-sm" v-model="team1"
                  :options="filteredTeams" option-label="name" dense />
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
                  :options="filteredTeams" option-label="name" dense />
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
import { useMatchStore } from 'stores/matches'
import { getFullname } from 'src/composables/filters';

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogOK } = useDialogPluginComponent();

const props = defineProps({ data: Object })
const teams = computed(() => useTeamStore().teams)
const currentMatches = computed(() => useMatchStore().matches)
const team1 = ref(null)
const team2 = ref(null)

const filteredTeams = computed(() => {
  if (teams.value?.length > 0) {
    return teams.value.map(team => {
      const isDisabled = currentMatches.value.some(match => {
        return (
          match.division === props.data.division &&
          match.category === props.data.gender &&
          (match.player1.teamId === team.id || match.player2.teamId === team.id) &&
          form.round == match.round
        );
      });

      return { ...team, disable: isDisabled };
    });
  }
  return [];
});



const roundsOpts = [
  'Elimination',
  'Quarter Finals',
  'Semi-Finals',
  'Finals'
]

const form = reactive({
  round: null,
  no: '',
  tournaId: '',
  division: '',
  matchType: '',
  category: '',
  player1: '',
  player2: '',
})

onMounted(() => {
  if (props.data) {
    const data = props.data
    form.tournaId = data.tournaId
    form.division = data.division
    form.matchType = data.matchType
    form.category = data.gender

  }
})

const checkRep = (teamData, playerModel) => {
  if (teamData && teamData[props.data.division]) {
    const value = teamData[props.data.division][props.data.gender];
    const result = value !== undefined ? value : '';
    form[playerModel] = { ...result, team: { name: teamData.name } }
  } else {
    form[playerModel] = 'none'
  }
}

const create = async () => {
  form.no = parseInt(form.no)
  const res = await useMatchStore().create(form)
  if (res.success) onDialogOK()
}

const update = async () => {
  form.no = parseInt(form.no)
  const res = await useMatchStore().update(props.data.matchData?.id, form)
  if (res) onDialogOK()
}
</script>
