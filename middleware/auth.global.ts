import { defineNuxtRouteMiddleware } from "#app";
import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");

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
  }}
});
