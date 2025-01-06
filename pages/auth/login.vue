<script setup lang="ts">
import { required, helpers } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import type { Container, IOptions } from "@tsparticles/engine";
const router = useRouter();
const state = reactive({
  submitted: false,
  togglePassword: false,
  authError: null,
  tryingToLogIn: false,
  isAuthError: false,
  processing: false,
  configParticles: {
    fullScreen: {
      enable: true,
      zIndex: -1,
    },
    detectRetina: true,
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          height: 1000,
          width: 1000,
        },
      },
      color: {
        value: "#ffffff",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: false,
          speed: 1,
          sync: false,
        },
      },
      size: {
        value: 4,
        animation: {
          enable: false,
          speed: 40,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 3,
        direction: "top",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: {
          enable: true,
        },
      },
    },
  } as IOptions,
});
const onLoad = (container: Container) => {
  // Do something with the container
  container.pause();
  setTimeout(() => container.play(), 2000);
};
const submitForm = reactive({
  user_identity: null,
  password: "",
});
const authStore = useAuthStore();
const { loading, error } = storeToRefs(authStore);
const rules = {
  user_identity: {
    required: helpers.withMessage("User Identity is required", required),
  },
  password: { required: helpers.withMessage("Password is required", required) },
};
const $v = useVuelidate(rules, submitForm);
const signIn = async () => {
  await $v.value.$validate();
  let loginData = {
    email: submitForm.user_identity,
    password: submitForm.password,
  };
  authStore.signIn(loginData).then(() => router.push({ name: "Dashboard" }));
};
</script>

