import { defineNuxtRouteMiddleware } from "#app";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { loggedIn } = useUserSession();
  console.log(to);

  // Check if user is authenticated
  if (!loggedIn) {
    const publicRoutes = ["/auth/login", "/auth/register"];

    // If the route is not public, redirect to login
    if (!publicRoutes.includes(to.path)) {
      return navigateTo("/auth/login");
    }
  }
});
