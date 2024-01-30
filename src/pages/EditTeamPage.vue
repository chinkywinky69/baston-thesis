<template>
  <q-page padding>
    <div class="text-center q-my-md text-h6 text-bold">Edit Team</div>

    <div class="row">
      <div class="col-12 col-md-5 q-pa-sm">
        <q-card class="rb-1">
          <q-card-section>
            <q-input v-model="teamName" label="Team Name" />
            <q-card-actions align="right">
              <q-btn @click="saveTeamName" dense label="Update" color="primary" />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-pa-sm">
        <q-card class="rb-1">
          <q-card-section>
            <q-list v-if="teamData?.players">
              <q-item v-for="item in teamData.players" :key="item.id">
                <q-item-section avatar>
                  <q-avatar icon="person" color="grey-4"></q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle2">{{ getFullname(item) }}</q-item-label>
                  <q-item-label caption>{{ `${getAge(item.birthday)}yo. • ${item.weight}kg •
                                      ${item.gender}`
                  }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn @click="handleRemovePlayer(item)" round dense icon="close" size="sm" color="red" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="text-center q-mt-xl">
      <q-btn @click="$router.go(-1)" class="text-bold" label="Back previous page" outline color="primary" />
    </div>
  </q-page>
</template>

<script setup>
import { getAge, getFullname } from 'src/composables/filters';
import { useTeamStore } from 'src/stores/teams';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const teamData = computed(() => useTeamStore().team)
const teamName = ref()

const feachTeam = async () => {
  await useTeamStore().fetchOne(route.params.id)
  if (teamData.value) teamName.value = teamData.value.name
}

onMounted(async () => {
  await feachTeam()
})


const saveTeamName = async () => {
  await useTeamStore().update(route.params.id, {
    name: teamName.value
  })
}

const handleRemovePlayer = async (player) => {
  const res = await useTeamStore().removePlayer(route.params.id, player)
}
</script>

