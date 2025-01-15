<script setup lang="ts">
definePageMeta({
  name: "user-detail",
});
import type { State, User, UserForm } from "~/interfaces/user";
import type { FormField, Option } from "~/interfaces/utils";
import PasswordToggleElement from "../../components/partials/customPasswordField.vue";

const router = useRoute();
const { $api } = useNuxtApp();

const state = reactive({
  user: {} as User,
  userId: router.params.id,
  userProfileFormField: {} as UserForm,
  userPasswordForm: {} as { password: string },
  profileModal: false,
  passwordModal: false,
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
  },
  showPassword: false,
  showPasswordConfirmation: false,
});

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// Validation schema using Yup
const validationSchema = yup.object({
  role: yup.string().required("Role is required"),
  displayName: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^(?:\+62|62|0)8[1-9][0-9]{7,10}$/,
      "Invalid Indonesian phone number format"
    )
    .required("Phone number is required"),
  isActive: yup.string().required("Status is required"),
  // confirm: yup.boolean().oneOf([true], "You must confirm before submitting"),
});
const validationPasswordSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Password confirmation is required"),
});

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

async function onSubmit(values: Record<string, any>) {
  const { confirm, ...rest } = values;
  let formDataObj = rest;
  if (values.password_confirmation) {
    const { password_confirmation, ...object } = formDataObj;
    formDataObj = object
  }
  if(values.phone){
    formDataObj.phone = convertPhoneNumber(formDataObj.phone)
  }
  console.log(formDataObj);
  await $api(`/users/${router.params.id}`, {
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
    const {
      id,
      isEmailVerified,
      isPhoneVerified,
      image,
      purchaseCounts,
      gsPoints,
      hasStore,
      createdAt,
      updatedAt,
      imageUrl,
      ...dataUser
    } = state.user;
    state.userProfileFormField = dataUser;
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
      <template #titleIcon> <i class="las la-user"></i> </template>54
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
          <button
            type="button"
            class="btn btn-sm btn-info m-1"
            @click="state.passwordModal = true"
          >
            <i class="ri-user-settings-line align-bottom me-1"></i>
            Edit Password
          </button>
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
                    <NuxtLink :to="{ name: 'user' }" class="text-info">
                      <strong>Users</strong>
                    </NuxtLink>
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
      <Form
        @submit="onSubmit"
        class="needs-validation"
        :validation-schema="validationSchema"
        :initial-values="state.userProfileFormField"
        v-slot="{ errors, values }"
      >
        <!-- Role -->
        <div class="mb-3">
          <label for="role" class="form-label">Role</label>
          <Field as="select" name="role" id="role" class="form-select">
            <option value="" disabled>Select Role</option>
            <option
              v-for="option in state.editParams.role"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </Field>
          <ErrorMessage name="role" class="text-danger" />
        </div>

        <!-- Name -->
        <div class="mb-3">
          <label for="displayName" class="form-label">Name User</label>
          <Field
            name="displayName"
            id="displayName"
            class="form-control"
            placeholder="Name User"
          />
          <ErrorMessage name="displayName" class="text-danger" />
        </div>

        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <Field
            name="username"
            id="username"
            class="form-control"
            placeholder="Username"
          />
          <ErrorMessage name="username" class="text-danger" />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <Field
            name="email"
            id="email"
            type="email"
            class="form-control"
            placeholder="Email"
          />
          <ErrorMessage name="email" class="text-danger" />
          <div class="form-text">
            You will receive a confirmation letter to this email.
          </div>
        </div>

        <!-- Phone -->
        <div class="mb-3">
          <label for="phone" class="form-label">Phone</label>
          <Field
            name="phone"
            id="phone"
            class="form-control"
            placeholder="Phone"
          />
          <ErrorMessage name="phone" class="text-danger" />
        </div>

        <!-- Status -->
        <div class="mb-3">
          <label for="isActive" class="form-label">Status</label>
          <Field as="select" name="isActive" id="isActive" class="form-select">
            <option value="" disabled>Select Status</option>
            <option value="true">Active</option>
            <option value="false">Not Active</option>
          </Field>
          <ErrorMessage name="isActive" class="text-danger" />
        </div>

        <!-- Confirm & Button -->
        <div class="row mx-0">
          <div class="form-check col-6">
            <!-- Confirm -->
            <Field
              name="confirm"
              id="confirm"
              type="checkbox"
              class="form-check-input"
              :unchecked-value="false"
              value="true"
            />
            <!-- standalone -->
            <!-- v-model="state.checked" -->
            <label class="form-check-label" for="confirm"> Confirm </label>
          </div>
          <div class="col-6 pe-0">
            <div class="hstack justify-content-end">
              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="!values.confirm"
                class="btn btn-primary"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </Form>
    </template>
  </ModalsModalBasic>
  <ModalsModalBasic
    title="Update Password"
    :modelValue="state.passwordModal"
    @toggle="state.passwordModal = $event"
  >
    <template #modalBody>
      <Form
        @submit="onSubmit"
        class="needs-validation"
        :validation-schema="validationPasswordSchema"
        :initial-values="state.userPasswordForm"
        v-slot="{ errors, values }"
      >
        <!-- Password -->
        <div class="position-relative auth-pass-inputgroup mb-3">
          <label for="password" class="form-label">Password</label>
          <Field
            name="password"
            id="password"
            :type="state.showPassword ? 'text' : 'password'"
            class="form-control pe-5"
            placeholder="Password"
          />
          <button
            class="position-absolute end-0 text-decoration-none text-muted btn btn-link"
            style="top: 40%"
            type="button"
            id="password-addon"
            @click="state.showPassword = !state.showPassword"
          >
            <i class="ri-eye-fill align-middle"></i>
          </button>
          <ErrorMessage name="password" class="text-danger" />
        </div>

        <!-- Password Confirmation -->
        <div class="position-relative auth-pass-inputgroup mb-3">
          <label for="password_confirmation" class="form-label"
            >Password Confirmation</label
          >
          <Field
            name="password_confirmation"
            id="password_confirmation"
            :type="state.showPasswordConfirmation ? 'text' : 'password'"
            class="form-control pe-5"
            placeholder="Password Again"
          />
          <button
            class="position-absolute end-0 text-decoration-none text-muted btn btn-link"
            style="top: 40%"
            type="button"
            id="password-addon"
            @click="
              state.showPasswordConfirmation = !state.showPasswordConfirmation
            "
          >
            <i class="ri-eye-fill align-middle"></i>
          </button>
          <ErrorMessage name="password_confirmation" class="text-danger" />
        </div>
        <div class="row mx-0">
          <div class="form-check col-6">
            <!-- Confirm -->
            <Field
              name="confirm"
              id="confirm"
              type="checkbox"
              class="form-check-input"
              :unchecked-value="false"
              value="true"
            />
            <!-- standalone -->
            <!-- v-model="state.checked" -->
            <label class="form-check-label" for="confirm"> Confirm </label>
          </div>
          <div class="col-6 pe-0">
            <div class="hstack justify-content-end">
              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="!values.confirm"
                class="btn btn-primary"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </Form>
    </template>
  </ModalsModalBasic>
</template>
