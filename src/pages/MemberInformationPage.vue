<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Member Information</div>
    <div class="flex flex-start q-gutter-sm q-mb-md">
      <div><q-btn @click="addUserDialog = true" label="Add Member" color="red-8" /></div>
      <div style="width:350px">
        <q-input label="search" filled bg-color="white" outlined dense />
      </div>
    </div>

    <div class="q-mb-md">
      <q-table title="Verified Users" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat label="View Details" color="red-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div>
      <q-table title="Pending Users" :rows="rows" :columns="columns" row-key="name">
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat label="Reject" color="red-8" @click="viewDetails(props.row)" />
            <q-btn flat label="Accept" color="green-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- ADD MEMBER DIALOG -->
    <q-dialog v-model="addUserDialog">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-bold text-h6 q-mb-md">Add Member</div>
          <q-input class="q-mb-sm" label="Last Name" outlined dense />
          <q-input class="q-mb-sm" label="First Name" outlined dense />
          <q-input class="q-mb-sm" label="Middle Name" outlined dense />
          <q-input class="q-mb-sm" label="Email" outlined dense type="email" />
          <div class="row">
            <q-input class="col q-mb-sm" label="Birthday" outlined dense type="date" v-model="birthday"
              @change="calculateAge" />
            <q-input class="col q-mb-sm" label="Age" outlined dense type="number" v-model="age" readonly />
          </div>
          <q-select class="q-mb-sm" :options="genders" outlined dense label="Gender" />
          <q-input class="q-mb-sm" label="Contact Number" outlined dense />
          <div class="row">
            <q-input class="col q-mb-sm" label="Height (cm)" outlined dense type="number" v-model="height" />
            <q-input class="col q-mb-sm" label="Weight (kg)" outlined dense type="number" v-model="weight" />

          </div>
          <q-input label="Weight Class" outlined dense v-model="weightClass" readonly />
          <q-input class="col q-mb-sm" label="City: San Carlos City" outlined dense type="number" readonly />
          <q-input class="q-mb-sm" label="Last Name" outlined dense />
          <q-select class="q-mb-sm" :options="barangays" outlined dense label="Barangay" />
          <q-input class="q-mb-sm" label="Street Name, Building, House no." outlined dense />
          <q-input class="q-mb-sm" label="Fathers Name" outlined dense />
          <q-input class="q-mb-sm" label="Mothers Name" outlined dense />
          <q-input class="q-mb-sm" label="Legal Guardian that is Present" outlined dense />
          <q-input class="q-mb-sm" label="Contact # of Legal Guardian " outlined dense type="number" />
          <q-separator />
          <q-file class="q-mb-sm" label="Upload Med Cert" outlined dense>
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn label="Add Member" color="red-8" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="viewDetailsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Dummy Data </div>
          <q-separator class="q-my-md" />
          <div><strong>Last Name:</strong> {{ dummyPerson.lastName }}</div>
          <div><strong>First Name:</strong> {{ dummyPerson.firstName }}</div>
          <div><strong>Middle Name:</strong> {{ dummyPerson.middleName }}</div>
          <div><strong>Email:</strong> {{ dummyPerson.email }}</div>
          <div><strong>Birthday:</strong> {{ dummyPerson.birthday }}</div>
          <div><strong>Age:</strong> {{ dummyPerson.birthday }}</div>
          <div><strong>Gender:</strong> {{ dummyPerson.gender }}</div>
          <div><strong>Contact Number:</strong> {{ dummyPerson.contactNumber }}</div>
          <div><strong>Height:</strong> {{ dummyPerson.height }} cm</div>
          <div><strong>Weight:</strong> {{ dummyPerson.weight }} kg</div>
          <div><strong>Weight Class:</strong> {{ dummyPerson.weight }}</div>
          <div><strong>City:</strong> {{ dummyPerson.city }}</div>
          <div><strong>Barangay:</strong> {{ dummyPerson.barangay }}</div>
          <div><strong>Street Name, Building, House No.:</strong> {{ dummyPerson.streetName }}</div>
          <div><strong>Father's Name:</strong> {{ dummyPerson.fathersName }}</div>
          <div><strong>Mother's Name:</strong> {{ dummyPerson.mothersName }}</div>
          <div><strong>Legal Guardian:</strong> {{ dummyPerson.legalGuardian }}</div>
          <div><strong>Contact # of Legal Guardian:</strong> {{ dummyPerson.legalGuardianContact }}</div>
          <div><strong>Med Cert:</strong> {{ dummyPerson.medCert }}</div>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn dense label="Edit" color="primary" v-close-popup />
          <q-btn dense label="Delete" color="red-8" v-close-popup />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const addUserDialog = ref(false)
const viewDetailsDialog = ref(false)
const check = ref(false)
const birthday = ref('')
const age = ref()
const weight = ref(null);
const height = ref(null);

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
  if (birthday.value) {
    const birthdayDate = new Date(birthday.value);
    const today = new Date();
    let ageCalc = today.getFullYear() - birthdayDate.getFullYear();
    const m = today.getMonth() - birthdayDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdayDate.getDate())) {
      ageCalc--;
    }
    age.value = ageCalc;
  } else {
    age.value = '';
  }
}
//CALCULATE WEIGHT CLASS
const weightClass = computed(() => {
  const w = weight.value;

  if (!w || w < 30 || w > 80) {
    return "Invalid Input";
  }
  if (w < 45) {
    return "Pinweight";
  } else if (w < 50) {
    return "Bantamweight";
  } else if (w < 55) {
    return "Featherweight";
  } else if (w < 60) {
    return "Extra Lightweight";
  } else if (w < 66) {
    return "Half Lightweight";
  } else {
    return "Invalid Weight Class";
  }
});
// DUMMY DATA RANI SIR
const columns = [
  { name: 'name', required: true, label: 'Name', align: 'left', field: 'name', sortable: true },
  { name: 'gender', align: 'center', label: 'Gender', field: 'gender', sortable: true },
  { name: 'age', label: 'Age', field: 'age', sortable: true },
  { name: 'address', label: 'Address', field: 'address' },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
]
const rows = [
  {
    name: 'Alice Smith',
    gender: 'Female',
    age: 28,
    address: '123 Maple Street'
  },
  {
    name: 'Bob Johnson',
    gender: 'Male',
    age: 35,
    address: '456 Oak Avenue'
  },
  {
    name: 'Charlie Davis',
    gender: 'Non-Binary',
    age: 40,
    address: '789 Pine Road'
  },
  {
    name: 'Diana Taylor',
    gender: 'Female',
    age: 22,
    address: '321 Birch Lane'
  },
  {
    name: 'Edward Brown',
    gender: 'Male',
    age: 30,
    address: '654 Cedar Blvd'
  },
]
const viewDetails = (row) => {
  console.log('Viewing details for:', row.name);
  viewDetailsDialog.value = true;
  //PUT IN A DIALOG ANG FULL DETAILS
}

const dummyPerson = {
  lastName: 'Doe',
  firstName: 'John',
  middleName: 'Etlog',
  email: 'john.doe@example.com',
  birthday: '1990-01-01', // format YYYY-MM-DD
  age: 21,
  gender: 'Male',
  contactNumber: '123456789',
  height: 180, // in cm
  weight: 70, // in kg
  city: 'San Carlos City',
  barangay: 'Nataban',
  streetName: '123, Elm Street',
  fathersName: 'Richard Doe',
  mothersName: 'Jane Doe',
  legalGuardian: 'N/A',
  legalGuardianContact: '0987654321',
  medCert: 'Insert Med Cert Here kaw na bahala ani sir ahhaha'
};
</script>
