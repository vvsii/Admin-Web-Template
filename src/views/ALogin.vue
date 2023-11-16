<template>
  <div class="card">
    <a-card>
      <template #title>
        <div class="text-center">
          {{ $t('title.login') }}
        </div>
      </template>
      <a-form ref="form" :model="form" :rules="rules" :labelCol="constant.defaultLabelCol">
        <a-form-item :label="$t('label.username')" name="username">
          <a-input
            v-model:value="form.username"
            :max-length="constant.username.maxLength"
          ></a-input>
        </a-form-item>
        <a-form-item :label="$t('label.password')" name="password">
          <a-input-password
            v-model:value="form.password"
            :max-length="constant.password.maxLength"
            autocomplete="off"
          ></a-input-password>
        </a-form-item>
        <a-form-item v-if="state.error" :wrapperCol="constant.defaultOffset">
          <p class="error-text">{{ $t(`responseCode.${state.error}`) }}</p>
        </a-form-item>
        <a-form-item :wrapperCol="constant.defaultOffset">
          <a-button type="primary" :loading="state.submitting" @click="handleClickLogin" block>{{
            $t('action.login')
          }}</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts">
import { mapStores } from 'pinia';
import { useAuthStore } from '@/stores/auth';
export default {
  data() {
    return {
      constant: {
        defaultLabelCol: {
          span: 5
        },
        defaultOffset: {
          offset: 5
        },
        username: {
          maxLength: 32
        },
        password: {
          maxLength: 32
        }
      },
      state: {
        submitting: false as boolean,
        error: undefined as number | undefined
      },
      form: {
        username: undefined as string | undefined,
        password: undefined as string | undefined
      },
      rules: {
        username: [
          {
            required: true,
            whitespace: true,
            message: this.$t('tips.inputUsername'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 4,
            max: 32,
            message: this.$t('tips.inputUsername'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            whitespace: true,
            message: this.$t('tips.inputPassword'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 4,
            max: 32,
            message: this.$t('tips.inputPassword'),
            trigger: 'blur'
          }
        ]
      }
    };
  },
  computed: {
    ...mapStores(useAuthStore)
  },
  methods: {
    async handleClickLogin() {
      this.state.error = undefined;
      const result = await (this.$refs as any).form.validate();
      this.state.submitting = true;
      try {
        const response = await this.authStore.loadAuth({
          name: result.username,
          password: result.password
        });
        if (response.status === 200 && response.data.code === 0) {
          this.$router.push({ name: 'layout' });
          return;
        }
        if (response.data && response.data.code) {
          this.state.error = response.data.code;
        }
      } catch (error) {
        console.error(error);
        if (error.code) {
          this.state.error = error.code;
        }
      }
      this.state.submitting = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  max-width: min(100%, 30rem);

  margin: {
    left: auto;
    right: auto;
    top: 20vh;
  }

  .error-text {
    color: var(--error-color);
    margin-bottom: 0;
  }
}
</style>
