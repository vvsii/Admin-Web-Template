<template>
  <a-modal
    :visible="true"
    :title="$t(form.id ? 'action.edit' : 'action.add')"
    :confirmLoading="state.submitting"
    @ok="handleOkClick"
    @cancel="handleCloseClick"
  >
    <a-form ref="form" :model="form" :rules="rules" :labelCol="constant.defaultLabelCol">
      <a-form-item :label="$t('label.name')" name="name">
        <a-input v-model:value="form.name"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.remark')">
        <a-input v-model:value="form.remark"></a-input>
      </a-form-item>
      <a-form-item :label="$t('label.menu')">
        <a-tree
          :tree-data="treeData"
          :field-names="constant.fieldName"
          v-model:checked-keys="form.menuIds"
          checkable
        ></a-tree>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts">
import type { MenuResponse, RoleResponse } from '@/api';
import { menuList } from '@/api/menu';
import { createRole, updateRole } from '@/api/role';
export default {
  emits: ['success', 'close'],
  props: {
    entity: {
      type: Object as () => RoleResponse | boolean,
      required: false
    }
  },
  data() {
    return {
      state: {
        submitting: false
      },
      form: {
        name: undefined,
        remark: undefined,
        menuIds: []
      } as RoleResponse,
      menus: [] as MenuResponse[],
      rules: {
        name: [{ required: true, message: this.$t('tips.input', [this.$t('label.name')]) }]
      },
      constant: {
        defaultLabelCol: {
          span: 4
        },
        fieldName: {
          title: 'name',
          key: 'id'
        }
      }
    };
  },
  async created() {
    if (typeof this.entity !== 'boolean') {
      this.form = {
        ...(this.entity as RoleResponse)
      };
    }
    await this.loadMenus();
  },
  computed: {
    treeData() {
      const result = {
        0: [] as MenuResponse[]
      } as Record<number, MenuResponse[]>;
      for (const item of this.menus) {
        if (item.parentId) {
          if (!result[item.parentId]) {
            result[item.parentId] = [];
          }
          result[item.parentId].push(item);
        } else {
          result[0].push(item);
        }
      }
      for (const item of this.menus) {
        if (item.id && result[item.id]) {
          item.children = result[item.id];
        }
      }
      return result[0];
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('close');
    },
    async handleOkClick() {
      if (this.form.id) {
        await this.updateRole(this.form);
      } else {
        await this.createRole(this.form);
      }
    },
    async loadMenus() {
      const response = await menuList({
        page: 1,
        limit: 1000
      });
      if (response.status === 200 && response.data.code === 0) {
        this.menus = response.data.result;
      }
    },
    async updateRole(data: RoleResponse) {
      const refForm = (this.$refs as any).form;
      refForm.clearValidate();

      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;

      this.state.submitting = true;
      try {
        const response = await updateRole(data);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          this.$emit('success');
        }
      } catch (error) {
        console.log(error);
      }
      this.state.submitting = false;
    },
    async createRole(data: RoleResponse) {
      const refForm = (this.$refs as any).form;
      refForm.clearValidate();

      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;

      this.state.submitting = true;
      try {
        const response = await createRole(data);
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
