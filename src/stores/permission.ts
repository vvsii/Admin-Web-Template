import type { MyRoleResponse } from '@/api';
import type { ProfileMenus } from '.';

import { defineStore } from 'pinia';

import { myRole } from '@/api/manager';

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    menus: [] as MyRoleResponse[]
  }),
  getters: {
    isAuth(): (auth: string) => boolean {
      return (auth: string) => {
        return this.auths.includes(auth);
      };
    },
    auths(state): string[] {
      const auths = [] as string[];
      for (const menu of state.menus) {
        if (menu.privilege) {
          for (const auth of menu.privilege.split(',')) {
            auths.push(auth);
          }
        }
      }
      return auths;
    },
    treeMenus(state): ProfileMenus[] {
      const values = state.menus.map((item) => ({ ...item } as ProfileMenus));
      const tree = {
        0: []
      } as Record<number, ProfileMenus[]>;
      for (const value of values) {
        if (value.path?.startsWith('/')) {
          value.path = value.path.slice(1);
        }
        if (value.parentId) {
          if (!tree[value.parentId]) {
            tree[value.parentId] = [];
          }
          tree[value.parentId].push(value);
        } else {
          tree[0].push(value);
        }
      }
      for (const value of values) {
        if (tree[value.id]) {
          value.children = tree[value.id];
        }
      }
      return tree[0];
    }
  },
  actions: {
    async load() {
      const response = await myRole();
      if (response.status === 200 && response.data.code === 0) {
        this.menus = response.data.result || [];
      }
    }
  }
});
