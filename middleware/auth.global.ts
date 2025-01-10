import { defineNuxtRouteMiddleware } from "#app";
import { useAuthStore } from "@/stores/auth";
import Swal from "sweetalert2";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const authStore = useAuthStore();
  if (from.path == "/") {
    if (to.name == "auth-login") {
      if (authStore.token) {
        if (token.value == null || token.value == undefined) {
          Swal.fire({
            title: "Your session has ended!",
            text: "Please login again with your account!",
            icon: "error",
            allowOutsideClick: false,
          }).then(async (event) => {
            if (event.isConfirmed) {
              await navigateTo("/auth/login");
            }
          });
        }
        return navigateTo("/dashboard");
      }
    }
  }

  // Check if user is authenticated
  if (token.value == null || token.value == undefined) {
    const publicRoutes = ["/auth/login", "/auth/register"];

    // If the route is not public, redirect to login
    if (!publicRoutes.includes(to.path)) {
      return navigateTo("/auth/login");
    }
  } else {
    // If the user is authenticated, redirect to dashboard
    if (to.path === "/auth/login") {
      return navigateTo("/dashboard");
    }
    // if (to.name !== 'auth.login' && from.name !== undefined) {
    //   return navigateTo({ name: 'errors-not-found' })
    // }

    if (to.path === "/") {
      return navigateTo({ name: "dashboard" });
    }

    if (to.name === undefined) {
      return navigateTo({ name: "errors-not-found" });
    }
  }
});
