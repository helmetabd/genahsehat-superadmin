export const useAuthStore = defineStore(
  "auth",
  () => {
    const permit_token = ref(null);
    const token = ref(
      "user-session:90c0a521-a7d0-4fa9-a488-17fdb2618314:8376eff6-f8c4-43f4-a309-e222c9a1e724" as
        | string
        | null
    );
    const user = ref(null);
    const role = ref({ id: 2, name: "admin", display_name: "Admin" });
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
        const data = await $api<{data: any, message: string, statusCode: number}>("/auth/login/email", {
          method: "POST",
          body: payload,
        });
        const tokenCookie = useCookie<{ token: string }>('token', {maxAge: 60 * 60 * 24})
        tokenCookie.value = data.data.token
        // token.value = data.value as string;
        // role.value = data.role;
        // user.value = data.user;
        // permissions.value = data.permissions;
        // const settings = data.user.settings;
        // if (settings != null) {
        //   localStorage.setItem("layoutValue", settings);
        // }
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
    // const loggingOut = async () => {
    // try {
    //   if (token.value != null)
    //   await useAsyncData(() => authApi("/auth/login", { method: "POST", body: {token: token} }))
    //   localStorage.clear();
    //   history.go();
    // } catch (error) {
    //   console.error(error);
    // }
    // await apiClient.post("/auth/logout").finally(async () => {
    //   localStorage.clear();
    //   history.go();
    // });
    // };
    return {
      user,
      role,
      token,
      permissions,
      error,
      loading,
      permit_token,
      signIn,
      // loggingOut,
    };
  },
  {
    persist: [
      {
        pick: ["permit_token", "token", "user", "role", "permissions"],
        serializer: {
          serialize: (v) => JSON.stringify(v),
          deserialize: (v) => (v ? JSON.parse(v) : null),
        },
      },
    ],
  }
);
