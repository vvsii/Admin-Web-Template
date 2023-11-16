import type { RouteRecordRaw } from 'vue-router';
import type { AxiosResponse } from 'axios';
import type { ProfileMenus } from '@/stores';
import type { ApiResponse } from '@/api';
import { ResponseCode, MenuType } from '@/api/enum';

import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { usePermissionStore } from '@/stores/permission';
import client from '@/api/request';
const modules = import.meta.glob(['@/views/*/*.vue', '@/views/*/*/*.vue']);

const routes = [
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/ALogin.vue')
  },
  {
    // 全局layout
    path: '/',
    name: 'layout',
    component: () => import('@/layout/ALayout.vue')
  }
] as RouteRecordRaw[];

let isAddDynamicMenuRoutes = false;
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

const depthAddRoute = async (menus: ProfileMenus[], parent: ProfileMenus | undefined) => {
  if (menus.length === 0) {
    return;
  }
  for (const menu of menus) {
    if (menu.type === MenuType.MENU && menu.url) {
      router.addRoute('layout', {
        path: menu.url,
        name: menu.url,
        component: modules[`/src/views/${menu.path}.vue`],
        meta: {
          id: menu.id,
          parent: parent ? parent.id : undefined
        }
      });
    }
    if (menu.children) {
      await depthAddRoute(menu.children, menu);
    }
  }
};

client.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  if (authStore.expired) {
    if (authStore.refreshExpired) {
      router.push({ name: 'login' });
      return Promise.reject('refresh');
    }
    await authStore.refreshAuth();
  }
  // 附加Authorization，无效则刷新
  config.headers.Authorization = authStore.token;
  return config;
});

client.interceptors.response.use(async (response: AxiosResponse<ApiResponse<any>, any>) => {
  if (response.data && response.data.code === ResponseCode.TOKEN_EXPIRE) {
    const authStore = useAuthStore();
    try {
      const refreshResponse = await authStore.refreshAuth();
      if (refreshResponse.data) {
        if (refreshResponse.data.code === ResponseCode.SUCCESS) {
          return await client(response.config);
        }
      }
    } catch (error) {
      console.error('error:', error);
      if (error.code && error.code === ResponseCode.REFRESH_TOKEN_EXPIRE) {
        router.push({ name: 'login' });
      }
    }
  }
  return response;
});

router.beforeEach(async (to) => {
  if (to.name === 'login') {
    return true;
  }
  if (isAddDynamicMenuRoutes === true) {
    return true;
  }
  const permissionStore = usePermissionStore();
  await permissionStore.load();
  await depthAddRoute(permissionStore.treeMenus, undefined);
  isAddDynamicMenuRoutes = true;
  return { path: to.path };
});

export default router;
