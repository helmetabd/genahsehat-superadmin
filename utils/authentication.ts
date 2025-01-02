import type { NitroFetchRequest, $Fetch } from "nitropack";
import type { login, register } from "~/interfaces/auth";

export const authentication = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
  async register(body: register) {
    return fetch("/auth/register", { method: "POST", body: body });
  },
  async login(body: login, type: "username" | "email" | "phone") {
    return fetch(`/auth/login/${type}`, { method: "POST", body: body });
  },
  async refresh(body: { token: string }) {
    return fetch(`/auth/refresh`, { method: "POST", body: body });
  },
  async logout(body: { token: string }) {
    return fetch(`/auth/logout`, { method: "POST", body: body });
  },
});
