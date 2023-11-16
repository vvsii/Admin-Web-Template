<template>
  <a-form layout="inline">
    <a-form-item :label="$t('label.mobile')">
      <a-input v-model:value="form.mobile"></a-input>
    </a-form-item>
    <a-form-item :label="$t('label.type')">
      <a-select class="inline-select" v-model:value="form.type" :allowClear="true">
        <a-select-option v-for="(text, key) in changePasswordType" :key="key" :value="key">{{
          text
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :label="$t('label.operateType')">
      <a-select class="inline-select" v-model:value="form.operateType" :allowClear="true">
        <a-select-option v-for="(text, key) in changePasswordOperateType" :key="key" :value="key">{{
          text
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-button type="primary" @click="handleChangeForm(true)">{{ $t('action.search') }}</a-button>
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
  </a-table>
</template>
<script lang="ts">
import type { ChangePasswordHistoryRequest, ChangePasswordHistoryResponse } from '@/api';
import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { changePasswordHistory } from '@/api/manager';
import { CipsConstant } from '@/api/enum';
export default defineComponent({
  name: 'CChangePasswordLog',
  data() {
    return {
      state: {
        searching: false
      },
      form: {
        mobile: undefined,
        type: undefined,
        operateType: undefined
      } as ChangePasswordHistoryRequest,
      values: [] as ChangePasswordHistoryResponse[],
      pagination: {
        total: 0 as number,
        current: CipsConstant.DEFAULT_PAGE,
        pageSize: CipsConstant.DEFAULT_LIMIT,
        showTotal: (total: number) => {
          return this.$t('message.pagination.total', [total]);
        }
      }
    };
  },
  async mounted() {
    await this.loadForm(this.$route.query);
  },
  beforeRouteUpdate(to) {
    this.loadForm(to.query);
  },
  computed: {
    changePasswordType() {
      return this.$i18n.messages[this.$i18n.locale].changePasswordType;
    },
    changePasswordOperateType() {
      return this.$i18n.messages[this.$i18n.locale].changePasswordOperateType;
    },
    columns() {
      return [
        {
          title: this.$t('label.realName'),
          dataIndex: 'name'
        },
        {
          title: this.$t('label.mobile'),
          dataIndex: 'mobile'
        },
        {
          title: this.$t('label.type'),
          dataIndex: 'type',
          customRender: ({ text }) => {
            return this.$t(`changePasswordType.${text}`);
          }
        },
        {
          title: this.$t('label.operateType'),
          dataIndex: 'operateType',
          customRender: ({ text }) => {
            return this.$t(`changePasswordOperateType.${text}`);
          }
        },
        {
          title: this.$t('label.ip'),
          dataIndex: 'ip'
        },
        {
          title: this.$t('label.admin'),
          dataIndex: 'adminUid'
        },
        {
          title: this.$t('label.cdt'),
          dataIndex: 'time',
          customRender: ({ text }) => {
            return this.formatDate(text);
          }
        }
      ];
    }
  },
  methods: {
    formatDate(unix: number) {
      return dayjs(unix).format('YYYY-MM-DD HH:mm');
    },
    handleFormChange(pagination: {
      total: number;
      current: CipsConstant;
      pageSize: CipsConstant;
      showTotal: (total: number) => any;
    }) {
      this.pagination = pagination;
      this.handleChangeForm(false);
    },
    handleChangeForm(force: boolean) {
      const query = {
        ...this.form,
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
    async loadForm(query) {
      this.form = { ...query };
      this.pagination.current = Number(query.page || CipsConstant.DEFAULT_PAGE);
      this.pagination.pageSize = Number(query.limit || CipsConstant.DEFAULT_LIMIT);
      await this.loadData();
    },
    async loadData() {
      this.state.searching = true;
      try {
        const response = await changePasswordHistory({
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
});
</script>
<style lang="scss" scoped>
.inline-select {
  width: 10rem;
}
</style>
