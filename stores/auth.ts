export const useAuthStore = defineStore(
  "auth",
  () => {
    const permit_token = ref(null);
    const token = ref(null);
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
        await apiClient.post("/auth/login", payload).then((res) => {
          token.value = res.data.token;
          role.value = res.data.role;
          user.value = res.data.user;
          permissions.value = res.data.permissions;
          const settings = res.data.user.settings;
          if (settings != null) {
            localStorage.setItem("layoutValue", settings);
          }
        });
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
      await apiClient.post("/auth/logout").finally(async () => {
        localStorage.clear();
        history.go();
      });
    };
    return {
      user,
      role,
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
        pick: ["permit_token", "token", "user", "role", "permissions"],
        serializer: {
          serialize: (v) => JSON.stringify(v),
          deserialize: (v) => (v ? JSON.parse(v) : null),
        },
      },
    ],
  }
);