<template>
  <!-- <div class="auth-page-wrapper pt-5"> -->
  <div
    class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="auth-one-bg" id="auth-particles">
      <NuxtParticles
        id="tsparticles"
        class="bg-overlay"
        @load="onLoad"
        :options="state.configParticles"
      />
    </div>
    <!-- <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <NuxtParticles
        id="tsparticles"
        class="bg-overlay"
        @load="onLoad"
        :options="state.configParticles"
      />
      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div> -->
    <!-- <div class="auth-page-content"> -->
    <div class="auth-page-content overflow-hidden pt-lg-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div
              class="overflow-hidden card-bg-fill border-0 card-border-effect-none"
            >
              <div class="row g-0">
                <div class="col-lg-6">
                  <div class="p-lg-5 p-4 auth-one-bg h-100">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <NuxtLink :to="{ name: 'auth-login' }" class="d-block">
                          <img
                            class="rounded-circle shadow shadow-lg align-self-center"
                            src="@/assets/images/logo-dark.png"
                            alt=""
                            height="100"
                          />
                        </NuxtLink>
                      </div>
                      <div class="mt-auto">
                        <div class="mb-3">
                          <i
                            class="ri-double-quotes-l display-4 text-success"
                          ></i>
                        </div>

                        <div
                          id="qoutescarouselIndicators"
                          class="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div class="text-light">
                            <p class="fs-15 fst-italic">
                              " Great! Clean code, clean design, easy for
                              customization. Thanks very much! "
                            </p>
                          </div>
                          <!-- <Swiper
                            class="text-center text-white pb-5"
                            :autoplay="{
                              delay: 3000,
                              disableOnInteraction: false,
                            }"
                            :loop="true"
                            :modules="[Autoplay, Navigation, Pagination]"
                            :pagination="{
                              clickable: true,
                              el: '.swiper-pagination',
                            }"
                          >
                            <swiper-slide>
                            </swiper-slide>
                            <swiper-slide>
                              <div>
                                <p class="fs-15 fst-italic">
                                  " The theme is really great with an amazing
                                  customer support."
                                </p>
                              </div>
                            </swiper-slide>
                            <swiper-slide>
                              <div>
                                <p class="fs-15 fst-italic">
                                  " Great! Clean code, clean design, easy for
                                  customization. Thanks very much! "
                                </p>
                              </div>
                            </swiper-slide>
                            <div class="swiper-pagination"></div>
                          </Swiper> -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary">Welcome Back !</h5>
                      <p class="text-muted">
                        Sign in to continue to Genah Sehat Admin.
                      </p>
                    </div>

                    <div class="mt-4">
                      <form @submit.prevent="signIn">
                        <div class="mb-3">
                          <label for="email" class="form-label">Email</label>
                          <input
                            type="text"
                            class="form-control"
                            id="email"
                            v-model="submitForm.user_identity"
                            placeholder="Enter email"
                            required
                          />
                          <div class="invalid-feedback">
                            <span></span>
                          </div>
                        </div>

                        <div class="mb-3">
                          <!-- <div class="float-end">
                            <NuxtLink to="/auth/login" class="text-muted">
                              Forgot password?</NuxtLink
                            >
                          </div> -->
                          <label class="form-label" for="password-input"
                            >Password</label
                          >
                          <div
                            class="position-relative auth-pass-inputgroup mb-3"
                          >
                            <input
                              :type="state.togglePassword ? 'text' : 'password'"
                              class="form-control pe-5"
                              placeholder="Enter password"
                              v-model="submitForm.password"
                              id="password-input"
                              required
                            />
                            <div class="invalid-feedback">
                              <span></span>
                            </div>
                            <button
                              class="position-absolute end-0 top-0 text-decoration-none text-muted btn btn-link"
                              type="button"
                              id="password-addon"
                              @click="
                                state.togglePassword = !state.togglePassword
                              "
                            >
                              <i class="ri-eye-fill align-middle"></i>
                            </button>
                          </div>
                        </div>
                        <div class="mt-4">
                          <button
                            class="btn btn-primary w-100"
                            type="submit"
                            :disabled="loading"
                          >
                            {{ loading ? "Please wait" : "Sign In" }}
                          </button>
                        </div>

                        <div class="mt-4 text-center">
                          <div class="signin-other-title">
                            <h5 class="fs-13 mb-4 title">Sign In with</h5>
                          </div>

                          <div>
                            <button
                              type="button"
                              class="btn btn-icon btn-primary"
                            >
                              <i class="ri-facebook-fill fs-16"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-icon ms-1 btn-danger"
                            >
                              <i class="ri-google-fill fs-16"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-icon ms-1 btn-dark"
                            >
                              <i class="ri-github-fill fs-16"></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-icon ms-1 btn-info"
                            >
                              <i class="ri-twitter-fill fs-16"></i>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="mt-5 text-center">
                      <p class="mb-0">
                        Don't have an account ?
                        <NuxtLink
                          to="/auth/login"
                          class="fw-semibold text-primary text-decoration-underline"
                        >
                          Signup
                        </NuxtLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <NuxtLink
                  :to="{ name: 'auth-login' }"
                  class="d-inline-block auth-logo"
                >
                  <img
                    src="@/assets/images/logo-light.png"
                    alt=""
                    height="80"
                  />
                </NuxtLink>
              </div>
            </div> -->
          </div>
        </div>

        <!-- <div class="row justify-content-center">
          <div class="col col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div class="card mt-4">
              <div class="p-4">
                <div class="mt-2">
                  <div
                    v-if="error"
                    class="alert alert-danger mt-3 alert-dismissible text-center"
                    role="alert"
                  >
                    <span>{{ error }}</span>
                  </div>

                  <form @submit.prevent="signIn">
                    <div class="mb-3">
                      <label for="user_identity" class="form-label"
                        >User Identity</label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="user_identity"
                        placeholder="Enter Email / Phone / NIP"
                        v-model="submitForm.user_identity"
                        required
                      />
                      <div class="invalid-feedback">
                        <span></span>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label class="form-label" for="password-input"
                        >Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type="password"
                          v-model="submitForm.password"
                          class="form-control pe-5"
                          placeholder="Enter password"
                          id="password-input"
                          required
                        />
                        <div class="invalid-feedback">
                          <span></span>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <button
                        class="btn btn-success w-100"
                        type="submit"
                        :disabled="loading"
                      >
                        {{ loading ? "Please wait" : "Sign In" }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="mt-4 text-center">
              <p class="mb-0">
                <i class="ri-copyright-line"></i>
                {{ new Date().getFullYear() }} Yudhistira. by IT GBNA
              </p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-center">
              <p class="mb-0">
                <i class="ri-copyright-line"></i>
                {{ new Date().getFullYear() }} Genah Sehat Admin. by IT GBNA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
