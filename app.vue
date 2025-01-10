<script lang="ts" setup>
import type { LayoutKey } from "#build/types/layouts";
import { computed } from "vue";
const route = useRoute();
const layoutStore = useLayoutStore();

const type = computed(() => {
  const layout = layoutStore.layoutValue.layoutType ?? "vertical";
  if (
    route.name?.toString().includes("auth") ||
    route.name?.toString().includes("errors")
  ) {
    return "blank-layout" as LayoutKey;
  }
  return layout === "vertical" || layout === "semibox"
    ? "vertical-layout"
    : ("horizontal-layout" as LayoutKey);
});
</script>
<template>
  <div>
    <ClientOnly>
      <NuxtLoadingIndicator />
      <NuxtLayout :name="type">
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>
