<script setup lang="ts">
import menu from "../config/menu";
const authStore = useAuthStore();
const permissions = authStore.permissions;
interface Menu {
  name: string;
  display_name: string;
  icon: string | null;
  route: string | null;
  module: string;
  auth_level_min: number;
  admin_required: boolean;
  caret: boolean;
  childs?: Menu[];
  type?: string;
}
const data = reactive({
  menus: menu() as Menu[],
  settings: {
    minScrollbarLength: 60,
  },
});
onMounted(() => {
  initActiveMenu();
});
function initActiveMenu() {
  setTimeout(() => {
    var currentPath = window.location.pathname;
    if (document.querySelector("#navbar-nav")) {
      let a = document
        .querySelector("#navbar-nav")
        ?.querySelector('[href="' + currentPath + '"]');

      if (a) {
        a.classList.add("active");
        let parentCollapseDiv = a.closest(".collapse.menu-dropdown");
        if (parentCollapseDiv) {
          parentCollapseDiv.classList.add("show");
          parentCollapseDiv.parentElement?.children[0].classList.add("active");
          parentCollapseDiv.parentElement?.children[0].setAttribute(
            "aria-expanded",
            "true"
          );
          if (
            parentCollapseDiv.parentElement?.closest(".collapse.menu-dropdown")
          ) {
            parentCollapseDiv.parentElement
              ?.closest(".collapse")
              ?.classList.add("show");
            if (
              parentCollapseDiv.parentElement.closest(".collapse")
                ?.previousElementSibling
            )
              parentCollapseDiv.parentElement
                .closest(".collapse")
                ?.previousElementSibling?.classList.add("active");
          }
        }
      }
    }
  }, 1000);
}
function checkSU() {
  return authStore.user?.role == "superuser" ? true : false;
}

function checkAuth(req: string) {
  let checker = permissions.filter((e) => {
    let res = e.module == req;
    if (res == true) {
      return e.read == 1 ? true : false;
    }
  });
  return checker.length > 0 ? true : false;
}
</script>

<template>
  <div id="layout-wrapper">
    <Navbar />
    <!-- ========== App Menu ========== -->
    <div class="app-menu navbar-menu">
      <!-- LOGO -->
      <div class="navbar-brand-box">
        <!-- Dark Logo-->
        <NuxtLink :to="{ name: 'dashboard' }" class="logo logo-dark">
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
        <NuxtLink :to="{ name: 'dashboard' }" class="logo logo-light">
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
        >
          <i class="ri-record-circle-line"></i>
        </button>
      </div>
      <div id="scrollbar">
        <div class="container-fluid">
          <ul class="navbar-nav h-100" id="navbar-nav">
            <li class="menu-title">
              <span data-key="t-menu"> menu </span>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link menu-link" to="/">
                <i class="ri-dashboard-2-line"></i>
                <span>Dashboard</span>
              </NuxtLink>
            </li>
            <!-- end Dashboard Menu -->

            <li v-for="menu in data.menus" :key="menu.name" class="nav-item">
              <a
                v-if="menu.caret"
                v-show="checkAuth(menu.module)"
                class="nav-link menu-link"
                :href="`#${menu.name}`"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                :aria-controls="menu.name"
              >
                <i :class="menu.icon"></i>
                <span>{{ menu.display_name }}</span>
              </a>
              <NuxtLink
                v-if="!menu.caret"
                v-show="checkAuth(menu.module)"
                :to="{ name: menu.route ?? '' }"
                class="nav-link"
                data-key="t-simple-page"
              >
                {{ menu.display_name }}
              </NuxtLink>
              <div
                v-if="menu.caret"
                class="collapse menu-dropdown"
                :id="menu.name"
                v-show="checkAuth(menu.module)"
              >
                <ul class="nav nav-sm flex-column">
                  <li
                    v-for="child in menu.childs"
                    :key="child.name"
                    class="nav-item"
                  >
                    <a
                      v-if="child.caret"
                      v-show="checkAuth(child.module)"
                      class="nav-link menu-link"
                      :href="`#${child.name}`"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded="false"
                      :aria-controls="child.name"
                    >
                      <span>{{ child.display_name }}</span>
                    </a>
                    <NuxtLink
                      v-if="!child.caret"
                      v-show="checkAuth(child.module)"
                      :to="{ name: child.route ?? '' }"
                      class="nav-link"
                      data-key="t-simple-page"
                    >
                      {{ child.display_name }}
                    </NuxtLink>
                    <div
                      v-if="child.caret"
                      v-show="checkAuth(child.module)"
                      class="collapse menu-dropdown"
                      :id="child.name"
                    >
                      <ul class="nav nav-sm flex-column">
                        <li
                          v-if="child?.childs"
                          v-for="grandChild in child.childs"
                          :key="grandChild.name"
                          class="nav-item"
                        >
                          <NuxtLink
                            :to="{ name: grandChild.route ?? '' }"
                            v-show="checkAuth(grandChild.module)"
                            class="nav-link"
                            data-key="t-simple-page"
                          >
                            {{ grandChild.display_name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <li class="menu-title" v-if="checkSU()">
              <i class="ri-more-fill"></i>
              <span>SYSTEMS</span>
            </li>
            <li v-for="menu in data.menus" :key="menu.name" class="nav-item">
              <NuxtLink
                v-if="menu.type == 'system' && menu.auth_level_min == 1"
                v-show="checkSU()"
                :to="{ name: menu.route ?? '' }"
                class="nav-link"
                data-key="t-simple-page"
                activeClass="text-primary"
              >
                <i :class="menu.icon"></i>
                <span>{{ menu.display_name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <!-- Sidebar -->
      </div>
      <!-- Left Sidebar End -->
      <!-- Vertical Overlay-->
      <div class="vertical-overlay"></div>
    </div>
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
      <div class="page-content">
        <!-- Start Content-->
        <div class="container-fluid">
          <PageHeader/>
          <slot />
        </div>
      </div>
      <FooterComponent />
    </div>
    <Rightbar />
  </div>
</template>
