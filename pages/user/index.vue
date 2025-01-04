<script setup lang="ts">
import type { User } from "~/interfaces/user";

definePageMeta({
  name: "User List",
});
const columns = [
  {
    name: "id",
    label: "ID",
    sortable: true,
    filterable: true,
  },
  {
    name: "displayName",
    label: "Name",
    sortable: true,
    filterable: true,
  },
  {
    name: "email",
    label: "Email",
    sortable: true,
    filterable: true,
  },
  {
    name: "phone",
    label: "Phone",
    sortable: true,
    filterable: true,
  },
  {
    name: "role",
    label: "Role",
    sortable: true,
    filterable: true,
  },
];
const { $api } = useNuxtApp()
const { data: modules } = await useAsyncData('modules', () => $api('/users'))
const { data: moduler } = await useAPI('/users')
const datas = modules.value as {
  data: User[];
  message: string;
  statusCode: number;
};
const users: User[] = datas.data;
console.log(modules.value)
console.log(moduler.value)
</script>
<template>
  <CardsBaseCard>
    <template #cardBody>
      <DatatablesDatatableClient
        v-if="users"
        :data-table="users"
        :column="columns"
      ></DatatablesDatatableClient>
    </template>
  </CardsBaseCard>
</template>
