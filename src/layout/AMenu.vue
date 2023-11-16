<template>
  <template v-for="menu in treeData" :key="menu.id">
    <template v-if="needMenu(menu.type)">
      <template v-if="isFolder(menu.type)">
        <a-sub-menu :key="menu.id">
          <template #icon>
            <folder-outlined />
          </template>
          <template #title>{{ menu.i18n ? $t(menu.i18n) : menu.name }}</template>
          <c-menu v-if="menu.children" :treeData="menu.children"></c-menu>
        </a-sub-menu>
      </template>
      <template v-if="isMenu(menu.type)">
        <a-menu-item :key="menu.id">
          <template #icon>
            <bars-outlined />
          </template>
          <router-link :to="{ name: menu.url }">{{
            menu.i18n ? $t(menu.i18n) : menu.name
          }}</router-link>
        </a-menu-item>
      </template>
    </template>
  </template>
</template>
<script lang="ts">
import type { ProfileMenus } from '@/stores';
import { MenuType } from '@/api/enum';
import { FolderOutlined, BarsOutlined } from '@ant-design/icons-vue';

export default {
  name: 'CMenu',
  components: {
    FolderOutlined,
    BarsOutlined
  },
  props: {
    treeData: {
      type: Array as () => ProfileMenus[],
      required: true
    }
  },
  methods: {
    needMenu(type: number): boolean {
      return type === MenuType.MENU || type === MenuType.FOLDER;
    },
    isFolder(type: number): boolean {
      return type === MenuType.FOLDER;
    },
    isMenu(type: number): boolean {
      return type === MenuType.MENU;
    }
  }
};
</script>
