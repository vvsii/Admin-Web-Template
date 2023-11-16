<template>
  <a-modal
    v-model:visible="state.logout"
    :title="$t('title.confirm')"
    @ok="handleClickOkLogout"
    @cancel="handleClickCancelLogout"
    :okButtonProps="logoutButtonProps"
  >
    <p>{{ $t('ask.logout') }}</p>
  </a-modal>
  <a-modal v-model:visible="state.changePassword" :title="$t('action.changePassword')">
    <a-form ref="form" :model="form" :rules="rules" :labelCol="constant.defaultLabelCol">
      <a-form-item :label="$t('label.currentPassword')" name="current">
        <a-input-password v-model:value="form.current" />
      </a-form-item>
      <a-form-item :label="$t('label.newPassword')" name="new">
        <a-input-password v-model:value="form.new" />
      </a-form-item>
      <a-form-item v-if="state.error" :wrapperCol="constant.defaultOffset">
        <p class="error-text">{{ $t(`responseCode.${state.error}`) }}</p>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" :loading="state.submitting" @click="handleChangePassword">{{
        $t('action.changePassword')
      }}</a-button></template
    ></a-modal
  >
  <a-menu
    mode="horizontal"
    theme="dark"
    class="head-menu"
    v-model:selectedKeys="state.logoutSelectedKeys"
  >
    <a-sub-menu key="1000">
      <template #icon>
        <user-outlined />
      </template>
      <a-menu-item key="1" @click="handleClickChangePassword">
        <template #icon>
          <setting-outlined />
        </template>
        {{ $t('action.changePassword') }}
      </a-menu-item>
      <a-menu-item key="2" @click="handleClickLogout">
        <template #icon> <logout-outlined /> </template>{{ $t('action.logout') }}</a-menu-item
      >
    </a-sub-menu>
    <a-sub-menu key="1100" v-if="languages.length > 1">
      <template #icon>
        <global-outlined />
      </template>
      <template v-for="item in languages" :key="item.code">
        <a-menu-item @click="handleClickLanguage(item.code)">{{ item.language }}</a-menu-item>
      </template>
    </a-sub-menu>
  </a-menu>
</template>
<script lang="ts">
import {
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons-vue';
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { managerChangePassword } from '@/api/manager';
import { message } from 'ant-design-vue';
export default {
  components: {
    GlobalOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined
  },
  data() {
    return {
      state: {
        logout: false as Boolean,
        logoutting: false as Boolean,
        logoutSelectedKeys: [] as String[],
        changePassword: false as Boolean,
        submitting: false as Boolean,
        error: undefined as string | undefined
      },
      constant: {
        defaultLabelCol: {
          span: 8
        },
        defaultOffset: {
          offset: 16
        },
        defaultRows: 15 as number
      },
      form: {
        current: undefined as string | undefined,
        new: undefined as string | undefined
      },
      rules: {
        current: [
          {
            required: true,
            whitespace: true,
            message: this.$t('tips.inputCurrentPassword'),
            trigger: 'blur'
          },
          {
            type: 'string',
            message: this.$t('tips.inputCurrentPassword'),
            trigger: 'blur'
          },
          {
            min: 4,
            max: 32,
            message: this.$t('tips.inputCurrentPassword'),
            trigger: 'blur'
          }
        ],
        new: [
          {
            required: true,
            whitespace: true,
            message: this.$t('tips.inputNewPassword'),
            trigger: 'blur'
          },
          {
            type: 'string',
            message: this.$t('tips.inputNewPassword'),
            trigger: 'blur'
          },
          {
            min: 4,
            max: 32,
            message: this.$t('tips.inputNewPassword'),
            trigger: 'blur'
          }
        ]
      }
    };
  },
  mounted() {
    this.state.logoutSelectedKeys.push(this.$i18n.locale);
  },
  computed: {
    ...mapStores(useAuthStore),
    languages() {
      const entities = [];
      for (const message of Object.values(this.$i18n.messages)) {
        entities.push({ code: message.code, language: message.language });
      }
      // this.state.logoutSelectedKeys.push(this.$i18n.locale);
      return entities;
    },
    logoutButtonProps() {
      return {
        loading: this.state.logoutting
      };
    }
  },
  methods: {
    handleClickLogout() {
      this.state.logout = true;
    },
    handleClickChangePassword() {
      this.state.changePassword = true;
    },
    handleClickOkLogout() {
      this.state.logoutting = true;
      this.authStore.logout();
      $router.push({ name: 'login' });
    },
    handleClickCancelLogout() {
      const index = this.state.logoutSelectedKeys.indexOf('1000');
      if (index >= 0) {
        this.state.logoutSelectedKeys.splice(index, 1);
      }
    },
    handleClickLanguage(code: string) {
      if (code === this.$i18n.locale) {
        return;
      }
      const index = this.state.logoutSelectedKeys.indexOf(code);
      if (index >= 0) {
        this.state.logoutSelectedKeys.splice(index, 1);
      }
      this.$i18n.locale = code;
      this.state.logoutSelectedKeys.push(code);
    },
    async handleChangePassword() {
      try {
        const response = await managerChangePassword({
          cur: this.form.current,
          latest: this.form.new
        });
        if (response.status === 200 && response.data.code === 0) {
          message.success(this.$t('message.action.success'));
          this.form.current = undefined;
          this.form.new = undefined;
          this.state.error = undefined;
        }
        if (response.status === 200 && response.data.code !== 0) {
          this.state.error = response.data.code;
        }
      } catch (error) {
        console.error(error);
        this.state.error = error.code;
      }
    }
  }
};
</script>
<style lang="scss">
.head-menu {
  flex-direction: row-reverse;
}
</style>
