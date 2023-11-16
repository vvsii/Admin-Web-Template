<template>
  <a-layout class="layout">
    <a-layout-sider class="sider" v-model:collapsed="state.collapsed" collapsible>
      <div class="head"></div>
      <SideMenu></SideMenu>
      <div class="bottom-menu">&nbsp;</div>
    </a-layout-sider>
    <div class="virtual-sider"></div>
    <a-layout>
      <a-layout-header class="header">
        <CHeader></CHeader>
      </a-layout-header>
      <div class="virtual-header"></div>
      <a-layout-content class="content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import SideMenu from './ASideMenu.vue';
import CHeader from './AHeader.vue';

export default {
  components: {
    SideMenu,
    CHeader
  },
  data() {
    return {
      state: {
        collapsed: false
      }
    };
  },
  computed: {
    sideWidth() {
      return this.state.collapsed ? '80px' : '200px';
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  $header-height: 64px;
  $sider-height: v-bind(sideWidth);

  min-height: 100vh;

  .sider {
    position: fixed;
    height: 100%;
    z-index: 1;
    overflow-y: scroll;

    .head {
      height: $header-height;
    }

    .bottom-menu {
      height: 48px;
    }
  }

  .virtual-sider {
    width: $sider-height;
  }

  .header {
    position: fixed;
    width: calc(100% - $sider-height);
    z-index: 999;
  }

  .virtual-header {
    height: $header-height;
  }

  .content {
    margin: {
      top: 16px;
      left: 16px;
      right: 16px;
    }
  }
}
</style>
