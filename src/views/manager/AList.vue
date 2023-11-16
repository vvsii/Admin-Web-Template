<template>
  <a-form layout="inline" :model="form">
    <a-form-item :label="$t('label.username')" name="username">
      <a-input v-model:value="form.name"></a-input>
    </a-form-item>
    <a-form-item :label="$t('label.status')" name="status">
      <a-select class="inline-select" v-model:value="form.enabled" :allowClear="true">
        <a-select-option v-for="(text, key) in enabled" :key="key" :value="key">{{
          text
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-space>
      <a-button type="primary" :loading="state.searching" @click="handleChangeForm(true)">{{
        $t('action.search')
      }}</a-button>
      <a-button @click="handleAddClick">{{ $t('action.add') }}</a-button>
    </a-space>
  </a-form>
  <a-divider></a-divider>
  <a-table
    rowKey="id"
    :loading="state.searching"
    :dataSource="values"
    :columns="columns"
    :pagination="pagination"
    @change="handleFormChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'enabled'">
        <a-switch
          :checked="record.enabled"
          :disabled="record.id == uid"
          :checked-children="$t('state.enabled')"
          :un-checked-children="$t('state.disabled')"
          :loading="state.stateUid === record.id"
          @change="(checked: boolean) => handleEnableChange(record.id, checked)"
        ></a-switch>
      </template>
      <template v-else-if="column.dataIndex === 'cdt'">{{ formatDate(record.cdt) }}</template>
      <template v-else-if="column.dataIndex === 'operate'">
        <a-button @click="handleEditClick(record.id)">{{ $t('action.edit') }}</a-button>
      </template>
    </template>
  </a-table>
  <admin-change
    v-if="state.addOrEdit"
    :uid="state.addOrEdit"
    @success="handleSuccessEvent"
    @close="handleEditClose"
  ></admin-change>
</template>
<script lang="ts">
import dayjs from 'dayjs';
import type { LocationQuery } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import { CipsConstant } from '@/api/enum';
import { managerList, managerEnabled } from '@/api/manager';
import adminChange from './AAdminChange.vue';

export default {
  components: {
    adminChange
  },
  data() {
    return {
      state: {
        searching: false as boolean,
        stateUid: undefined as number | undefined,
        activeUid: undefined as number | undefined,
        addOrEdit: false as number | boolean
      },
      form: {
        name: undefined as string | undefined,
        enabled: true as boolean
      },
      values: [],
      pagination: {
        total: 0 as number,
        current: CipsConstant.DEFAULT_PAGE,
        pageSize: CipsConstant.DEFAULT_LIMIT,
        showTotal: (total: number) => {
          return this.$t('message.pagination.total', [total]);
        },
        showSizeChanger: true
      }
    };
  },
  mounted() {
    this.loadForm(this.$route.query);
  },
  computed: {
    uid() {
      return useAuthStore().$state.payload?.aud;
    },
    enabled() {
      return this.$i18n.messages[this.$i18n.locale].enabled;
    },
    columns() {
      return [
        {
          title: 'id',
          dataIndex: 'id'
        },
        {
          title: this.$t('label.username'),
          dataIndex: 'name'
        },
        {
          title: this.$t('label.status'),
          dataIndex: 'enabled'
        },
        {
          title: this.$t('label.cdt'),
          dataIndex: 'cdt'
        },
        {
          title: this.$t('action.operate'),
          dataIndex: 'operate'
        }
      ];
    }
  },
  beforeRouteUpdate(to) {
    this.loadForm(to.query);
  },
  methods: {
    formatDate(unix: number) {
      return dayjs(unix).format('YYYY-MM-DD HH:mm');
    },
    handleAddClick() {
      this.state.addOrEdit = true;
    },
    handleEditClose() {
      this.state.addOrEdit = false;
    },
    handleEditClick(id: number) {
      this.state.addOrEdit = id;
    },
    async handleSuccessEvent() {
      this.state.addOrEdit = false;
      await this.loadData();
    },
    handleChangeForm(force: boolean) {
      const query = {
        name: this.form.name,
        enabled: this.form.enabled,
        page: this.pagination.current,
        limit: this.pagination.pageSize
      };
      if (force === true) {
        query.t = Date.now();
        query.page = CipsConstant.DEFAULT_PAGE;
      }
      this.$router.push({
        name: this.$route.name,
        query: query
      });
    },
    async handleEnableChange(uid: number, checked: boolean) {
      this.state.stateUid = uid;
      try {
        const response = await managerEnabled({ uid: uid, enabled: checked });
        if (response.status === 200) {
          if (response.data.code === 0) {
            this.$message.success(this.$t('message.action.success'));
            await this.loadData();
          }
        }
      } catch (error) {
        console.error(error);
      }
      this.state.stateUid = undefined;
    },
    async loadForm(query: LocationQuery) {
      const { name, enabled, page, limit } = query;
      this.form = { name, enabled };
      this.pagination.current = Number(page || CipsConstant.DEFAULT_PAGE);
      this.pagination.pageSize = Number(limit || CipsConstant.DEFAULT_LIMIT);
      await this.loadData();
    },
    handleFormChange(pagination) {
      this.pagination = pagination;
      this.handleChangeForm(false);
    },
    async loadData() {
      this.state.searching = true;
      try {
        const response = await managerList({
          name: this.form.name,
          enabled: this.form.enabled,
          page: this.pagination.current,
          limit: this.pagination.pageSize
        });
        if (response.status === 200 && response.data.code === 0) {
          this.values = response.data.result;
          this.pagination.total = response.data.records;
        }
      } catch (error) {
        console.error(error);
      }
      this.state.searching = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.inline-select {
  width: 10rem;
}
</style>
