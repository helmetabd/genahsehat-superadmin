import type { User } from "~/interfaces/user";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const permit_token = ref(null);
    const token = ref(null as string | null);
    const user = ref<User | null>(null);
    const permissions = ref([
      { module: "user", create: 0, read: 1, update: 0 },
      { module: "user.users", create: 1, read: 1, update: 1 },
      { module: "user.logs", create: 0, read: 1, update: 0 },
      { module: "user.morph", create: 0, read: 1, update: 0 },
    ]);
    const loading = ref(false);
    const error = ref("");
    const signIn = async (payload: any) => {
      try {
        loading.value = true;
        const { $api } = useNuxtApp();
        const data = await $api<{
          data: any;
          message: string;
          statusCode: number;
        }>("/auth/login/email", {
          method: "POST",
          body: payload,
        });
        const tokenCookie = useCookie<{ token: string }>("token", {
          maxAge: 60 * 60 * 24,
        });
        tokenCookie.value = data.data.token;
        token.value = data.data.token;
        const profile = await $api<{
          data: any;
          message: string;
          statusCode: number;
        }>("/profiles/me", {
          headers: { Authorization: `Bearer ${data.data.token}` },
        });
        user.value = profile.data;
      } catch (error: any) {
        if (
          error.response?.status == 503 &&
          error.response.data.message == "maintenance"
        ) {
          error.value = "Genah Sehat Admin is under maintenance!";
        } else {
          error.value = error.response.data.message;
        }
      } finally {
        loading.value = false;
      }
    };
    const loggingOut = async () => {
      if (token.value != null)
        try {
          const { $api } = useNuxtApp();
          await $api<{
            data: any;
            message: string;
            statusCode: number;
          }>("/auth/logout", {
            method: "POST",
            body: { token: token.value },
          });
          useCookie("token").value = null;
          token.value = null;
          localStorage.clear();
          history.go();
        } catch (error) {
          console.error(error);
        }
    };
    return {
      user,
      token,
      permissions,
      error,
      loading,
      permit_token,
      signIn,
      loggingOut,
    };
  },
  {
    persist: [
      {
        pick: ["permit_token", "token", "user", "permissions"],
        serializer: {
          serialize: (v) => JSON.stringify(v),
          deserialize: (v) => (v ? JSON.parse(v) : null),
        },
      },
    ],
  }
);
