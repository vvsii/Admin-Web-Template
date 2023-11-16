<template>
  <a-menu mode="inline" theme="dark" :selectedKeys="selectedKeys" v-model:openKeys="openKeys">
    <c-menu :treeData="permissionStore.treeMenus"></c-menu>
  </a-menu>
</template>
<script lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { mapStores } from 'pinia';
import { usePermissionStore } from '@/stores/permission';
import CMenu from './AMenu.vue';
export default {
  name: 'ISideMenu',
  components: {
    CMenu
  },
  data() {
    return {
      openKeys: [],
      selectedKeys: [] as string[]
    };
  },
  mounted() {
    this.handleRouteChange(this.$route);
  },
  watch: {
    $route: function (newVal) {
      this.handleRouteChange(newVal);
    }
  },
  computed: {
    ...mapStores(usePermissionStore)
  },
  methods: {
    handleRouteChange(route: RouteLocationNormalizedLoaded) {
      if (route.meta.parent) {
        this.openKeys = this.openKeys.concat((route.meta as any).parent);
      }
      if (route.meta.id) {
        this.selectedKeys = [route.meta.id] as string[];
      }
    }
  }
};
</script>
