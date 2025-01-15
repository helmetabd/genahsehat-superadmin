<script setup lang="ts">
import Swal from "sweetalert2";
import type { User } from "~/interfaces/user";
import type { Column } from "~/interfaces/utils";
// import img from "~/assets/images/logo.png";
useHead({
  title: "User List",
});

const state = reactive({
  modalAdd: false,
  checked: false,
  columns: [
    {
      name: "id",
      label: "ID",
      sortable: true,
      filterable: true,
    },
    {
      name: "displayName",
      label: "Name User",
      sortable: true,
      filterable: true,
      custom: {
        image: 'imageUrl',
        routeName: 'user-detail',
        params: 'id'
      }
    },
    {
      name: "username",
      label: "Username",
      sortable: true,
      filterable: true,
    },
    {
      name: "email",
      label: "Email",
      sortable: true,
      filterable: true,
    },
    {
      name: "phone",
      label: "No. Handphone",
      sortable: true,
      filterable: true,
    },
    {
      name: "createdAt",
      label: "Tanggal Bergabung",
      sortable: true,
      dateConfig: {
        before: "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
        after: "DD MMM YYYY",
      },
      filterable: true,
    },
    {
      name: "addresses",
      label: "Alamat User",
      sortable: true,
      filterable: true,
      customizeRow: true,
    },
    {
      name: "role",
      label: "Role",
      sortable: true,
      filterable: true,
    },
    {
      name: "isActive",
      label: "Status",
      sortable: true,
      filterable: true,
      customizeRow: true,
      sticky: true,
    },
  ] as Column[],
  users: [] as User[],
  count: { active: 0, inactive: 0, total: 0 },
});

