<template>
  <a-form layout="inline" :model="form">
    <a-form-item :label="$t('id')" name="uid">
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
    class="work-break"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'type'">
        <a-tag v-if="record.type === 200" color="yellow">{{
          $t(`operateLogsTypeState.${record.type}`)
        }}</a-tag>
        <a-tag v-else-if="record.type === 201" color="error">{{
          $t(`operateLogsTypeState.${record.type}`)
        }}</a-tag>
        <a-tag v-else-if="record.type === 202" color="green">{{
          $t(`operateLogsTypeState.${record.type}`)
        }}</a-tag>
        <a-tag v-else-if="record.type === 203" color="blue">{{
          $t(`operateLogsTypeState.${record.type}`)
        }}</a-tag>
        <a-tag v-else>{{ $t(`operateLogsTypeState.${record.type}`) }}</a-tag>
      </template>
      <template v-else-if="column.dataIndex === 'before'">
        <a-tooltip>
          <template #title>{{ record.before }}</template>
          <a-button type="link">{{ $t('action.show') }}</a-button>
        </a-tooltip>
      </template>
      <template v-else-if="column.dataIndex === 'after'">
        <a-tooltip>
          <template #title>{{ record.after }}</template>
          <a-button type="link">{{ $t('action.show') }}</a-button>
        </a-tooltip>
      </template>
      <template v-else-if="column.dataIndex === 'cdt'">{{ formatDate(record.cdt) }}</template>
    </template>
  </a-table>
</template>
<script lang="ts">
import { CipsConstant } from '@/api/enum';
import { managerOperateLog } from '@/api/manager';
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
        uid: undefined as number | undefined,
        type: undefined as number | undefined,
        atTime: undefined as string | undefined,
        ipv4: undefined as string | undefined,
        before: undefined as string | undefined,
        after: undefined as string | undefined,
        cdt: undefined as string | undefined
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
    enabled() {
      return this.$i18n.messages[this.$i18n.locale].operateLogsTypeState;
    },
    columns() {
      return [
        {
          title: 'uid',
          dataIndex: 'uid'
        },
        {
          title: this.$t('label.type'),
          dataIndex: 'type'
        },
        {
          title: this.$t('label.atTime'),
          dataIndex: 'atTime'
        },
        {
          title: this.$t('ipv4'),
          dataIndex: 'ipv4'
        },
        {
          title: this.$t('label.before'),
          dataIndex: 'before',
          ellipsis: true
        },
        {
          title: this.$t('label.after'),
          dataIndex: 'after'
        },

        {
          title: this.$t('label.cdt'),
          dataIndex: 'cdt'
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
        name: this.$route.name,
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
        const response = await managerOperateLog({
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
<style lang="scss" scoped>
.inline-select {
  width: 10rem;
}

.work-break {
  word-break: break-all;
}
</style>
