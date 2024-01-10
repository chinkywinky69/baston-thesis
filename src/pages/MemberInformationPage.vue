<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Member Information</div>
    <div class="flex flex-start q-gutter-sm q-mb-md">
      <div><q-btn @click="addUserDialog = true" label="Add Member" color="red-8" /></div>
      <div style="width:350px">
        <q-input v-model="search" label="search" filled bg-color="white" outlined dense />
      </div>
    </div>

    <div class="q-mb-md">
      <q-table title="Verified Users" :rows="membersData" :columns="columns" row-key="name">
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat label="View Details" color="red-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div>
      <!-- <q-table title="Pending Users" :rows="membersData" :columns="columns" row-key="name">
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn flat label="Reject" color="red-8" @click="viewDetails(props.row)" />
            <q-btn flat label="Accept" color="green-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table> -->
    </div>

    <!-- ADD MEMBER DIALOG -->
    <q-dialog v-model="addUserDialog">
      <q-card style="width: 400px">
        <q-form @submit="createMember">
          <q-card-section>
            <div class="text-bold text-h6 q-mb-md">Add Member</div>
            <q-input v-model="form.lastName" class="q-mb-sm" label="Last Name" outlined dense :rules="[(val) => !!val]" />
            <q-input v-model="form.firstName" class="q-mb-sm" label="First Name" outlined dense />
            <q-input v-model="form.middleName" class="q-mb-sm" label="Middle Name" outlined dense />
            <q-input v-model="form.email" class="q-mb-sm" label="Email" outlined dense type="email" />
            <div class="row">
              <q-input v-model="form.birthday" class="col q-mb-sm" label="Birthday" outlined dense type="date"
                @change="calculateAge" />
              <q-input v-model="form.age" class="col q-mb-sm" label="Age" outlined dense type="number" readonly />
            </div>
            <q-select v-model="form.gender" class="q-mb-sm" :options="genders" outlined dense label="Gender" />
            <q-input v-model="form.contactNo" class="q-mb-sm" label="Contact Number" outlined dense />
            <div class="row">
              <q-input v-model="form.height" class="col q-mb-sm" label="Height (cm)" outlined dense type="number" />
              <q-input v-model="form.weight" class="col q-mb-sm" label="Weight (kg)" outlined dense type="number" />

            </div>
            <q-input v-model="form.weightClass" label="Weight Class" outlined dense readonly />
            <q-input class="col q-mb-sm" label="City: San Carlos City" outlined dense type="number" readonly />
            <q-select v-model="form.barangay" class="q-mb-sm" :options="barangays" outlined dense label="Barangay" />
            <q-input v-model="form.address" class="q-mb-sm" label="Street Name, Building, House no." outlined dense />
            <q-input v-model="form.fathersName" class="q-mb-sm" label="Fathers Name" outlined dense />
            <q-input v-model="form.mothersName" class="q-mb-sm" label="Mothers Name" outlined dense />
            <q-input v-model="form.legalGuardian" class="q-mb-sm" label="Legal Guardian that is Present" outlined dense />
            <q-input v-model="form.legalGuardianContact" class="q-mb-sm" label="Contact # of Legal Guardian " outlined
              dense type="number" />
            <q-separator />
            <q-file v-model="medCert" class="q-mb-sm" label="Upload Med Cert" outlined dense>
              <template v-slot:prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <q-btn :loading="isLoading" type="submit" label="Add Member" color="red-8" />
          </q-card-section>
        </q-form>
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
import { ref, reactive, computed, onMounted } from 'vue'
import { useMemberStore } from 'src/stores/members';
import { useQuasar } from 'quasar';

const addUserDialog = ref(false)
const viewDetailsDialog = ref(false)
const search = ref("")
const medCert = ref(null)
const $q = useQuasar()

const form = reactive({
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
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

const isLoading = ref(false)
const createMember = async () => {
  isLoading.value = true
  // Check if medcert available
  const res = await useMemberStore().create(form)
  if (form.medCert) {
  } else {
    $q.dialog({
      title: "Oops!",
      message: "You need to upload the medical certificate.",
    })
  }
  isLoading.value = false
  if (res) {
    addUserDialog.value = false
  }
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
const weightClass = computed(() => {
  const w = form.weight;

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

const membersData = [
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

onMounted(() => {
  Object.assign(form, dummyPerson)
})
</script>
