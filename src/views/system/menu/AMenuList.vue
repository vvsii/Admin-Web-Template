<template>
  <c-auth has="menu:add">
    <a-form>
      <a-form-item>
        <a-button type="primary" @click="handleAddClick">{{ $t('action.add') }}</a-button>
      </a-form-item>
    </a-form>
  </c-auth>
  <menu-change
    v-if="state.addOrEdit"
    :entity="state.addOrEdit"
    :tree-data="dataSource"
    @close="handleEditClose"
    @success="handleSuccessEvent"
  ></menu-change>
  <a-table
    row-key="id"
    :data-source="dataSource"
    :columns="columns"
    :loading="state.searching"
    :pagination="pagination"
    @change="handleFormChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'type'">
        <a-tag>{{ $t(`menuType.${record.type}`) }}</a-tag>
      </template>
      <tamplate v-else-if="column.dataIndex === 'action'">
        <div class="btn-group">
          <c-auth has="menu:edit">
            <a-button @click="handleEditClick(record)">{{ $t('action.edit') }}</a-button>
          </c-auth>
          <c-auth has="menu:delete">
            <a-popconfirm :title="$t('ask.confirm')" @confirm="handleDeleteClick(record.id)">
              <a-button danger>{{ $t('action.delete') }}</a-button>
            </a-popconfirm>
          </c-auth>
        </div>
      </tamplate>
    </template>
  </a-table>
</template>
<script lang="ts">
import type { MenuResponse } from '@/api';
import { menuList, deleteMenu } from '@/api/menu';
import MenuChange from './AMenuChange.vue';
import { CipsConstant } from '@/api/enum';

export default {
  components: {
    MenuChange
  },
  data() {
    return {
      state: {
        searching: false,
        addOrEdit: false as boolean | MenuResponse
      },
      values: [] as MenuResponse[],
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
    this.loadForm();
  },
  computed: {
    dataSource() {
      const result = {
        0: [] as MenuResponse[]
      } as Record<number, MenuResponse[]>;
      for (const item of this.values) {
        if (item.parentId) {
          if (!result[item.parentId]) {
            result[item.parentId] = [];
          }
          result[item.parentId].push(item);
        } else {
          result[0].push(item);
        }
      }
      for (const item of this.values) {
        if (item.id && result[item.id]) {
          item.children = result[item.id];
        }
      }
      return result[0];
    },
    columns() {
      return [
        {
          title: this.$t('label.name'),
          dataIndex: 'name'
        },
        {
          title: this.$t('label.type'),
          dataIndex: 'type'
        },
        {
          title: this.$t('label.sort'),
          dataIndex: 'sort'
        },
        {
          title: this.$t('label.menuRoute'),
          dataIndex: 'url'
        },
        {
          title: this.$t('label.menuPath'),
          dataIndex: 'path'
        },
        {
          title: this.$t('label.privilege'),
          dataIndex: 'privileges'
        },
        {
          title: this.$t('action.operate'),
          dataIndex: 'action'
        }
      ];
    }
  },
  methods: {
    handleAddClick() {
      this.state.addOrEdit = true;
    },
    handleEditClose() {
      this.state.addOrEdit = false;
    },
    handleEditClick(entity: MenuResponse) {
      this.state.addOrEdit = entity;
    },
    async handleDeleteClick(id: number) {
      try {
        const response = await deleteMenu(id);
        if (response.status === 200 && response.data.code === 0) {
          this.$message.success(this.$t('message.action.success'));
          await this.loadForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleSuccessEvent() {
      this.state.addOrEdit = false;
      await this.loadForm();
    },
    async loadForm() {
      await this.loadData();
    },
    handleChangeForm(force: boolean) {
      const query = {
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
    async loadData() {
      this.state.searching = true;
      try {
        const response = await menuList({
          page: this.pagination.current,
          limit: this.pagination.pageSize
        });
        if (response.status === 200 && response.data.code === 0) {
          this.values = response.data.result;
        }
      } catch (error) {
        console.log(error);
      }
      this.state.searching = false;
    }
  }
};
</script>
<style lang="scss">
.btn-group {
  > * {
    margin-right: 8px;
  }
}
</style>
