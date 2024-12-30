<script lang="ts" setup>
import type { LayoutKey } from '#build/types/layouts';

  const layout = useLayoutStore().layoutValue.layoutType
  const type = layout == 'vertical' || layout === 'semibox' ? 'vertical-layout' : 'horizontal-layout' as LayoutKey
</script>
<template>
  <div>
    <ClientOnly>
      <NuxtLayout :name="type">
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>
