<template>
  <q-page padding>
    <div class="text-center q-mb-md text-h6 text-bold">Member Information</div>
    <div class="flex flex-start q-gutter-sm q-mb-md">
      <div><q-btn @click="handleMemberDialog" label="Add Member" color="red-8" /></div>
    </div>

    <div class="q-mb-md">
      <q-table :filter="searchMember" class="my-sticky-header-column-table" :loading="isLoadingMembersTable"
        :rows="approvedMembers" :columns="columns" row-key="name">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Verified Members</div>
          <q-input v-model="searchMember" placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-address="props">
          <q-td :props="props">
            <div style="max-width: 300px;" class="ellipsis">
              {{ getAddress(props.row) }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn class="text-bold" flat label="View Details" size="10px" color="red-8"
              @click="viewDetails(props.row, false)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <div>
      <q-table :filter="searchPending" class="my-sticky-header-column-table" :loading="isLoadingMembersTable"
        title="Pending Users" :rows="pendingMembers" :columns="columns" row-key="name">
        <template v-slot:top>
          <div class="text-h6 q-mr-md">Pending Members</div>
          <q-input v-model="searchPending" placeholder="search" outlined dense>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-address="props">
          <q-td :props="props">
            <div style="max-width: 300px;" class="ellipsis">
              {{ getAddress(props.row) }}
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn rounded class="text-bold" label="Verify" color="blue-8" dense size="12px" style="width: 75px"
              @click="viewDetails(props.row, true)" />
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- ADD MEMBER DIALOG -->
    <q-dialog v-model="addUserDialog" @hide="clearForm(form)">
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
            <q-select v-model="form.teamId" option-label="name" :options="teams" option-value="id" emit-value map-options
              class="q-mb-sm" label="Team" outlined dense type="text" :rules="[(val) => !!val]" />
            <div class="row">
              <q-input v-model="form.birthday" class="col q-mb-sm" label="Birthday" outlined dense type="date"
                @update:model-value="calculateAge" :rules="[(val) => !!val]" />
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
            <q-input v-model="form.city" class="col q-mb-sm" outlined dense readonly />
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
            <q-file v-model="medCert" accept=".jpg, image/*" @rejected="onRejected" class="q-mb-sm"
              label="Upload Med Cert" outlined dense>
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

    <!-- Preview member -->
    <q-dialog v-model="viewDetailsDialog">
      <q-card style="border-radius: 12px; max-width: 100vw; width: 500px">
        <q-card-section>
          <div class="flex">
            <div class="text-h6">Member Data </div>
            <q-space />
            <q-btn round dense icon="close" v-close-popup />
          </div>
          <q-separator class="q-my-md" />
          <div class="q-gutter-xs">
            <q-item dense class="q-px-none">
              <q-item-section avatar>
                <q-avatar size="60px" color="red-1">
                  <q-icon size="50px" color="grey-5" name="person" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-subtitle2">{{ getFullname(previewMember) }}</q-item-label>
                <q-item-label class="text-grey" style="font-size: 10px;">Last/First/Middle Name</q-item-label>
              </q-item-section>
            </q-item>

            <div>
              <q-field borderless rounded dense label="Email" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-primary" tabindex="0">{{
                    previewMember.email
                  }}</div>
                </template>
              </q-field>

              <q-field borderless dense label="School" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{
                    previewMember.school
                  }}</div>
                </template>
              </q-field>

              <q-field borderless dense label="Team" stack-label>
                <template v-slot:control>
                  <div class="self-center full-width no-outline text-bold" tabindex="0">{{
                    previewMember?.team?.name ?? 'Not available'
                  }}</div>
                </template>
              </q-field>
            </div>

            <div class="q-pa-sm rb-1 q-gutter-xs" style="border: 1px solid grey;">
              <div><strong>Birthday:</strong> {{ previewMember.birthday }}</div>
              <div><strong>Age:</strong> {{ previewMember.age }}</div>
              <div><strong>Gender:</strong> {{ previewMember.gender }}</div>
              <div><strong>Contact Number:</strong> {{ previewMember.contactNo }}</div>
              <div><strong>Height:</strong> {{ previewMember.height }} cm</div>
              <div><strong>Weight:</strong> {{ previewMember.weight }} kg</div>
              <div><strong>Weight Class:</strong> {{ previewMember.weightClass }}</div>
              <div><strong>City:</strong> {{ previewMember.city == '' ? 'San Carlos City' : previewMember.city }}</div>
              <div><strong>Barangay:</strong> {{ previewMember.barangay }}</div>
              <div><strong>Street Name, Building, House No.:</strong> {{ previewMember.street }}</div>
              <div><strong>Father's Name:</strong> {{ previewMember.fathersName }}</div>
              <div><strong>Mother's Name:</strong> {{ previewMember.mothersName }}</div>
              <div><strong>Legal Guardian:</strong> {{ previewMember.legalGuardian }}</div>
              <div><strong>Contact # of Legal Guardian:</strong> {{ previewMember.legalGuardianContact }}</div>
              <div><strong>Med Cert:</strong> <q-btn @click="viewMedCert" flat size="12px"
                  class="text-indigo text-bold q-ml-sm" label="View Details" dense />
              </div>
            </div>
          </div>
          <q-card-actions v-if="pendingMode" align="right">
            <q-btn @click="acceptMember(previewMember)" label="Accept" color="primary" v-close-popup />
            <q-btn @click="deleteMember(previewMember)" label="Reject" color="red-8" v-close-popup />
          </q-card-actions>
          <q-card-actions v-else align="right">
            <q-btn @click="editMember(previewMember)" label="Edit" color="primary" v-close-popup />
            <q-btn @click="deleteMember(previewMember)" label="Delete" color="red-8" v-close-popup />
          </q-card-actions>
        </q-card-section>
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
            <q-img v-if="previewMember.medCert" :src="previewMember.medCert" />
            <div v-else>
              Still uploading...
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-dialog>

  </q-page>
