<template>
  <q-page class="main" padding>
    <div class="q-pa-md row q-mt-xl justify-center">
      <q-form @submit="login">
        <q-card style="width: 330px;" class="col-auto text-center">
          <q-card-section>
            <img width="90" src="../img/logo.png" alt="">
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <q-input v-model="form.email" class="q-mb-md" filled label="Email" :rules="[(val) => !!val]" />
            <q-input v-model="form.password" type="password" filled label="Password" :rules="[(val) => !!val]" />
          </q-card-section>
          <div v-if="errorLogin" class="text-center text-indigo text-subtitle2 q-mb-md">{{ errorLogin }}</div>
          <q-separator />
          <q-card-actions align="center">
            <q-btn :loading="isLoading" type="submit" class="q-ma-xl q-px-xl" label="Log In" color="red-8"
              style="width: 280px;" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAuthStore } from 'stores/auth'

const form = reactive({
  email: "",
  password: ""
})

const errorLogin = ref(null)
const isLoading = ref(false)
const login = async () => {
  isLoading.value = true
  const res = await useAuthStore().loginWithEmail(form)
  if (res) {
    if (res.error) errorLogin.value = res.message
    isLoading.value = false
  }
}
</script>


