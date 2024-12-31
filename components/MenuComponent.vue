<script setup lang="ts">
import menu from "../config/menu";

const authStore = useAuthStore();
const layoutStore = useLayoutStore();
const { layoutValue } = storeToRefs(layoutStore);
const layoutType = layoutValue.value.layoutType;
const permissions = authStore.permissions;
// const permissions = useStorage('permissions', {}, undefined, {
//   serializer: {
//     read: (v) => (v ? JSON.parse(v) : null),
//     write: (v) => JSON.stringify(v)
//   }
// })
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
const router = useRoute();
const data = reactive({
  menus: menu() as Menu[],
  settings: {
    minScrollbarLength: 60,
  },
});

function checkSU() {
  return authStore.role.id == 1;
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

function onRoutechange(ele: string) {
  initActiveMenu(ele);
  if (document.getElementsByClassName("mm-active").length > 0) {
    const currentPosition = (
      document.getElementsByClassName("mm-active")[0] as HTMLElement
    ).offsetTop;
    if (currentPosition > 500) {
      document.querySelector("#scrollbar .simplebar-content-wrapper")
        ? ((
            document.querySelector(
              "#scrollbar .simplebar-content-wrapper"
            ) as HTMLElement
          ).scrollTop = currentPosition + 300)
        : "";
    }
  }
}

function initActiveMenu(path: string) {
  setTimeout(() => {
    if (document.querySelector("#navbar-nav")) {
      let a = document
        .querySelector("#navbar-nav")
        ?.querySelector('[href="' + path + '"]');
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
            const grandparent = parentCollapseDiv.parentElement
              .closest(".collapse")
              ?.previousElementSibling?.parentElement?.closest(".collapse");
            if (
              grandparent &&
              grandparent &&
              grandparent.previousElementSibling
            ) {
              grandparent.previousElementSibling.classList.add("active");
              grandparent.classList.add("show");
            }
          }
        }
      }
    }
  }, 0);
}

onMounted(() => {
  if (document.querySelectorAll(".navbar-nav .collapse")) {
    let collapses = document.querySelectorAll(".navbar-nav .collapse");

    collapses.forEach((collapse) => {
      // Hide sibling collapses on `show.bs.collapse`
      collapse.addEventListener("show.bs.collapse", (e) => {
        e.stopPropagation();
        let closestCollapse = collapse.parentElement?.closest(".collapse");
        if (closestCollapse) {
          let siblingCollapses = closestCollapse.querySelectorAll(".collapse");
          siblingCollapses.forEach((siblingCollapse) => {
            if (siblingCollapse.classList.contains("show")) {
              siblingCollapse.classList.remove("show");
              (
                siblingCollapse?.parentElement?.firstChild as HTMLElement
              )?.setAttribute("aria-expanded", "false");
            }
          });
        } else {
          let getSiblings = (elem: HTMLElement | null) => {
            // Setup siblings array and get the first sibling
            let siblings = [];
            let sibling = elem?.parentNode?.firstChild;
            // Loop through each sibling and push to the array
            while (sibling) {
              if (sibling.nodeType === 1 && sibling !== elem) {
                siblings.push(sibling);
              }
              sibling = sibling.nextSibling;
            }
            return siblings;
          };
          let siblings = getSiblings(collapse.parentElement);
          siblings.forEach((item) => {
            if (item.childNodes.length > 2) {
              (item as HTMLElement).firstElementChild?.setAttribute(
                "aria-expanded",
                "false"
              );
              (item as HTMLElement).firstElementChild?.classList.remove(
                "active"
              );
            }
            let ids = (item as HTMLElement).querySelectorAll("*[id]");
            ids.forEach((item1) => {
              item1.classList.remove("show");
              (item1.parentElement?.firstChild as HTMLElement)?.setAttribute(
                "aria-expanded",
                "false"
              );
              (item1.parentElement?.firstChild as HTMLElement).classList.remove(
                "active"
              );
              if (item1.childNodes.length > 2) {
                let val = item1.querySelectorAll("ul li a");

                val.forEach((subitem) => {
                  if (subitem.hasAttribute("aria-expanded"))
                    subitem.setAttribute("aria-expanded", "false");
                });
              }
            });
          });
        }
      });

      // Hide nested collapses on `hide.bs.collapse`
      collapse.addEventListener("hide.bs.collapse", (e) => {
        e.stopPropagation();
        let childCollapses = collapse.querySelectorAll(".collapse");
        childCollapses.forEach((childCollapse) => {
          let childCollapseInstance = childCollapse;
          childCollapseInstance.classList.remove("show");
          (
            childCollapseInstance?.parentElement?.firstChild as HTMLElement
          ).setAttribute("aria-expanded", "false");
        });
      });
    });
  }
});

watch(
  () => router.path,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      onRoutechange(router.path);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="container-fluid">
    <div id="two-column-menu"></div>
    <template v-if="layoutType === 'vertical' || layoutType === 'semibox'">
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

        <li class="menu-title">
          <i class="ri-more-fill"></i>
          <span>modules</span>
        </li>

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
    </template>
  </div>
</template>
