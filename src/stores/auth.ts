import type { AxiosResponse } from 'axios';
import type { AuthState } from '.';
import type { ApiResponse, TokenResponse, LoginBody, RefreshBody } from '@/api';

import { defineStore } from 'pinia';
import { login, refresh } from '@/api/auth';

const storage = {
  set(token: string, refresh: string) {
    window.sessionStorage.setItem('token', token);
    window.sessionStorage.setItem('refresh', refresh);
  }
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const token = window.sessionStorage.getItem('token');
    const refresh = window.sessionStorage.getItem('refresh');
    const state = {
      token,
      refresh
    } as AuthState;
    if (token) {
      state.payload = JSON.parse(atob(token.split('.')[1]));
    }
    if (refresh) {
      state.refreshPayload = JSON.parse(atob(refresh.split('.')[1]));
    }
    return state;
  },
  getters: {
    // 是否处于登录状态
    isActive(): boolean {
      return this.expired === false;
    },
    // token是否过期
    expired(): boolean {
      return this.payload && this.payload.exp ? Date.now() / 1000 > this.payload.exp : true;
    },
    // refresh token是否过期
    refreshExpired(): boolean {
      return this.refreshPayload && this.refreshPayload.exp
        ? Date.now() / 1000 > this.refreshPayload.exp
        : true;
    }
  },
  actions: {
    transfer(response: AxiosResponse<ApiResponse<TokenResponse>>) {
      if (response.status === 200 && response.data.code === 0) {
        if (response.data.result) {
          const { token, refresh } = response.data.result;
          this.token = token;
          this.refresh = refresh;
          this.payload = JSON.parse(atob(token.split('.')[1]));
          this.refreshPayload = JSON.parse(atob(refresh.split('.')[1]));
          storage.set(token, refresh);
          return;
        }
      }
      if (response.data) {
        throw response.data;
      }
      throw response;
    },
    async loadAuth(body: LoginBody): Promise<AxiosResponse<ApiResponse<TokenResponse>>> {
      const response = await login(body);
      this.transfer(response);
      return response;
    },
    async refreshAuth(): Promise<AxiosResponse<ApiResponse<TokenResponse>>> {
      const response = await refresh({ token: this.refresh } as RefreshBody);
      this.transfer(response);
      return response;
    },
    async logout() {
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('refresh');
      this.$reset();
    }
  }
});
