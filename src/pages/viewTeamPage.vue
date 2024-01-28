<template>
  <q-page padding>
    <div class="flex column flex-center">
      <div class="text-h4 text-bold q-mb-md">
        {{ teamData?.name ?? '' }}
      </div>
      <div class="row q-gutter-sm">
        <div>
          <q-select v-model="selectedGender" style="width: 150px;" :options="gender" option-label="label"
            option-value="value" emit-value map-options placeholder="Category" outlined bg-color="white" dense />
        </div>
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div class="row justify-around">
      <!-- Labanan -->
      <div>
        <div class="column items-center">
          <div class="col">
            <q-btn class="text-white q-pa-sm q-mb-sm text-body1" label="Labanan" color="red-8" dense />
          </div>
          <div v-for="(w, index) in weightDivision" :key="index" class="col q-mb-sm">
            <q-card style="width: 370px;">
              <q-card-section class="row justify-between">
                <div class="text-body1 text-bold">{{ w }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-select :option-disable="(item) => item.gender != selectedGender"
                  @update:model-value="(val) => setRepresentative(w, val)" :model-value="getSelectedRep(w)"
                  :options="filtered" :option-label="(val) => getFullname(val)" dense outlined bg-color="white">
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon name="person" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ getFullname(scope.opt) }}</q-item-label>
                        <q-item-label caption>{{ `${getAge(scope.opt.birthday)}yo. • ${scope.opt.weight}kg •
                                                  ${scope.opt.gender}`
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
                <!-- <q-item>
                  <q-item-section avatar>
                    <q-avatar icon="person" color="red-1" size="50px" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      getFullname(item) }}</q-item-label>
                    <q-item-label caption>{{ `${getAge(item.birthday)}yo. • ${item.weight}kg • ${item.gender}`
                    }}</q-item-label>
                  </q-item-section>
                </q-item> -->
              </q-card-section>
              <q-separator />
              <!-- <q-card-actions class="row justify-end">
                <q-btn label="delete" color="red-8" dense />
              </q-card-actions> -->
            </q-card>
          </div>
        </div>
      </div>

      <div>
        <div class="column items-center">
          <div class="col">
            <q-btn class="text-white q-pa-sm q-mb-sm text-body1" label="Anyo" color="blue-8" dense />
          </div>
          <div v-for="i in individualAnyo" :key="i" class="col q-mb-sm">
            <q-card style="width: 370px;">
              <q-card-section class="row justify-between">
                <div class="text-body1 text-bold">{{ i }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-select :option-disable="(item) => item.gender != selectedGender"
                  @update:model-value="(val) => setRepresentative(i, val)" :model-value="getSelectedRep(i)"
                  :options="playersData" :option-label="(val) => getFullname(val)" dense outlined bg-color="white">
                  <template v-slot:option="scope">
                    <q-item :disable="scope.opt.gender != selectedGender" v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon name="person" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ getFullname(scope.opt) }}</q-item-label>
                        <q-item-label caption>{{ `${getAge(scope.opt.birthday)}yo. • ${scope.opt.weight}kg •
                                                  ${scope.opt.gender}`
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
              <q-separator />
            </q-card>
          </div>
          <div v-for="t in teamAnyo" :key="t" class="col q-mb-sm">
            <q-card style="width: 370px;">
              <q-card-section class="row justify-between">
                <div class="text-body1 text-bold">{{ t }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-select :option-disable="(item) => item.gender != selectedGender"
                  @update:model-value="(val) => setRepresentative(t, val)" :model-value="getSelectedRep(t)"
                  :options="playersData" dense outlined bg-color="white" multiple use-chips
                  :option-label="(val) => getFullname(val)">
                  <template v-slot:option="scope">
                    <q-item :disable="scope.opt.gender != selectedGender" v-bind="scope.itemProps">
                      <q-item-section avatar>
                        <q-icon name="person" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ getFullname(scope.opt) }}</q-item-label>
                        <q-item-label caption>{{ `${getAge(scope.opt.birthday)}yo. • ${scope.opt.weight}kg •
                                                  ${scope.opt.gender}`
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-card-section>
              <q-separator />
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { assignProperty } from 'src/composables/tournament'
import { getFullname, getAge } from 'src/composables/filters';
import { useTeamStore } from 'stores/teams'

const route = useRoute()
const selectedGender = ref('Male')
const individualAnyoMembers = reactive({
  "Team Likha Single Weapon": [], "Team Likha Double Weapon": [], "Team Likha Espada Y Daga Weapon": []
})
const teamData = computed(() => useTeamStore().team);
const playersData = ref([])
const filtered = ref([])
watch(
  () => teamData.value,
  (newValue) => {
    if (newValue !== null) {
      playersData.value = assignProperty(teamData.value.players)
    }
  }
);

watchEffect(() => {
  updateFilteredData();
});

// Watcher for selectedGender
watch(selectedGender, () => {
  updateFilteredData();
});

function updateFilteredData() {
  if (playersData.value?.length) {
    filtered.value = playersData.value.filter(item => item.category != 'Kids');
  }
}



const gender = [
  { label: "Boys", value: "Male" },
  { label: "Girls", value: "Female" },
]

// const categories = [
//   'Kids', 'Junior', 'Senior'
// ]

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const individualAnyo = [
  "Individual Likha Single Weapon", "Individual Likha Double Weapon", "Individual Likha Espada Y Daga Weapon"
]

const teamAnyo = [
  "Team Likha Single Weapon", "Team Likha Double Weapon", "Team Likha Espada Y Daga Weapon"
]

const dummyMembers = [
  'None', 'Tatin Tambok', 'Janbins Paderna', 'Injil Burt', 'Sir Clint', 'Nami Dog'
]

const feachTeam = async () => {
  await useTeamStore().fetchOne(route.params.id)
}

onBeforeMount(async () => {
  await feachTeam()
})

const getSelectedRep = (matchType) => {
  // const matchTypeModified = matchType.replace(" ", "_");
  if (teamData.value && teamData.value[matchType] && teamData.value[matchType][selectedGender.value]) {
    return teamData.value[matchType][selectedGender.value]
  }
  return [];
}

const setRepresentative = async (matchType, player) => {
  const res = await useTeamStore().setRepresentative(route.params.id, matchType, selectedGender.value, player)
}
</script>
