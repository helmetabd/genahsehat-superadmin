import type { User } from "~/interfaces/user";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const { $api } = useNuxtApp();
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
    const signIn = async (
      payload: any,
      type: "email" | "username" | "phone"
    ) => {
      try {
        loading.value = true;
        const data = await $api<{
          data: any;
          message: string;
          statusCode: number;
        }>(`/auth/login/${type}`, {
          method: "POST",
          body: payload,
        });
        const userCookie = useCookie<{ user: User }>("user", {
          maxAge: 60 * 60 * 24,
        });
        userCookie.value = data.data.user;
        user.value = data.data.user;
        const tokenCookie = useCookie<{ token: string }>("token", {
          maxAge: 60 * 60 * 24,
        });
        tokenCookie.value = data.data.token;
        token.value = data.data.token;
        console.log(userCookie);
        console.log(tokenCookie);
      } catch (error: any) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };
    const loggingOut = async () => {
      console.log(token.value);
      if (token.value != null)
        try {
          await $api<{
            data: any;
            message: string;
            statusCode: number;
          }>("/auth/logout", {
            method: "POST",
            body: { token: token.value },
          });
          useCookie("token").value = null;
          useCookie("user").value = null;
          token.value = null;
          user.value = null;
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
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
