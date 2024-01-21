<template>
  <q-page>
    <div>
      <q-img class="for-desktop" src="../img/welcomePage1.png">
        <div class="absolute-full text-subtitle2 flex column flex-center text-center">
          <div class=" text-h2 text-bold q-my-sm">
            BASTON
          </div>
          <div class=" text-h6 q-mb-xl">
            Arnis tournaments to a simpler, convenient way!
          </div>
          <div class=" q-mb-sm">
            <q-btn @click="handleMemberDialog" class="q-py-md" label="Be a Member" color="red-8" />
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
            <q-btn @click="handleMemberDialog" dense label="Be a Member" color="red-8" />
          </div>
        </div>
      </q-img>
    </div>
    <q-dialog v-model="addUserDialog">
      <q-card style="width: 400px">
        <q-form @submit="previewMember ? updateMember() : createMember()">
          <q-card-section>
            <div class="text-bold text-h6 q-mb-md">Add Member</div>
            <q-input v-model="form.lastName" class="q-mb-sm" label="Last Name" outlined dense :rules="[(val) => !!val]" />
            <q-input v-model="form.firstName" class="q-mb-sm" label="First Name" outlined dense
              :rules="[(val) => !!val]" />
            <q-input v-model="form.middleName" class="q-mb-sm" label="Middle Name" outlined dense
              :rules="[(val) => !!val]" />
            <q-input v-model="form.email" class="q-mb-sm" label="Email" outlined dense type="email"
              :rules="[(val) => !!val]" />
            <q-input v-model="form.school" class="q-mb-sm" label="School" outlined dense type="text"
              :rules="[(val) => !!val]" />
            <div class="row">
              <q-input v-model="form.birthday" class="col q-mb-sm" label="Birthday" outlined dense type="date"
                @change="calculateAge" :rules="[(val) => !!val]" />
              <q-input v-model="form.age" class="col q-mb-sm" label="Age" outlined dense type="number" readonly />
            </div>
            <q-select v-model="form.gender" class="q-mb-sm" :options="genders" outlined dense label="Gender"
              :rules="[(val) => !!val]" />
            <q-input v-model="form.contactNo" class="q-mb-sm" label="Contact Number" outlined dense
              :rules="[(val) => !!val]" />
            <div class="row">
              <q-input v-model="form.height" class="col q-mb-sm" label="Height (cm)" outlined dense type="number"
                :rules="[(val) => !!val]" />
              <q-input v-model="form.weight" class="col q-mb-sm" label="Weight (kg)" outlined dense type="number"
                :rules="[(val) => !!val]" />

            </div>
            <q-input :label="`${calculateWeightClass(form.weight, form.gender)}`" outlined dense readonly />
            <q-input class="col q-mb-sm" label="City: San Carlos City" outlined dense type="number" readonly />
            <q-select v-model="form.barangay" class="q-mb-sm" :options="barangays" outlined dense label="Barangay"
              :rules="[(val) => !!val]" />
            <q-input v-model="form.street" class="q-mb-sm" label="Street Name, Building, House no." outlined dense />
            <q-input v-model="form.fathersName" class="q-mb-sm" label="Fathers Name" outlined dense
              :rules="[(val) => !!val]" />
            <q-input v-model="form.mothersName" class="q-mb-sm" label="Mothers Name" outlined dense
              :rules="[(val) => !!val]" />
            <q-input v-model="form.legalGuardian" class="q-mb-sm" label="Legal Guardian that is Present" outlined dense
              :rules="[(val) => !!val]" />
            <q-input v-model="form.legalGuardianContact" class="q-mb-sm" label="Emergency Contact #" outlined dense
              type="number" />
            <q-separator />
            <q-file v-model="medCert" class="q-mb-sm" label="Upload Med Cert" outlined dense :rules="[(val) => !!val]">
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-btn :loading="isLoading" type="submit" :label="previewMember ? 'Update Data' : 'Add Member'"
              color="red-8" />
          </q-card-section>
        </q-form>
      </q-card>
    </q-dialog>
    <div class="q-pa-xl">
      <div class="text-h3 text-black text-bold text-center q-mb-xl">ABOUT US</div>
      <div class="row justify-center q-mb-xl">
        <div class=" col-md-6 col-xs-12 q-pa-xs">
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
        <div class=" col-md-6 col-xs-12 q-pa-xs ">
          <q-card>
            <q-card-section class="flex column flex-center">
              <div>
                <q-img width="150px" src="../img/welcomePageArnis.png" />
              </div>
              <div class="text-center text-h5 text-bold">
                How to Play and Rules
              </div>
              <div style="margin-bottom: 20.7px;" class="text-center">
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
        <q-card>
          <q-card-section>
            <div class="text-body1 q-pa-lg">
              San Carlos Jungle Fighters Martial Arts Club is a non-government organization that promotes martial sports.
              It was founded by Diomedes N. Mamugay, a 3rd Dan Blackbelt, in San Carlos City, Negros Occidental. The club
              produces Arnis practitioners and coordinates with the City Sports Office to offer programs such as
              Grassroots Training. However, managing Arnis tournaments with manual methods proved to be time-consuming. To
              simplify the process, the club plans to create a web-based app that records player information, records
              scores, and bout-making. The app will be accessible from mobile or web and offer real-time updates on match
              results and standings for all stakeholders.
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-mb-xl">
        <q-card>
          <q-card-section>
            <div class="text-h3 text-bold text-center q-mb-md">
              LIVE MATCHES
            </div>
            <div>
              <q-table title="Matches" flat bordered :rows="rows" row-key="name" color="amber" />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-mb-xl">
        <q-card>
          <q-card-section>
            <div class="text-h3 text-bold text-center q-mb-md">
              MATCH HISTORY
            </div>
            <div class="row justify-between">
              <div>
                <q-btn icon="fa-solid fa-calendar" label="date" color="red" />
              </div>
              <div style="width: 150px;">
                <q-select label="Division" :options="weightDivision" outlined dense />
              </div>
              <div style="width: 150px;">
                <q-select label="Category" :options="categories" outlined dense />
              </div>
            </div>
            <div class="q-mt-md">
              <q-list bordered class="rounded-borders">
                <q-expansion-item expand-separator icon="perm_identity" label="Paderna VS. Villacampa"
                  caption="Openweight | Boys Senior">
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                      eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
                <q-expansion-item expand-separator icon="perm_identity" label="Paderna VS. Villacampa"
                  caption="Openweight | Boys Senior">
                  <q-card>
                    <q-card-section>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                      commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                      eveniet doloribus ullam aliquid.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useMemberStore } from 'src/stores/members';
