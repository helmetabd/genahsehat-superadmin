<script setup lang="ts">
definePageMeta({
  name: "user-detail",
});
import type { State, User } from "~/interfaces/user";
import type { FormField, Option } from "~/interfaces/utils";

const router = useRoute();
const { $api } = useNuxtApp();

const state = reactive({
  user: {} as User,
  userId: router.params.id,
  userProfileFormField: {} as FormField,
  profileModal: false,
  checked: false,
  editParams: {
    status: [
      { label: "Active", value: true },
      { label: "Not Active", value: false },
    ] as Option[],
    role: [
      { label: "Super Admin", value: "superadmin" },
      { label: "Store Owner", value: "store-owner" },
      { label: "User", value: "user" },
    ] as Option[],
  }
  // schema: {
  //   role: {
  //     type: "select",
  //     label: "Role",
  //     placeholder: "Select Role",
  //     fieldName: "Role",
  //     rules: ["required"],
  //     options: [
  //       { label: "Super Admin", value: "superadmin" },
  //       { label: "Store Owner", value: "store-owner" },
  //       { label: "User", value: "user" },
  //     ],
  //   },
  //   displayName: {
  //     type: "text",
  //     label: "Name User",
  //     placeholder: "Name User",
  //     fieldName: "Name User",
  //     rules: ["required"],
  //   },
  //   username: {
  //     type: "text",
  //     label: "Username",
  //     placeholder: "Username",
  //     fieldName: "Username",
  //     rules: ["required"],
  //   },
  //   email: {
  //     type: "text",
  //     inputType: "email",
  //     label: "Email",
  //     rules: ["required", "max:255", "email"],
  //     placeholder: "Email",
  //     fieldName: "Email",
  //     description: "You will receive a confirmation letter to this email.",
  //   },
  //   phone: {
  //     type: "phone",
  //     label: "Phone",
  //     placeholder: "Phone",
  //     rules: ["required"],
  //     fieldName: "Phone",
  //     allowIncomplete: true,
  //     unmask: true,
  //   },
  //   password: {
  //     type: "text",
  //     inputType: "password",
  //     label: "Password",
  //     rules: ["required", "min:8", "same:password_confirmation"],
  //     fieldName: "Password",
  //     placeholder: "Password",
  //   },
  //   password_confirmation: {
  //     type: "text",
  //     inputType: "password",
  //     label: "Password confirmation",
  //     rules: ["required"],
  //     fieldName: "Password confirmation",
  //     placeholder: "Password again",
  //     submit: false,
  //   },
  //   isActive: {
  //     type: "select",
  //     label: "Status",
  //     placeholder: "Select Status",
  //     fieldName: "Status",
  //     rules: ["required"],
  //     options: [
  //       { label: "Active", value: true },
  //       { label: "Not Active", value: false },
  //     ],
  //   },
  //   checkbox: {
  //     type: "checkbox",
  //     text: "Confirm",
  //     submit: false,
  //   },
  //   register: {
  //     align: "right",
  //     type: "button",
  //     submits: true,
  //     disabled: [["checkbox", "==", true]],
  //     buttonLabel: "Update User",
  //   },
  // },
});

const schema = {
  role: {
    type: "select",
    label: "Role",
    placeholder: "Select Role",
    fieldName: "Role",
    rules: ["required"],
    items: [
      { label: "Super Admin", value: "superadmin" },
      { label: "Store Owner", value: "store-owner" },
      { label: "User", value: "user" },
    ],
  },
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
  isActive: {
    type: "select",
    label: "Status",
    placeholder: "Select Status",
    fieldName: "Status",
    rules: ["required"],
    items: [
      { label: "Active", value: true },
      { label: "Not Active", value: false },
    ],
  },
  checkbox: {
    type: "checkbox",
    text: "Confirm",
    submit: false,
  },
  register: {
    align: "right",
    type: "button",
    submits: true,
    disabled: [["checkbox", "==", true]],
    buttonLabel: "Update User",
  },
};

await useAsyncData<{
  data: User;
  message: string;
  statusCode: number;
}>("user", () =>
  $api(`/users/${router.params.id}`, {
    onResponse(response) {
      state.user = response.response._data.data;
    },
  })
);

// async function goToCreator(creatorId: number) {
//   user = await userService.detail(creatorId);
//   // this.fetchLogs(creatorId);
// }

// const fetchstate = async () => {
//   try {
//     user = await userService.detail(Number(userId));
//   } catch (error: any) {
//     Swal.fire("error", error.response.message, "error");
//   }
// };

async function onSubmit(FormData: FormData) {
  const formDataObj = Object.fromEntries(FormData.entries());
  console.log(formDataObj);
  await $api(`/users`, {
    params: { id: router.params.id },
    method: "PATCH",
    body: formDataObj,
    onResponse() {
      refreshNuxtData("user");
      state.profileModal = false;
    },
  });
}

async function toggleProfileModal() {
  try {
    // const res = await userService.edit(Number(router.params.id));
    // const { data: user, params: params } = res;
    // state.editParams = params;
    // state.inputProfile.forEach((element) => {
    //   userProfileFormField[element.name as keyof FormField] = user[
    //     element.name as keyof User
    //   ] as string | number;
    // });
    // userProfileFormField.role = user.role_id;
    // userProfileFormField.status = user.status;
    state.profileModal = true;
  } catch (error: any) {
    responseHelper("error", error);
  }
}

