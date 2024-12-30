<script setup lang="ts">
const layoutStore = useLayoutStore();
const router = useRoute();
// mounted() {
//   // document.querySelector("html").setAttribute('dir', 'rtl');
// }
// console.log(router.meta)
</script>

<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div
          class="page-title-box d-sm-flex align-items-center justify-content-between"
        >
          <h4 class="mb-sm-0" id="pageTitle">{{ router.meta.name }}</h4>
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item active">{{ router.meta.name }}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