import { useQuasar } from 'quasar';
import { getFullname, getAddress } from 'src/composables/filters'

const addUserDialog = ref(false)
const viewDetailsDialog = ref(false)
const medCert = ref(null)
const $q = useQuasar()

const form = reactive({
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  school: "",
  birthday: "",
  age: "",
  gender: "",
  contactNo: "",
  height: "",
  weight: "",
  weightClass: "",
  barangay: "",
  street: "",
  fathersName: "",
  mothersName: "",
  legalGuardian: "",
  legalGuardianContact: ""
})

const handleMemberDialog = () => {
  previewMember.value = null
  addUserDialog.value = true
}

const isLoading = ref(false)
const createMember = async () => {
  isLoading.value = true
  if (medCert.value) {
    const res = await useMemberStore().create(form, medCert.value)
    if (res) {
      addUserDialog.value = false
    }
  } else {
    $q.dialog({
      title: "Oops!",
      message: "You need to upload the medical certificate.",
    })
  }
  isLoading.value = false
}

const genders = [
  "Male",
  "Female"
]
const barangays = [
  'Bagonbon',
  'Buluangan',
  'Codcod',
  'Ermita (Sipaway)',
  'Guadalupe',
  'Nataban',
  'Palampas',
  'Barangay 1',
  'Barangay 2',
  'Barangay 3',
  'Barangay 4',
  'Barangay 5',
  'Barangay 6',
  'Prosperidad',
  'Punao',
  'Quezon',
  'Rizal',
  'San Juan (Sipaway)'
]