</template>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: auto

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: auto

  // td:first-child
    /* bg color is important for td; just specify one */
    // background-color: #7D0A0A
    // color: white

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #c3312d
    color: white

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>

<script setup>
import { ref, reactive, computed, onBeforeMount, onMounted } from 'vue'
import { useMemberStore } from 'src/stores/members';
import { useQuasar } from 'quasar';
import { getFullname, getAddress } from 'src/composables/filters'
import { useTeamStore } from 'src/stores/teams';

const addUserDialog = ref(false)
const viewDetailsDialog = ref(false)
const searchMember = ref("")
const searchPending = ref("")
const medCert = ref(null)
const medCertDialog = ref(false)
const $q = useQuasar()
const maximizedToggle = ref(true)
const memberStore = useMemberStore()
const teams = computed(() => useTeamStore().teams)

const onRejected = (rejectedEntries) => {
  $q.dialog({
    title: 'Opps',
    message: `File did not pass validation constraints. File is invalid.`
  })
}

const form = reactive({
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  school: "",
  teamId: "",
  birthday: "",
  age: "",
  gender: "",
  contactNo: "",
  height: "",
  weight: "",
  weightClass: "",
  barangay: "",
  city: "San Carlos City",
  street: "",
  fathersName: "",
  mothersName: "",
  legalGuardian: "",
  legalGuardianContact: ""
})

const clearForm = (form) => {
  Object.keys(form).forEach((key) => {
    form[key] = "";
  });
};

const handleMemberDialog = () => {
  previewMember.value = null
  addUserDialog.value = true
}

const deleteMember = (data) => {
  viewDetailsDialog.value = false
  useMemberStore().delete(data, data.medCert ?? null)
}


const isLoading = ref(false)
const createMember = async () => {
  form.approved = true;
  isLoading.value = true;
  try {
    if (medCert.value) {
      const res = await useMemberStore().create(form, medCert.value);
      if (res) {
        addUserDialog.value = false;
      } else {
        console.error("Member creation failed");
      }
    } else {
      $q.dialog({
        title: "Oops!",
        message: "You need to upload the medical certificate.",
      });
    }
  } catch (error) {
    console.error("Error in member creation:", error);
  } finally {
    isLoading.value = false;
  }
};


const updateMember = async () => {
  isLoading.value = true
  // Check if medcert available
  let file = null
  if (medCert.value) {
    file = medCert.value
  }
  const res = await useMemberStore().update(form.id, form, file)

  isLoading.value = false
  if (res) {
    addUserDialog.value = false
  }
}

const acceptMember = async (memberData) => {
  $q.loading.show()
  const res = await useMemberStore().update(memberData.id, { approved: true }, null, {
    type: 'accepted',
    teamId: memberData.teamId,
    data: memberData
  })

  $q.loading.hide()
}

const rejectMember = async (id) => {
  $q.loading.show()
  const res = await useMemberStore().update(id, { approved: false, rejected: true })
  $q.loading.hide()
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
    form.age = parseInt(ageCalc);
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
  { name: 'address', label: 'Address', format: (val, row) => getAddress(row), align: "left", field: 'address' },
  { name: 'team', label: 'Team', field: 'team', format: (val) => val?.name, align: "left", sortable: true },
  { name: 'action', label: 'Actions', align: 'center', sortable: false }
]

const approvedMembers = computed(() => useMemberStore().getApproved)
const pendingMembers = computed(() => useMemberStore().getPending)

const pendingMode = ref(false)
const viewDetails = (data, pending) => {
  pendingMode.value = pending
  viewDetailsDialog.value = true;
  const memberDataCopy = { ...data };
  memberDataCopy.weightClass = calculateWeightClass(data.weight, data.gender);
  previewMember.value = memberDataCopy;
};

const previewMember = ref(null)

const isLoadingMembersTable = ref(false)
const fetchMembers = async () => {
  isLoadingMembersTable.value = true
  await useMemberStore().fetchAll()
  isLoadingMembersTable.value = false
}

const editMember = (data) => {
  Object.assign(form, { ...data, city: 'San Carlos City' })
  addUserDialog.value = true
}

onMounted(async () => {
  await fetchMembers()
})

const fetchTeams = async () => {
  await useTeamStore().fetchAll()
}

onBeforeMount(() => fetchTeams())
</script>
