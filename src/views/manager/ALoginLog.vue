<template>
  <a-form layout="inline" :model="form">
    <a-form-item :label="$t('label.uid')" name="uid">
      <a-input v-model:value="form.uid"></a-input>
    </a-form-item>
    <a-button type="primary" :loading="state.searching" @click="handleChangeForm(true)">{{
      $t('action.search')
    }}</a-button>
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
      <template v-if="column.dataIndex === 'inTime'">{{ formatDate(record.inTime) }}</template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { CipsConstant } from '@/api/enum';
import { managerLoginLog } from '@/api/manager';
import dayjs from 'dayjs';
import type { LocationQuery } from 'vue-router';

export default {
  data() {
    return {
      state: {
        searching: false as boolean,
        stateUid: undefined as number | undefined,
        activeUid: undefined as number | undefined
      },
      form: {
        id: undefined as number | undefined,
        uid: undefined as string | undefined,
        in_time: undefined as number | undefined,
        ipv4: undefined as string | undefined,
        ua: undefined as string | undefined
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
    columns() {
      return [
        {
          title: 'id',
          dataIndex: 'id'
        },
        {
          title: this.$t('label.uid'),
          dataIndex: 'uid'
        },
        {
          title: this.$t('in_time'),
          dataIndex: 'inTime'
        },
        {
          title: this.$t('ipv4'),
          dataIndex: 'ipv4'
        },
        {
          title: this.$t('ua'),
          dataIndex: 'ua'
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
    handleChangeForm(force: boolean) {
      const query = {
        uid: this.form.uid,
        page: this.pagination.current,
        limit: this.pagination.pageSize
      };
      if (force === true) {
        query.t = Date.now();
        query.page = CipsConstant.DEFAULT_PAGE;
      }
      this.$router.push({
        query: query
      });
    },
    async loadForm(query: LocationQuery) {
      const { uid, page, limit } = query;
      this.form = { uid };
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
        const response = await managerLoginLog({
          uid: this.form.uid,
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
