<template>
  <q-page class="main" padding>
    <div class="q-pa-md row q-mt-xl justify-center">
      <form>
        <q-card style="width: 330px;" class="col-auto text-center">
          <q-card-section>
            <img width="90" src="../img/logo.png" alt="">
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-lg">
            <q-input class="q-mb-md" filled label="Email" />
            <q-input type="password" filled label="Password" />
          </q-card-section>
          <q-separator />
          <q-card-action>
            <q-btn class="q-ma-xl q-px-xl" label="Log In" color="red-8" /> </q-card-action>
        </q-card>
      </form>
    </div>
    <!-- MODAL FOR SUCCESSFULLY DELETING THE LAB -->
    <q-dialog seamless position="bottom">
      <q-card class="bg-red-9" style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-white">Invalid Credentials!</div>
          </div>
          <q-space />
          <q-btn color="white" flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>


