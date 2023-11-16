<template>
  <a-modal
    :visible="true"
    :title="$t(form.id ? 'action.edit' : 'action.add')"
    :confirmLoading="state.submitting"
    @ok="handleOkClick"
    @cancel="handleCloseClick"
  >
    <a-form ref="form" :model="form" :rules="rules" :labelCol="constant.defaultLabelCol">
      <a-form-item :label="$t('label.type')" name="type">
        <a-radio-group v-model:value="form.type">
          <a-radio v-for="(value, key) in menuType" :value="Number(key)" :key="key">{{
            value
          }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('label.name')" name="name">
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.parentMenu')">
        <a-cascader
          v-model:value="form.parentId"
          :options="treeData"
          :field-names="constant.fieldName"
          change-on-select
        ></a-cascader>
      </a-form-item>
      <a-form-item v-if="isMenu" :label="$t('label.menuRoute')" name="url">
        <a-input v-model:value="form.url"></a-input>
      </a-form-item>
      <a-form-item v-if="isMenu" :label="$t('label.menuPath')" name="path">
        <a-input v-model:value="form.path"></a-input>
      </a-form-item>
      <a-form-item v-if="notFolder" :label="$t('label.privilege')">
        <a-input v-model:value="form.privileges"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.i18n')">
        <a-input v-model:value="form.i18nKey"></a-input>
      </a-form-item>
      <a-form-item v-if="isMenu" :label="$t('label.menuMeta')">
        <a-input v-model:value="form.meta"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.sort')" name="sort">
        <a-input-number v-model:value="form.sort"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import type { MenuResponse } from '@/api';

import { MenuType } from '@/api/enum';
import { createMenu, updateMenu } from '@/api/menu';
export default {
  emits: ['success', 'close'],
  props: {
    entity: {
      type: Object as () => MenuResponse | boolean,
      required: false
    },
    treeData: {
      type: Array as () => MenuResponse[],
      required: true
    }
  },
  data() {
    return {
      state: {
        open: true,
        submitting: false
      },
      form: {
        id: undefined,
        type: MenuType.FOLDER,
        name: undefined,
        parentId: undefined,
        url: undefined,
        path: undefined,
        privileges: undefined,
        i18nKey: undefined,
        meta: undefined,
        sort: 0
      } as MenuResponse,
      constant: {
        defaultLabelCol: {
          span: 4
        },
        fieldName: {
          label: 'name',
          value: 'id'
        }
      }
    };
  },
  mounted() {
    if (typeof this.entity !== 'boolean') {
      this.form = {
        ...(this.entity as MenuResponse)
      };
    }
  },
  computed: {
    isMenu() {
      return this.form.type === MenuType.MENU;
    },
    notFolder() {
      return this.form.type !== MenuType.FOLDER;
    },
    menuType(): Record<number, string> {
      return this.$i18n.messages[this.$i18n.locale].menuType;
    },
    rules(): Record<string, any> {
      const initType = {
        // type: [
        //   {
        //     required: true,
        //     message: this.$t('tips.select', [this.$t('label.type')]),
        //     trigger: 'change'
        //   }
        // ],
        name: [
          {
            required: true,
            message: this.$t('tips.input', [this.$t('label.name')]),
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: this.$t('tips.input', [this.$t('label.sort')]),
            trigger: 'blur'
          }
        ]
      };

      if (MenuType.MENU === this.form.type) {
        return {
          ...initType,
          url: [
            {
              required: true,
              message: this.$t('tips.input', [this.$t('label.menuRoute')]),
              trigger: 'blur'
            }
          ],
          path: [
            {
              required: true,
              message: this.$t('tips.input', [this.$t('label.menuPath')]),
              trigger: 'blur'
            }
          ]
        };
      }
      return initType;
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('close');
    },
    async handleOkClick() {
      if (this.form.id) {
        await this.updateMenu(this.form);
      } else {
        await this.createMenu(this.form);
      }
    },
    async updateMenu(menu: MenuResponse) {
      const refForm = (this.$refs as any).form;
      refForm.clearValidate();

      if (Array.isArray(menu.parentId)) {
        if (menu.parentId.length === 0) {
          menu.parentId = undefined;
        } else {
          menu.parentId = menu.parentId[menu.parentId.length - 1];
        }
      }
      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;

      this.state.submitting = true;
      try {
        const response = await updateMenu(menu);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          this.$emit('success');
        }
      } catch (error) {
        console.log(error);
      }
      this.state.submitting = false;
    },
    async createMenu(menu: MenuResponse) {
      const refForm = (this.$refs as any).form;
      refForm.clearValidate();

      if (Array.isArray(menu.parentId)) {
        menu.parentId = menu.parentId[menu.parentId.length - 1];
      }
      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;
      this.state.submitting = true;
      try {
        const response = await createMenu(menu);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          this.$emit('success');
        }
      } catch (error) {
        console.log(error);
      }
      this.state.submitting = false;
    }
  }
};
</script>
