<template>
  <q-page padding>
    <div class="flex column flex-center">
      <div class="text-h4 text-bold q-mb-md">
        Team Name
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
          <div v-for="item in filtered" :key="item.id" class="col q-mb-sm">
            <q-card style="width: 370px;">
              <q-card-section class="row justify-between">
                <div class="text-body1 text-bold">{{ item.weightClass }}</div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-item>
                  <q-item-section avatar>
                    <q-avatar icon="person" color="red-1" size="50px" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      getFullname(item) }}</q-item-label>
                    <q-item-label caption>{{ `${getAge(item.birthday)}yo. • ${item.weight}kg • ${item.gender}`
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-card-section>
              <q-separator />
              <q-card-actions class="row justify-end">
                <q-btn label="delete" color="red-8" dense />
              </q-card-actions>
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
                <q-select v-model="individualAnyoMember" :options="filtered" :option-label="(val) => getFullname(val)"
                  dense outlined bg-color="white" />
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
                <q-select v-model="individualAnyoMember" :options="dummyMembers" dense outlined bg-color="white" />
                <q-select v-model="individualAnyoMember" :options="dummyMembers" dense outlined bg-color="white" />
                <q-select v-model="individualAnyoMember" :options="dummyMembers" dense outlined bg-color="white" />

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
import { ref, onBeforeMount, computed, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router';
import { assignProperty } from 'src/composables/tournament'
import { getFullname, getAge } from 'src/composables/filters';
import { useTeamStore } from 'stores/teams'

const route = useRoute()
const selectedGender = ref('Boys')
const selectedCategory = ref('Kids')
const individualAnyoMember = ref('None')
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

// Watcher for selectedCategory
watch(selectedCategory, () => {
  updateFilteredData();
});

function updateFilteredData() {
  if (playersData.value?.length) {
    filtered.value = playersData.value.filter(item => item.category === selectedCategory.value && item.gender === selectedGender.value);
  }
}



const gender = [
  { label: "Boys", value: "Male" },
  { label: "Girls", value: "Female" },
]

const categories = [
  'Kids', 'Junior', 'Senior'
]

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
</script>
