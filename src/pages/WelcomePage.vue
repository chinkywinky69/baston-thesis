<template>
  <q-page>
    <div>
      <q-img class="for-desktop" src="../img/welcomePage1.png">
        <div class="absolute-full text-subtitle2 flex column flex-center text-center">
          <div class=" text-h2 text-bold q-mb-sm">
            BASTON
          </div>
          <div class=" text-h6 q-mb-xl">
            Arnis tournaments to a simpler, convenient way!
          </div>
          <div class=" q-mb-sm">
            <q-btn class="q-py-md" label="Be a Member" color="red-8" />
          </div>
        </div>
      </q-img>
      <q-img class="for-mobile" src="../img/welcomePage2.jpg">
        <div class="absolute-full text-subtitle2 flex-center text-center">
          <div class=" text-h3 text-bold q-mb-sm">
            BASTON
          </div>
          <div class="text-body1 q-mb-md q-px-md">
            Arnis tournaments to a simpler, convenient way!
          </div>
          <div class="q-mb-sm">
            <q-btn dense label="Be a Member" color="red-8" />
          </div>
        </div>
      </q-img>
    </div>
    <div class="q-pa-xl">
      <div class="text-h3 text-black text-bold text-center q-mb-xl">ABOUT US</div>
      <div class="row justify-center q-mb-xl">
        <div class="col col-md-6 col-xs-12 q-pa-xs">
          <q-card>
            <q-card-section class="flex column flex-center">
              <div>
                <q-img width="150px" src="../img/welcomePageProblem.png" />
              </div>
              <div class="text-center text-h5 text-bold">
                What is Arnis?
              </div>
              <div class="text-center">
                Arnis, also known as Eskrima and Kali, is a traditional Filipino martial art that emphasizes the use of
                weapons such as sticks, knives, and bladed weapons, as well as empty-hand techniques. It is considered to
                be
                one of the oldest and most practical fighting systems in the world, and is known for its speed, power, and
                effectiveness.
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="row justify-center">
              <q-btn label="Read More" color="red-8" href=" https://blackbeltwiki.com/arnis" target="_blank" />
            </q-card-actions>
          </q-card>

        </div>
        <div class="col col-md-6 col-xs-12 q-pa-xs ">
          <q-card>
            <q-card-section class="flex column flex-center">
              <div>
                <q-img width="150px" src="../img/welcomePageArnis.png" />
              </div>
              <div class="text-center text-h5 text-bold">
                How to Play and Rules
              </div>
              <div class="text-center">
                Arnis, also known as Eskrima and Kali, is a traditional Filipino martial art that involves the use of
                weapons and empty-hand techniques. Here are some basic rules and guidelines for playing Arnis, kindly
                click the link below.
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions class="row justify-center">
              <q-btn label="Read More" color="red-8"
                href="https://www.martialartsplanet.com/threads/arnis-eskrima-kali.31257/" target="_blank" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
      <div class="q-mb-xl">
        <q-carousel arrows animated v-model="slide" height="400px">
          <q-carousel-slide name="first" img-src="../img/userimage3.png">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">OUR CLIENT</div>
              <div class="text-subtitle1">SAN CARLOS JUNGLE FIGHTERS MARTIAL ARTS CLUB</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="second" img-src="../img/userimage2.png">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">OUR CLIENT</div>
              <div class="text-subtitle1">SAN CARLOS JUNGLE FIGHTERS MARTIAL ARTS CLUB</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="third" img-src="../img/userimage1.png">
            <div class="absolute-bottom custom-caption">
              <div class="text-h2">OUR CLIENT</div>
              <div class="text-subtitle1">SAN CARLOS JUNGLE FIGHTERS MARTIAL ARTS CLUB</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const slide = ref('first')



</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