const schema = {
  displayName: {
    type: "text",
    label: "Name User",
    placeholder: "Name User",
    fieldName: "Name User",
    rules: ["required"],
  },
  username: {
    type: "text",
    label: "Username",
    placeholder: "Username",
    fieldName: "Username",
    rules: ["required"],
  },
  email: {
    type: "text",
    inputType: "email",
    label: "Email",
    rules: ["required", "max:255", "email"],
    placeholder: "Email",
    fieldName: "Email",
    description: "You will receive a confirmation letter to this email.",
  },
  phone: {
    type: "phone",
    label: "Phone",
    placeholder: "Phone",
    rules: ["required"],
    fieldName: "Phone",
    allowIncomplete: true,
    unmask: true,
  },
  password: {
    type: "text",
    inputType: "password",
    label: "Password",
    rules: ["required", "min:8", "same:password_confirmation"],
    fieldName: "Password",
    placeholder: "Password",
  },
  password_confirmation: {
    type: "text",
    inputType: "password",
    label: "Password confirmation",
    rules: ["required"],
    fieldName: "Password confirmation",
    placeholder: "Password again",
    submit: false,
  },
  register: {
    type: "button",
    submits: true,
    buttonLabel: "Create User",
    full: true,
  },
};
const { $api } = useNuxtApp();
const { data: users } = await useAsyncData<{
  data: {
    users: User[];
    count: { active: number; inactive: number; total: number };
  };
  message: string;
  statusCode: number;
}>("users", () => $api("/users"));
function toggleHeader(header: string) {
  let index = state.columns.findIndex((col) => col.label === header);
  state.columns[index].hidden = !state.columns[index].hidden;
}
async function clear() {
  state.modalAdd = true;
}
function updateStatus(id: number, name: string, isActive: boolean) {
  try {
    Swal.fire({
      title: `Kamu yakin ingin ${
        !isActive ? "menonaktifkan" : "mengaktifkan"
      } ${name}?`,
      text: !isActive
        ? `User yang dinonaktifkan tidak dapat berbelanja di genahsehat, tetapi kamu bisa mengaktifkannya kembali kapan saja`
        : "User yang telah diaktifkan dapat berbelanja kembali di genahsehat",
      imageUrl: !isActive
        ? "/_nuxt/assets/images/danger-switch.png"
        : "/_nuxt/assets/images/warning-switch.png",
      showCancelButton: true,
      confirmButtonText: "Konfirmasi",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await $api(`/users/${id}`, {
          method: "patch",
          body: { isActive: isActive },
          onResponse() {
            refreshNuxtData("users");
          },
        });

      }
      if (result.isDismissed) {
        const user = users.value?.data?.users?.find((user) => user.id === id);
        if (user) {
          user.isActive = !isActive;
        }
      }
    });
  } catch (error) {}
}
async function addUser(FormData: FormData) {
  const formDataObj = Object.fromEntries(FormData.entries());
  console.log(formDataObj);
  await $api(`/users`, {
    method: "POST",
    body: formDataObj,
    onResponse() {
      refreshNuxtData("users");
      state.modalAdd = false;
    },
  });
}
</script>
<template>
  <div class="row">
    <div class="col-lg-4">
      <CardsSmallCard background-icon="bg-info">
        <template #cardIcon>
          <i class="ri-team-line display-6 text-light"></i>
        </template>
        <template #cardBody>
          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">
            Total Users
          </p>
          <h4 class="mb-0">{{ users?.data.count.total }}</h4>
        </template>
      </CardsSmallCard>
    </div>
    <div class="col-lg-4">
      <CardsSmallCard background-icon="bg-success">
        <template #cardIcon>
          <i class="bx bx-toggle-left display-6 text-light"></i>
        </template>
        <template #cardBody>
          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">
            Active Users
          </p>
          <h4 class="mb-0">{{ users?.data.count.active }}</h4>
        </template>
      </CardsSmallCard>
    </div>
    <div class="col-lg-4">
      <CardsSmallCard background-icon="bg-danger">
        <template #cardIcon>
          <i class="bx bx-toggle-right display-6 text-light"></i>
        </template>
        <template #cardBody>
          <p class="text-uppercase fw-semibold fs-12 text-muted mb-1">
            Deactive Users
          </p>
          <h4 class="mb-0">{{ users?.data.count.inactive }}</h4>
        </template>
      </CardsSmallCard>
    </div>
  </div>
  <CardsBaseCard title="User List" noFooter>
    <template #titleIcon>
      <i class="las la-braille me-1"></i>
    </template>
    <template #cardButton>
      <div class="btn-group btn-sm">
        <button
          class="btn btn-success btn-sm dropdown-toggle m-1"
          type="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="las la-columns"></i> <span class="hide-xs">Column</span>
        </button>
        <div
          class="dropdown-menu p-3 pb-1 fs-11 text-uppercase"
          id="showHideColumn"
          style=""
        >
          <div
            class="form-check form-check-success mb-1 dropdown-item"
            v-for="(toggle, index) in state.columns"
            :key="index"
          >
            <input
              class="form-check-input toggle-vis"
              type="checkbox"
              :checked="!toggle.hidden"
              @change="toggleHeader(toggle.label)"
            />
            {{ toggle.label }}
          </div>
        </div>
        <button
          v-if="checkAdminRole()"
          class="btn btn-primary btn-sm m-1"
          @click="clear"
          type="button"
        >
          <!-- v-if="checkRole('user.users', 'create')" -->
          <i class="ri-add-circle-line align-bottom me-1"></i>Add User
        </button>
      </div>
    </template>
    <template #cardBody>
      <DatatablesDatatableClient
        v-if="users?.data.users"
        :data-table="users.data.users"
        :column="state.columns"
      >
        <template #column-isActive="{ item }">
          <div
            class="form-check form-switch switch-custom form-switch-success text-center"
          >
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              v-model="item.isActive"
              @change="updateStatus(item.id, item.displayName, item.isActive)"
            />
          </div>
        </template>
        <template #column-addresses="{ item }">
          <div v-for="(address, index) in item.addresses" :key="index">
            <template v-if="address.isMain">
              <p class="mb-0">{{ address.details }}</p>
              <p class="mb-0">{{ address.regency }}</p>
              <p class="mb-0">{{ address.province }}</p>
              <p class="mb-0">{{ address.postCode }}</p>
            </template>
          </div>
        </template>
      </DatatablesDatatableClient>
    </template>
  </CardsBaseCard>
  <ModalsModalBasic
    :modelValue="state.modalAdd"
    :title="'Create User'"
    @toggle="state.modalAdd = $event"
  >
    <template #modalBody>
      <Vueform
        :endpoint="false"
        :display-errors="false"
        :schema="schema"
        @submit="
          async (form$: any, FormData: FormData) => {
            addUser(FormData);
          }
        "
      ></Vueform>
    </template>
  </ModalsModalBasic>
</template>
