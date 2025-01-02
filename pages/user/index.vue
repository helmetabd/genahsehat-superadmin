<script setup lang="ts">
import type { User } from "~/interfaces/user";
import { useFetchApi } from "~/composables/useFetchApi";

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
const { data } = await useFetchApi("/users", { method: "GET" });
const datas = data.value as { data: User[], message: string, statusCode: number };
const users: User[] = datas.data;
console.log(users);
console.log("data");
</script>
<template>
  <CardsBaseCard>
    <template #cardBody>
      <span class="badge bg-success-subtle text-success">table</span>
      <div style="height: 10px; width: 50px" class="color_1"></div>
      <div style="height: 10px; width: 50px" class="color_2"></div>
      <div style="height: 10px; width: 50px" class="color_3"></div>
      <div style="height: 10px; width: 50px" class="color_4"></div>
      <div style="height: 10px; width: 50px" class="color_5"></div>
      <div style="height: 10px; width: 50px" class="color_6"></div>
      <div style="height: 10px; width: 50px" class="color_7"></div>
      <div style="height: 10px; width: 50px" class="color_8"></div>
      <div style="height: 10px; width: 50px" class="color_9"></div>
      <DatatablesDatatableClient
        v-if="data"
        :data-table="users"
        :column="columns"
      ></DatatablesDatatableClient>
    </template>
  </CardsBaseCard>
</template>

<style lang="scss">
@function tint-color($color, $weight) {
  @return mix(white, $color, $weight);
}

// Shade a color: mix a color with black
@function shade-color($color, $weight) {
  @return mix(black, $color, $weight);
}
// $purple: #6559cc;
$purple: #8c68cd;
$purple-100: tint-color($purple, 80%);
$purple-200: tint-color($purple, 60%);
$purple-300: tint-color($purple, 40%);
$purple-400: tint-color($purple, 20%);
$purple-500: $purple;
$purple-600: shade-color($purple, 20%);
$purple-700: shade-color($purple, 40%);
$purple-800: shade-color($purple, 60%);
$purple-900: shade-color($purple, 80%);

.color_1 {
  background-color: $purple-100;
}
.color_2 {
  background-color: $purple-200;
}
.color_3 {
  background-color: $purple-300;
}
.color_4 {
  background-color: $purple-400;
}
.color_5 {
  background-color: $purple-500;
}
.color_6 {
  background-color: $purple-600;
}
.color_7 {
  background-color: $purple-700;
}
.color_8 {
  background-color: $purple-800;
}
.color_9 {
  background-color: $purple-900;
}
</style>
