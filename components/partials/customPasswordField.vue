<template>
  <!-- <div :class="elementClass">
    <label v-if="field.label" :for="field.id" :class="labelClass">
      {{ field.label }}
    </label>

    <div class="password-input-wrapper">
      <input
        v-bind="inputProps"
        v-model="value"
        :type="showPassword ? 'text' : 'password'"
        :id="field.id"
        class="password-input"
      />
      <button
        type="button"
        @click="togglePassword"
        class="password-toggle-button"
      >
        {{ showPassword ? "Hide" : "Show" }}
      </button>
    </div>

    <span v-if="errors.length" :class="errorClass">
      {{ errors[0] }}
    </span>
  </div> -->
  <div class="vf-element-layout vf-col-12 vf-text-type">
    <div class="vf-element-layout-outer-wrapper">
      <label
        class="vf-label vf-col-12 vf-vertical-label"
        for="password_confirmation"
        id="password_confirmation__label"
        ><span class="">Password confirmation</span></label
      >
      <div class="vf-layout-inner-container vf-col-12">
        <div class="vf-layout-inner-wrapper-before"></div>
        <div class="vf-layout-inner-wrapper vf-col-12">
          <div class="vf-input-group vf-input-group-success">
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              class="vf-input-field"
              placeholder="Password again"
              aria-labelledby="password_confirmation__label"
              aria-describedby="password_confirmation__description password_confirmation__info"
              aria-invalid="false"
              aria-errormessage="password_confirmation__error"
              aria-disabled="false"
              aria-busy="false"
              value="Sshd_1234"
            />
            <div class="vf-addon vf-addon-after">
              <div class="vf-addon-wrapper">
                <button
                  type="button"
                >
                  <!-- @click="
                                (form$, el$) => {
                                console.log(form$)
                                form$.el$('password')?.inputType = 'text'
                                }
                              " -->
                  <i class="ri-eye-fill align-middle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="vf-layout-inner-wrapper-after"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineElement } from "@vueform/vueform";

export default defineElement({
  name: "PasswordToggleElement",

  props: {
    value: {
      type: String,
      default: "",
    },
    field: {
      type: Object,
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    inputProps: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      showPassword: false,
    };
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
});
</script>

<style scoped>
.password-input-wrapper {
  display: flex;
  align-items: center;
}

.password-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.password-toggle-button {
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
}

.password-toggle-button:hover {
  text-decoration: underline;
}

label {
  margin-bottom: 0.5rem;
  display: block;
  font-weight: bold;
}

.error {
  color: red;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}
</style>
