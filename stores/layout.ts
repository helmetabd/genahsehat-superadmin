import { defineStore } from "pinia";

interface LayoutValue {
  layoutType: string;
  layoutWidth: string;
  sidebarSize: string;
  topbar: string;
  mode: string;
  position: string;
  sidebarView: string;
  sidebarColor: string;
  sidebarImage: string;
  preloader: string;
  visibility: string;
}

export const useLayoutStore = defineStore(
  "layout",
  () => {
    const layoutValue = ref<LayoutValue>({
      layoutType: "vertical",
      layoutWidth: "fluid",
      sidebarSize: "lg",
      topbar: "light",
      mode: "light",
      position: "fixed",
      sidebarView: "default",
      sidebarColor: "light",
      sidebarImage: "none",
      preloader: "disable",
      visibility: "show",
    });
    const dataPreloader = ref(
      (layoutValue.value.preloader = layoutValue.value.preloader || "disable")
    );
    const hoverd = ref(false);
    const getLayoutValue = computed(() => {
      layoutValue.value.layoutType = layoutValue.value.layoutType || "vertical";
      return { ...layoutValue };
    });
    function changeLayoutType(layoutType: string) {
      layoutValue.value.layoutType = layoutType;
      switch (layoutType) {
        case "horizontal":
          document.documentElement.setAttribute("data-layout", "horizontal");
          break;
        case "vertical":
          document.documentElement.setAttribute("data-layout", "vertical");
          break;
        case "twocolumn":
          document.documentElement.setAttribute("data-layout", "twocolumn");
          break;
        case "semibox":
          document.documentElement.setAttribute("data-layout", "semibox");
          break;
      }
      document.body.removeAttribute("style");
    }
    function changeLayoutWidth(layoutWidth: string) {
      layoutValue.value.layoutWidth = layoutWidth;
      switch (layoutWidth) {
        case "fluid":
          document.documentElement.setAttribute("data-layout-width", "fluid");
          break;
        case "boxed":
          document.documentElement.setAttribute("data-layout-width", "boxed");
          break;
      }
    }

    function changeSidebarSize(sidebarSize: string) {
      layoutValue.value.sidebarSize = sidebarSize;
      switch (sidebarSize) {
        case "":
          document.documentElement.setAttribute("data-sidebar-size", "");
          break;
        case "sm-hover-active":
          document.documentElement.setAttribute(
            "data-sidebar-size",
            "sm-hoverd-active"
          );
          hoverd.value = true;
          break;
        case "sm-hover":
          document.documentElement.setAttribute(
            "data-sidebar-size",
            "sm-hover"
          );
          hoverd.value = false;
          break;
        case "sm":
          document.documentElement.setAttribute("data-sidebar-size", "sm");
          break;
        case "md":
          document.documentElement.setAttribute("data-sidebar-size", "md");
          break;
        case "lg":
          document.documentElement.setAttribute("data-sidebar-size", "lg");
          break;
      }
    }

    function changeTopbar() {
      const documentMode = document.documentElement.getAttribute("data-topbar");
      if (documentMode === "dark") {
        document.documentElement.setAttribute("data-topbar", "light");
      } else {
        document.documentElement.setAttribute("data-topbar", "dark");
      }
      layoutValue.value.topbar =
        document.documentElement.getAttribute("data-topbar") || "light";
    }

    function changeMode() {
      const documentMode =
        document.documentElement.getAttribute("data-bs-theme");
      if (documentMode === "dark") {
        document.documentElement.setAttribute("data-bs-theme", "light");
        document.documentElement.setAttribute("data-sidebar", "light");
        layoutValue.value.sidebarColor = "light";
      } else {
        document.documentElement.setAttribute("data-bs-theme", "dark");
        document.documentElement.setAttribute("data-sidebar", "dark");
        layoutValue.value.sidebarColor = "dark";
      }
      layoutValue.value.mode =
        document.documentElement.getAttribute("data-bs-theme") || "light";
    }

    function changePosition(position: string) {
      layoutValue.value.position = position;
      switch (position) {
        case "fixed":
          document.documentElement.setAttribute(
            "data-layout-position",
            "fixed"
          );
          break;
        case "scrollable":
          document.documentElement.setAttribute(
            "data-layout-position",
            "scrollable"
          );
          break;
      }
    }

    function changeSidebarView(sidebarView: string) {
      layoutValue.value.sidebarView = sidebarView;
      switch (sidebarView) {
        case "detached":
          document.documentElement.setAttribute(
            "data-layout-style",
            "detached"
          );
          break;
        case "default":
          document.documentElement.setAttribute("data-layout-style", "default");
          break;
      }
    }

    function changeSidebarColor(sidebarColor: string) {
      layoutValue.value.sidebarColor = sidebarColor;
      switch (sidebarColor) {
        case "dark":
          document.documentElement.setAttribute("data-sidebar", "dark");
          break;
        case "light":
          document.documentElement.setAttribute("data-sidebar", "light");
          break;
        case "gradient":
          document.documentElement.setAttribute("data-sidebar", "gradient");
          break;
        case "gradient-2":
          document.documentElement.setAttribute("data-sidebar", "gradient-2");
          break;
        case "gradient-3":
          document.documentElement.setAttribute("data-sidebar", "gradient-3");
          break;
        case "gradient-4":
          document.documentElement.setAttribute("data-sidebar", "gradient-4");
          break;
      }
    }
    function changeSidebarImage(sidebarImage: string) {
      layoutValue.value.sidebarImage = sidebarImage;
      switch (sidebarImage) {
        case "img-1":
          document.documentElement.setAttribute("data-sidebar-image", "img-1");
          break;
        case "img-2":
          document.documentElement.setAttribute("data-sidebar-image", "img-2");
          break;
        case "img-3":
          document.documentElement.setAttribute("data-sidebar-image", "img-3");
          break;
        case "img-4":
          document.documentElement.setAttribute("data-sidebar-image", "img-4");
          break;
        case "none":
          document.documentElement.setAttribute("data-sidebar-image", "none");
          break;
      }
    }

    function changePreloader() {
      const documentMode =
        document.documentElement.getAttribute("data-preloader");
      if (documentMode === "disable") {
        document.documentElement.setAttribute("data-preloader", "enable");
      } else {
        document.documentElement.setAttribute("data-preloader", "disable");
      }
      layoutValue.value.preloader =
        document.documentElement.getAttribute("data-preloader") || "disable";
    }

    function changeVisibility(visibility: string) {
      layoutValue.value.visibility = visibility;
      switch (visibility) {
        case "show":
          document.documentElement.setAttribute(
            "data-sidebar-visibility",
            "show"
          );
          break;
        case "hidden":
          document.documentElement.setAttribute(
            "data-sidebar-visibility",
            "hidden"
          );
          break;
      }
    }
    return {
      layoutValue,
      dataPreloader,
      getLayoutValue,
      hoverd,
      changeLayoutType,
      changeLayoutWidth,
      changeMode,
      changePosition,
      changePreloader,
      changeSidebarColor,
      changeSidebarImage,
      changeSidebarSize,
      changeSidebarView,
      changeTopbar,
      changeVisibility,
    };
  },
  {
    persist: [
      {
        pick: ["dataPreloader"],
        key: 'data-preloader'
      },
      {
        pick: ["layoutValue", "hoverd"],
      },
    ],
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLayoutStore, import.meta.hot));
}
