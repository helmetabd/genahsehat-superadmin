<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts';
  const route = useRoute()

  const layout = useLayoutStore().layoutValue.layoutType ?? 'vertical'
  let type =ref(layout == 'vertical' || layout === 'semibox' ? 'vertical-layout' : 'horizontal-layout' as LayoutKey)
  if(route.name?.toString().includes('auth')) {
    type.value = 'blank-layout'
  }
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
<style>
@import './assets/custom-css/dataTables.bootstrap5.min.css';
@import './assets/custom-css/responsive.bootstrap.min.css';
@import './assets/custom-css/buttons.dataTables.min.css';
@import './assets/custom-css/buttons.bootstrap5.min.css';
</style>
