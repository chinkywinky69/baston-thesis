<template>
  <q-page padding>
    <div class="text-center q-mb-xl text-h6 text-bold">Create a Tournament</div>
    <div class="flex flex-center">
      <q-card style="width: 500px;">
        <q-card-section class="column q-gutter-sm">
          <div>
            <div class="">Tournament Name</div>
            <q-input v-model="tournamentForm.name" outlined dense />
          </div>
          <div>
            <div class="">Tournament Venue </div>
            <q-input v-model="tournamentForm.venue" outlined dense />
          </div>
          <div>
            <div class="">Tournament Date </div>
            <q-input v-model="tournamentForm.date" outlined dense type="date" />
          </div>
        </q-card-section>
        <q-card-actions class="row justify-center">
          <q-btn :disable="!tournamentForm.name" @click="handleSubmitTournamentName" label="submit" color="red-8" />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
<<<<<<< HEAD
import { useTournamentStore } from 'src/stores/tournaments';
=======
import { uid } from 'quasar';
>>>>>>> c0d51d3d8ca6c11db4fd25b4f0f921c285bd237f

const tournaStore = useTournamentStore()
const router = useRouter()
const id = uid()

const tournamentForm = reactive({
  name: '',
  venue: '',
  date: ''
})

const handleSubmitTournamentName = async () => {
  submitTournamentName.value = false

  await tournaStore.create(tournamentForm)

  pickTournamentType.value = true
}

}
</script>