// CALCULATE BIRTHDAY FUNCTION
const calculateAge = () => {
  if (form.birthday) {
    const birthdayDate = new Date(form.birthday);
    const today = new Date();
    let ageCalc = today.getFullYear() - birthdayDate.getFullYear();
    const m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
      ageCalc--;
    }
    form.age = ageCalc;
  } else {
    form.age = '';
  }
}
//CALCULATE WEIGHT CLASS
const calculateWeightClass = (weight, gender) => {
  if (!weight || weight <= 0) {
    return "Invalid Input";
  }

  if (gender === "Male") {
    if (weight >= 43 && weight <= 47) {
      return "Pinweight";
    } else if (weight > 47 && weight <= 51) {
      return "Bantamweight";
    } else if (weight > 51 && weight <= 55) {
      return "Featherweight";
    } else if (weight > 55 && weight <= 60) {
      return "Extra Lightweight";
    } else if (weight > 60 && weight <= 65) {
      return "Half Lightweight";
    } else {
      return "Open Weight";
    }
  } else if (gender === "Female") {
    if (weight >= 37 && weight <= 40) {
      return "Pinweight";
    } else if (weight > 40 && weight <= 44) {
      return "Bantamweight";
    } else if (weight > 44 && weight <= 48) {
      return "Featherweight";
    } else if (weight > 48 && weight <= 52) {
      return "Extra Lightweight";
    } else if (weight > 52 && weight <= 56) {
      return "Half Lightweight";
    } else {
      return "Open Weight";
    }
  } else {
    return "Invalid Gender";
  }
};


const columns = [
  { name: 'name', required: true, label: 'Name', format: (val, row) => getFullname(row), align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'age', label: 'Age', field: 'age', sortable: true },
  { name: 'address', label: 'Address', format: (val, row) => getAddress(row), field: 'address' },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
]

const membersData = computed(() => useMemberStore().members)

const viewDetails = (data) => {
  viewDetailsDialog.value = true;
  //PUT IN A DIALOG ANG FULL DETAILS
  previewMember.value = data
}

const dummy = {
  lastName: 'Doe',
  firstName: 'John',
  middleName: 'Etlog',
  email: 'john.doe@example.com',
  birthday: '1990-01-01', // format YYYY-MM-DD
  age: 21,
  gender: 'Male',
  contactNo: '123456789',
  height: 180, // in cm
  weight: 70, // in kg
  city: 'San Carlos City',
  barangay: 'Nataban',
  street: '123, Elm Street',
  fathersName: 'Richard Doe',
  mothersName: 'Jane Doe',
  legalGuardian: 'N/A',
  legalGuardianContact: '0987654321',
};

const previewMember = ref(null)

const isLoadingMembersTable = ref(false)
const fetchMembers = async () => {
  isLoadingMembersTable.value = true
  await useMemberStore().fetchAll()
  isLoadingMembersTable.value = false
}

const editMember = (data) => {
  Object.assign(form, data)
  addUserDialog.value = true
}


onMounted(async () => {
  Object.assign(form, dummy)
  await fetchMembers()
})

const slide = ref('first')

const rows = [
  {
    dateAndTime: 'January 11, 2020',
    listOfMatches: 'Ongoing: John Vince Paderna vs. Justin Vince Villacampa - Bantam Weight Boys Division'
  },
  {
    dateAndTime: 'January 11, 2020',
    listOfMatches: 'Up Next: Mikmok vs. Oreo - Bantam Weight Boys Division'
  },
  {
    dateAndTime: 'January 11, 2020',
    listOfMatches: 'Up Next: Jv vs. Angel - Bantam Weight Boys Division'
  },

]

const weightDivision = [
  'Pinweight', 'Bantanweight', 'Featherweight', 'Extra Lightweight', 'Half Lightweight', 'Open Weight'
]

const categories = [
  'Girls (Kids)', 'Boys (Kids)', 'Girls Secondary (Junior)', 'Boys Secondary (Junior)', 'Boys Senior', 'Girs Senior'
]

</script>

<style scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3)
}
</style>
