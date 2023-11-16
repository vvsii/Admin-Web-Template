<template>
  <a-modal
    :visible="true"
    :title="$t(form.id ? 'action.edit' : 'action.add')"
    :confirmLoading="state.submitting"
    @ok="handleOkClick"
    @cancel="handleCloseClick"
  >
    <a-form ref="form" :model="form" :rules="rules" :labelCol="constant.defaultLabelCol">
      <a-form-item :label="$t('label.username')" name="name">
        <template v-if="form.id">{{ form.name }}</template>
        <a-input v-else v-model:value="form.name"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.password')" name="password">
        <a-input-password v-model:value="form.password"></a-input-password>
      </a-form-item>
      <a-form-item :label="$t('label.confirmPassword')" name="confirm">
        <a-input-password v-model:value="form.confirm"></a-input-password>
      </a-form-item>
      <a-form-item :label="$t('label.role')">
        <a-checkbox-group v-model:value="form.roleIds" :options="roleOptions"></a-checkbox-group>
      </a-form-item>
      <a-form-item :label="$t('label.status')">
        <a-radio-group v-model:value="form.enabled">
          <a-radio v-for="(text, key) in enabled" :key="key" :value="key">{{ text }}</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import type { ManagerUpdateBody, RoleListResponse } from '@/api';
import { queryRole } from '@/api/role';
import { managerInfo, managerSignUp, managerUpdate } from '@/api/manager';
export default {
  emits: ['success', 'close'],
  props: {
    uid: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      state: {
        submitting: false
      },
      roles: [] as RoleListResponse[],
      form: {
        enabled: 'true'
      } as ManagerUpdateBody,
      constant: {
        defaultLabelCol: {
          span: 4
        }
      }
    };
  },
  async created() {
    await Promise.all([this.loadManager(), this.loadRole()]);
  },
  computed: {
    enabled() {
      return this.$i18n.messages[this.$i18n.locale].enabled;
    },
    roleOptions() {
      return this.roles.map((item) => {
        return {
          label: item.name,
          value: item.id
        };
      });
    },
    rules() {
      const value = {
        name: [
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
        ],
        confirm: [
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
          },
          {
            validator: (rule, value): any => {
              if (value !== this.form.password) {
                return Promise.reject(this.$t('tips.passwordNotMatch'));
              }
              return Promise.resolve();
            },
            trigger: 'blur'
          }
        ]
      };
      const update = {
        password: [
          {
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
        ],
        confirm: [
          {
            message: this.$t('tips.inputPassword'),
            trigger: 'blur'
          },
          {
            type: 'string',
            min: 4,
            max: 32,
            message: this.$t('tips.inputPassword'),
            trigger: 'blur'
          },
          {
            validator: (rule, value): any => {
              if (value !== this.form.password) {
                return Promise.reject(this.$t('tips.passwordNotMatch'));
              }
              return Promise.resolve();
            },
            trigger: 'blur'
          }
        ]
      };
      return this.form.id ? update : value;
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('close');
    },
    async handleOkClick() {
      const refForm = (this.$refs as any).form;
      refForm.clearValidate();

      const result = await refForm.validate();
      console.log(result);
      if (result.errorFields && result.errorFields.length > 0) {
        return;
      }

      if (this.form.id) {
        await this.updateManager(this.form);
      } else {
        await this.createManager(this.form);
      }
    },
    async loadManager() {
      if (typeof this.uid === 'number') {
        const response = await managerInfo(this.uid);
        if (response.status === 200 && response.data.code === 0) {
          this.form = response.data.result;
          this.form.enabled = String(this.form.enabled);
        }
      }
    },
    async loadRole() {
      try {
        const response = await queryRole();
        if (response.status === 200 && response.data.code === 0) {
          this.roles = response.data.result;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateManager(body: ManagerUpdateBody) {
      this.state.submitting = true;
      try {
        const response = await managerUpdate(body);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          this.$emit('success');
        }
      } catch (error) {
        console.error(error);
      }
      this.state.submitting = false;
    },
    async createManager(body: ManagerUpdateBody) {
      this.state.submitting = true;
      try {
        const response = await managerSignUp(body);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          this.$emit('success');
        }
      } catch (error) {
        console.error(error);
      }
      this.state.submitting = false;
    }
  }
};
</script>