const avatar = (avatar: string | null | undefined) => getAvatar(avatar);
</script>

<template>
  <div class="profile-foreground position-relative mx-n4 mt-n4">
    <div class="profile-wid-bg">
      <img
        src="../../assets/images/login_bg_result.webp"
        class="profile-wid-img"
      />
    </div>
  </div>
  <div class="pt-4 mb-4 mb-lg-3 pb-lg-4">
    <div class="row g-4">
      <div class="col-auto">
        <div class="avatar-lg">
          <img
            :src="avatar(state.user.imageUrl)"
            class="img-thumbnail rounded-circle"
          />
        </div>
      </div>
      <!--end col-->
      <div class="col">
        <div class="p-2">
          <h3 class="text-white mb-1">{{ state.user.displayName }}</h3>

          <div class="hstack text-white-50 gap-1">{{ state.user.role }}</div>
        </div>
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </div>
  <div class="row">
    <CardsBaseCard
      title="User"
      card-class="card card-detail"
      tableCard
      noFooter
    >
      <template #titleIcon>
        <i class="las la-user"></i>
      </template>
      <template #cardButton>
        <div class="btn-group" v-if="checkAdminRole()">
          <button
            type="button"
            class="btn btn-sm btn-primary m-1"
            @click="toggleProfileModal"
          >
            <i class="ri-user-settings-line align-bottom me-1"></i>
            Edit Profile
          </button>

          <!-- <NuxtLink
              :to="{ name: 'user.privileges', params: { id: userId } }"
              class="btn btn-sm btn-success m-1"
            >
              <i class="ri-shield-user-line align-bottom me-1"></i>
              Edit Privileges
            </NuxtLink> -->
          <!-- <button class="btn btn-sm btn-info m-1" @click="fixPrivilege()">
              <i class="bx bx-wrench align-middle me-1"></i>
              Fix Privilege
            </button> -->
        </div>
      </template>
      <template #cardBody>
        <div class="row">
          <div class="col-md-4">
            <span class="text-muted text-uppercase fs-11">Name</span>
            <div
              class="fs-12 fw-semibold border-bottom pb-2 mb-3 text-uppercase"
            >
              <i class="las la-braille me-1 text-info"></i>
              <strong>{{ state.user.displayName }}</strong>
            </div>
          </div>
          <!--End Col-->

          <div class="col-md-4">
            <span class="text-muted text-uppercase fs-11">User Role</span>
            <div class="fs-12 border-bottom pb-2 mb-3 text-uppercase">
              <i class="las la-braille me-1 text-info"></i>
              {{ state.user.role }}
            </div>
          </div>
          <!--End Col-->

          <div class="col-md-4">
            <span class="text-muted text-uppercase fs-11">Status</span>
            <div class="border-bottom pb-2 mb-3 text-uppercase">
              <i class="las la-braille me-1 text-info"></i>
              <span
                v-if="state.user.isActive == true"
                class="bg-success-subtle text-success rounded p-1 fs-10"
                >Active</span
              >
              <span
                v-else-if="state.user.isActive == false"
                class="bg-danger-subtle text-danger rounded p-1 fs-10"
                >Suspended</span
              >
              <span
                v-else
                class="bg-success-subtle text-success rounded p-1 fs-10"
                >Suspended</span
              >
            </div>
          </div>
          <!--End Col-->
        </div>

        <div class="row">
          <div class="col-md-4">
            <span class="text-muted text-uppercase fs-11">Email</span>
            <div class="fs-12 border-bottom pb-2 mb-3 text-uppercase">
              <i class="las la-braille me-1 text-info"></i>
              {{ state.user.email }}
            </div>
          </div>
          <!--End Col-->
          <div class="col-md-4">
            <span class="text-muted text-uppercase fs-11">Phone</span>
            <div class="fs-12 border-bottom pb-2 mb-3 text-uppercase">
              <i class="las la-braille me-1 text-info"></i>
              {{ state.user.phone }}
            </div>
          </div>
          <!--End Col-->
        </div>
      </template>
      <template #customFooter>
        <div class="card-footer bg-light pt-2 pb-2">
          <div class="row">
            <div class="col-8">
              <nav aria-label="breadcrumb mb-0">
                <ol class="breadcrumb text-uppercase mb-0 pt-1">
                  <li class="breadcrumb-item">
                    <i class="las la-map-marker me-1 text-muted"></i>
                    <router-link :to="{ name: 'user' }" class="text-info">
                      <strong>Users</strong>
                    </router-link>
                  </li>
                  <li
                    class="breadcrumb-item active hide-xs"
                    aria-current="page"
                  >
                    {{ state.user.displayName }}
                  </li>
                </ol>
              </nav>
            </div>
            <div class="col-4 text-end">&nbsp;</div>
          </div>
        </div>
      </template>
    </CardsBaseCard>
  </div>
  <ModalsModalBasic
    title="Update User"
    :modelValue="state.profileModal"
    @toggle="state.profileModal = $event"
  >
    <template #modalBody>
      <Vueform sync
        v-model="state.user"
        :endpoint="false"
        :display-errors="false"
        :schema="schema"
        @submit="
          async (form$: any, FormData: FormData) => {
            onSubmit(FormData);
          }
        "
      ></Vueform>
    </template>
  </ModalsModalBasic>
</template>
