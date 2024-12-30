<script setup lang="ts">
import MainLayout from "./MainLayout.vue";
import simplebar from "simplebar-vue";
// console.log(document.querySelector("html"))

localStorage.setItem("hoverd", "false");

/**
 * Vertical layout
 */

const layoutStore = useLayoutStore();

const isMenuCondensed = ref(false);

document.body.removeAttribute("data-layout");
document.body.removeAttribute("data-topbar");
document.body.removeAttribute("data-layout-size");

function updateSidebarSize() {
  // Check window.screen.width and update the data-sidebar-size attribute
  if (window.screen.width < 1025) {
    layoutStore.changeSidebarSize("sm");
  } else {
    layoutStore.changeSidebarSize("lg"); // Reset sidebarSize if screen width is >= 1025
  }
}
function initActiveMenu() {
  if (layoutStore.layoutValue.sidebarSize === "sm-hover") {
    layoutStore.changeSidebarSize("sm-hover-active");
  } else if (layoutStore.layoutValue.sidebarSize === "sm-hover-active") {
    layoutStore.changeSidebarSize("sm-hover");
  } else {
    layoutStore.changeSidebarSize("sm-hover");
  }
}
function toggleMenu() {
  document.body.classList.toggle("sidebar-enable");
  if (window.screen.width >= 992) {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    document.body.classList.remove("sidebar-enable");
    document.body.classList.remove("vertical-collpsed");
    document.body.classList.toggle("vertical-collpsed");
  } else {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    document.body.classList.remove("sidebar-enable");
    document.body.classList.remove("vertical-collpsed");
  }
  isMenuCondensed.value = !isMenuCondensed.value;
}
function toggleRightSidebar() {
  document.body.classList.toggle("right-bar-enabled");
}
function hideRightSidebar() {
  document.body.classList.remove("right-bar-enabled");
}
provide("toggleMenu", toggleMenu);
provide("toggleRightSidebar", toggleRightSidebar);
provide("hideRightSidebar", hideRightSidebar);
onMounted(() => {
  if (localStorage.getItem("hoverd") == "true") {
    layoutStore.changeSidebarSize("sm-hover-active");
  }
  document.getElementById("overlay")?.addEventListener("click", () => {
    document.body.classList.remove("vertical-sidebar-enable");
  });
  if (window.screen.width < 1025 && window.screen.width > 767) {
    layoutStore.changeSidebarSize("sm");
  }

  window.addEventListener("resize", () => {
    document.body.classList.remove("vertical-sidebar-enable");
    if (window.screen.width < 767) {
      document.querySelector(".hamburger-icon")?.classList.add("open");
    }
    if (window.screen.width < 1025 && window.screen.width > 767) {
      document.querySelector(".hamburger-icon")?.classList.remove("open");
    }
    // updateSidebarSize()
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", updateSidebarSize);
});
</script>

<template>
  <MainLayout>
    <div id="layout-wrapper">
      <Navbar />
      <div>
        <!-- ========== Left Sidebar Start ========== -->
        <!-- ========== App Menu ========== -->
        <div class="app-menu navbar-menu">
          <!-- LOGO -->
          <div class="navbar-brand-box">
            <!-- Dark Logo-->
            <NuxtLink :to="{ name: 'Dashboard' }" class="logo logo-dark">
              <span class="logo-sm">
                <img
                  src="../assets/images/logo-light.png"
                  alt=""
                  class="rounded-circle"
                  height="40"
                />
              </span>
              <span class="logo-lg">
                <img
                  src="../assets/images/logo-light.png"
                  alt=""
                  class="rounded-circle"
                  height="70"
                />
              </span>
            </NuxtLink>
            <!-- Light Logo-->
            <NuxtLink :to="{ name: 'Dashboard' }" class="logo logo-light">
              <span class="logo-sm">
                <img
                  src="../assets/images/logo-dark.png"
                  alt=""
                  class="rounded-circle"
                  height="40"
                />
              </span>
              <span class="logo-lg">
                <img
                  src="../assets/images/logo-dark.png"
                  alt=""
                  class="rounded-circle"
                  height="70"
                />
              </span>
            </NuxtLink>
            <button
              type="button"
              class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
              id="vertical-hover"
              @click="initActiveMenu"
            >
              <i class="ri-record-circle-line"></i>
            </button>
          </div>

          <simplebar id="scrollbar" class="h-100" ref="scrollbar">
            <MenuComponent />
          </simplebar>
          <div class="sidebar-background"></div>
        </div>
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay" id="overlay"></div>
      </div>
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div class="container-fluid">
            <slot />
          </div>
        </div>
        <FooterComponent />
      </div>
      <Rightbar />
    </div>
  </MainLayout>
</template>
