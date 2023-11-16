<template>
  <a-form layout="inline">
    <a-form-item :label="$t('label.name')">
      <a-input v-model:value="form.name" />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" :loading="state.searching" @click="handleChangeForm(true)">{{
        $t('action.search')
      }}</a-button>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleAddClick">{{ $t('action.add') }}</a-button>
    </a-form-item>
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
      <template v-if="column.dataIndex === 'cdt'">{{ formatDate(record.cdt) }}</template>
      <template v-else-if="column.dataIndex === 'operate'">
        <a-space>
          <a-button @click="handleEditClick(record.id)">{{ $t('action.edit') }}</a-button>
          <a-popconfirm :title="$t('ask.confirm')" @confirm="handleDeleteClick(record.id)">
            <a-button danger>{{ $t('action.delete') }}</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </template>
  </a-table>
  <role-change
    v-if="state.addOrEdit"
    :entity="state.addOrEdit"
    @success="handleSuccessEvent"
    @close="handleEditClose"
  ></role-change>
</template>
<script lang="ts">
import type { RoleListResponse } from '@/api';
import { CipsConstant } from '@/api/enum';

import dayjs from 'dayjs';

import RoleChange from './ARoleChange.vue';
import { queryRole, queryRoleInfo, deleteRole } from '@/api/role';

export default {
  components: {
    RoleChange
  },
  data() {
    return {
      state: {
        searching: false as boolean,
        addOrEdit: false as boolean
      },
      form: {
        name: undefined
      },
      values: [] as RoleListResponse[],
      pagination: {
        total: 0 as number,
        current: CipsConstant.DEFAULT_PAGE,
        pageSize: CipsConstant.DEFAULT_LIMIT,
        showTotal: (total: number) => {
          return this.$t('message.pagination.total', [total]);
        },
        showSizeChanger: true
      },
      columns: [
        {
          title: this.$t('label.name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('label.remark'),
          dataIndex: 'remark'
        },
        {
          title: this.$t('label.cdt'),
          dataIndex: 'cdt'
        },
        {
          title: this.$t('action.operate'),
          dataIndex: 'operate'
        }
      ]
    };
  },
  async mounted() {
    await this.loadForm(this.$route.query);
  },
  beforeRouteUpdate(to) {
    this.loadForm(to.query);
  },
  methods: {
    formatDate(date: string) {
      return dayjs(date).format('YYYY-MM-DD HH:mm');
    },
    handleAddClick() {
      this.state.addOrEdit = true;
    },
    handleEditClose() {
      this.state.addOrEdit = false;
    },
    async handleSuccessEvent() {
      this.state.addOrEdit = false;
      await this.loadData();
    },
    async handleEditClick(id: number) {
      try {
        const response = await queryRoleInfo(id);
        if (response.status === 200 && response.data.code === 0) {
          this.state.addOrEdit = response.data.result;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async handleDeleteClick(id: number) {
      try {
        const response = await deleteRole(id);
        if (response.status === 200 && response.data.code === 0) {
          this.loadData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    handleChangeForm(force: boolean) {
      const query = {
        name: this.form.name,
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
    handleFormChange(pagination) {
      this.pagination = pagination;
      this.handleChangeForm(false);
    },
    async loadForm(query: any) {
      const { name, page, limit } = query;
      this.form = { name };
      this.pagination.current = Number(page || CipsConstant.DEFAULT_PAGE);
      this.pagination.pageSize = Number(limit || CipsConstant.DEFAULT_LIMIT);
      await this.loadData();
    },
    async loadData() {
      this.state.searching = true;
      try {
        const response = await queryRole({
          ...this.form,
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
