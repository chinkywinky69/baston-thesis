<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Member Information</div>
    <div class="flex flex-start q-gutter-sm q-mb-md">
      <div><q-btn @click="handleMemberDialog" label="Add Member" color="red-8" /></div>
    </div>

    <div class="q-mb-md">
      <q-table :loading="isLoadingMembersTable" :rows="membersData" :columns="columns" row-key="name">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Verified Members</div>
          <q-input placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn class="text-bold" flat label="View Details" color="red-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div>
      <q-table title="Pending Users" :rows="membersData" :columns="columns" row-key="name">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Pending Members</div>
          <q-input placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn class="text-bold" flat label="View Details" color="blue-8" @click="viewDetails(props.row)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- ADD MEMBER DIALOG -->
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
            <q-input v-model="form.weightClass" label="Weight Class" outlined dense readonly />
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
            <q-input v-model="form.legalGuardianContact" class="q-mb-sm" label="Contact # of Legal Guardian " outlined
              dense type="number" :rules="[(val) => !!val]" />
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
    <q-dialog v-model="viewDetailsDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Member Data </div>
          <q-separator class="q-my-md" />
          <div><strong>Last Name:</strong> {{ previewMember.lastName }}</div>
          <div><strong>First Name:</strong> {{ previewMember.firstName }}</div>
          <div><strong>Middle Name:</strong> {{ previewMember.middleName }}</div>
          <div><strong>Email:</strong> {{ previewMember.email }}</div>
          <div><strong>School:</strong> {{ previewMember.school }}</div>
          <div><strong>Birthday:</strong> {{ previewMember.birthday }}</div>
          <div><strong>Age:</strong> {{ previewMember.birthday }}</div>
          <div><strong>Gender:</strong> {{ previewMember.gender }}</div>
          <div><strong>Contact Number:</strong> {{ previewMember.contactNumber }}</div>
          <div><strong>Height:</strong> {{ previewMember.height }} cm</div>
          <div><strong>Weight:</strong> {{ previewMember.weight }} kg</div>
          <div><strong>Weight Class:</strong> {{ previewMember.weight }}</div>
          <div><strong>City:</strong> {{ previewMember.city }}</div>
          <div><strong>Barangay:</strong> {{ previewMember.barangay }}</div>
          <div><strong>Street Name, Building, House No.:</strong> {{ previewMember.street }}</div>
          <div><strong>Father's Name:</strong> {{ previewMember.fathersName }}</div>
          <div><strong>Mother's Name:</strong> {{ previewMember.mothersName }}</div>
          <div><strong>Legal Guardian:</strong> {{ previewMember.legalGuardian }}</div>
          <div><strong>Contact # of Legal Guardian:</strong> {{ previewMember.legalGuardianContact }}</div>
          <div><strong>Med Cert:</strong> {{ previewMember.medCert }} <q-btn @click="viewMedCert" class="q-ml-sm"
              label="View Details" dense />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn @click="editMember(previewMember)" dense label="Accept" color="green-8" v-close-popup />
          <q-btn @click="deleteMember(previewMember)" dense label="Reject" color="red-8" v-close-popup />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
      <!-- view medcert dialog -->
      <q-dialog :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down"
        v-model="medCertDialog">
        <q-card style="width: 850px;">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Med Cert</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <q-img
              src="https://preview.redd.it/n9p8aheg9jw91.jpg?width=1080&format=pjpg&auto=webp&s=73d5a30807275340645d8dbc9586cffa598a86ff" />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useMemberStore } from 'src/stores/members';
import { useQuasar } from 'quasar';
import { getFullname, getAddress } from 'src/composables/filters'

const addUserDialog = ref(false)
const viewDetailsDialog = ref(false)
const search = ref("")
const medCert = ref(null)
const medCertDialog = ref(false)
const $q = useQuasar()
const maximizedToggle = ref(true)

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

const deleteMember = (data) => {
  viewDetailsDialog.value = false
  useMemberStore().delete(data.id)
}


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

const updateMember = async () => {
  isLoading.value = true
  // Check if medcert available
  const res = await useMemberStore().update(form.id, form)
  // if (form.medCert) {
  // } else {
  //   $q.dialog({
  //     title: "Oops!",
  //     message: "You need to upload the medical certificate.",
  //   })
  // }
  isLoading.value = false
  if (res) {
    addUserDialog.value = false
  }
}

const viewMedCert = () => {
  medCertDialog.value = true
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
    return "Open Weight";
  }
});

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
</script>
