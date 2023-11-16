<template>
  <a-form layout="inline" :model="form">
    <a-form-item :label="$t('label.bankName')" name="bankName">
      <a-input v-model:value="form.bankName"></a-input>
    </a-form-item>
    <a-form-item :label="$t('label.cardName')" name="cardName">
      <a-input v-model:value="form.cardName"></a-input>
    </a-form-item>
    <a-form-item :label="$t('label.cardNumber')" name="cardNumber">
      <a-input v-model:value="form.cardNumber"></a-input>
    </a-form-item>
    <a-form-item :label="$t('label.type')" name="type">
      <a-select class="inline-select" v-model:value="form.type" :allowClear="true">
        <a-select-option v-for="(text, key) in patmenyType" :key="key" :value="Number(key)">{{
          text
        }}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" :loading="state.searching" @click="handleChangeForm()">{{
        $t('action.search')
      }}</a-button>
    </a-form-item>
    <a-form-item>
      <a-button @click="showModal">{{ $t('action.add') }}</a-button>
    </a-form-item>
  </a-form>
  <a-modal v-model:visible="visible" :title="$t('action.' + modal)">
    <a-form ref="formPayment" :model="formPayment" :labelCol="constant.defaultLabelCol">
      <a-form-item :label="$t('label.type')" name="type" :rules="[{ required: true }]">
        <a-select class="inline-select" v-model:value="formPayment.type" :allowClear="true">
          <a-select-option v-for="(text, key) in patmenyType" :key="key" :value="Number(key)">{{
            text
          }}</a-select-option>
        </a-select>
      </a-form-item>
      <template v-if="formPayment.type == BankInfoApplyType.USDT">
        <a-form-item :label="$t('label.name')" name="cardName" :rules="[{ required: true }]">
          <a-input v-model:value="formPayment.cardName"></a-input>
        </a-form-item>
        <a-input :value="(formPayment.bankName = 'wallet address')" hidden></a-input>
        <a-form-item
          :label="$t('label.walletAddress')"
          name="walletAddress"
          :rules="[{ required: true, pattern: /T[A-Za-z1-9]{33}/ }]"
        >
          <a-input v-model:value="formPayment.walletAddress"></a-input>
        </a-form-item>
      </template>

      <template v-else-if="formPayment.type == BankInfoApplyType.ALIPAY">
        <a-form-item
          :label="$t('label.alipayAccount')"
          name="cardName"
          :rules="[{ required: true }]"
        >
          <a-input v-model:value="formPayment.cardName"></a-input>
        </a-form-item>
        <a-input :value="(formPayment.bankName = 'alipay address')" hidden></a-input>
        <a-form-item
          :label="$t('label.alipayUser')"
          name="cardNumber"
          :rules="[{ required: true, min: 1, max: 32 }]"
        >
          <a-input v-model:value="formPayment.cardNumber"></a-input>
        </a-form-item>
      </template>
      <template v-else-if="formPayment.type == BankInfoApplyType.CARD">
        <a-form-item :label="$t('label.bankName')" name="bankName" :rules="[{ required: true }]">
          <a-input v-model:value="formPayment.bankName"></a-input>
        </a-form-item>
        <a-form-item :label="$t('label.branchBank')" name="branch" :rules="[{ required: true }]">
          <a-input v-model:value="formPayment.branch"></a-input>
        </a-form-item>
        <a-form-item :label="$t('label.cardName')" name="cardName" :rules="[{ required: true }]">
          <a-input v-model:value="formPayment.cardName"></a-input>
        </a-form-item>
        <a-form-item
          :label="$t('label.cardNumber')"
          name="cardNumber"
          :rules="[{ required: true, min: 10, max: 20 }]"
        >
          <a-input v-model:value="formPayment.cardNumber"></a-input>
        </a-form-item>
      </template>

      <a-form-item v-if="state.error" :wrapperCol="constant.defaultOffset">
        <p class="error-text">{{ $t(`responseCode.${state.error}`) }}</p>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-form-item>
        <a-button type="primary" :loading="state.submitting" @click="handleSubmit">{{
          $t('action.' + modal)
        }}</a-button>
      </a-form-item>
    </template>
  </a-modal>
  <a-divider></a-divider>
  <a-table
    rowKey="id"
    :dataSource="values"
    :pagination="pagination"
    :columns="columns"
    @change="handleFormChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'cdt'">{{ formatDate(record.cdt) }}</template>
      <template v-else-if="column.dataIndex === 'udt'">{{ formatDate(record.udt) }}</template>
      <template v-else-if="column.dataIndex === 'type'">{{
        $t('bankInfoApplyType.' + record.type)
      }}</template>
      <template v-else-if="column.dataIndex == 'operate'">
        <a-button @click="handleModalEdit(record)" type="primary" size="small">
          <template #icon>
            <edit-outlined />
          </template>
        </a-button>
        <a-popconfirm
          :title="$t('ask.confirm')"
          :ok-text="$t('title.confirm')"
          :cancel-text="$t('action.cancel')"
          @confirm="handleDelete(record.id)"
        >
          <a-button type="danger" size="small">
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
import { CipsConstant, BankInfoApplyType } from '@/api/enum';
import {
  AddPaymentMethod,
  DeletePaymentMethod,
  PaymentMethodList,
  UpdatePaymentMethod
} from '@/api/paymentMethod';
import dayjs from 'dayjs';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
export default {
  components: {
    EditOutlined,
    DeleteOutlined
  },
  props: {
    uid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      BankInfoApplyType: BankInfoApplyType,
      modal: 'add' || 'edit',
      visible: false as boolean,
      state: {
        searching: false as boolean,
        error: undefined as number | undefined,
        submitting: false as boolean
      },
      constant: {
        defaultLabelCol: {
          span: 8
        },
        defaultOffset: {
          offset: 16
        }
      },
      form: {
        id: 0 as number,
        uid: 0 as number,
        type: undefined as number | undefined,
        bankName: undefined as string | undefined,
        cardName: undefined as string | undefined,
        cardNumber: undefined as number | undefined,
        walletAddress: undefined as string | undefined
      },
      formPayment: {
        id: 0 as number,
        uid: 0 as number,
        type: BankInfoApplyType.CARD as number,
        bankName: undefined as string | undefined,
        branch: undefined as string | undefined,
        cardName: undefined as string | undefined,
        cardNumber: undefined as number | undefined,
        walletAddress: undefined as string | undefined
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
  computed: {
    patmenyType() {
      return this.$i18n.messages[this.$i18n.locale].bankInfoApplyType;
    },
    columns() {
      return [
        {
          title: this.$t('label.id'),
          dataIndex: 'id'
        },
        {
          title: this.$t('label.uid'),
          dataIndex: 'uid'
        },
        {
          title: this.$t('label.type'),
          dataIndex: 'type'
        },
        {
          title: this.$t('label.walletAddress'),
          dataIndex: 'walletAddress',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.bankName'),
          dataIndex: 'bankName',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.branchBank'),
          dataIndex: 'branch',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.bankNumber'),
          dataIndex: 'bankNumber',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.cardName'),
          dataIndex: 'cardName',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.cardNumber'),
          dataIndex: 'cardNumber',
          customRender: ({ text }) => {
            return text ? text : '-';
          }
        },
        {
          title: this.$t('label.cdt'),
          dataIndex: 'cdt'
        },
        {
          title: this.$t('label.udt'),
          dataIndex: 'udt'
        },
        {
          title: this.$t('action.operate'),
          dataIndex: 'operate'
        }
      ];
    }
  },
  mounted() {
    this.form.uid = this.$props.uid;
    this.loadData();
  },
  watch: {
    $props: {
      handler: function (val) {
        this.form.uid = val.uid;
        this.loadData();
      },
      deep: true
    }
  },
  methods: {
    showModal() {
      this.clearForm();
      this.visible = true;
      this.modal = 'add';
    },
    formatDate(unix: number) {
      return dayjs(unix).format('YYYY-MM-DD HH:mm');
    },
    async handleSubmit() {
      if (this.modal === 'add') {
        await this.handleAddPayment();
      } else {
        await this.handleEditPayment();
      }
    },
    async handleAddPayment() {
      const refForm = (this.$refs as any).formPayment;
      refForm.clearValidate();

      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;

      this.state.error = undefined;
      this.state.submitting = true;
      try {
        const res = await AddPaymentMethod({
          uid: this.form.uid,
          type: this.formPayment.type,
          walletAddress: this.formPayment.walletAddress,
          bankName: this.formPayment.bankName,
          branch: this.formPayment.branch,
          cardName: this.formPayment.cardName,
          cardNumber: this.formPayment.cardNumber
        });
        if (res.status === 200 && res.data.code === 0) {
          message.success(this.$t('message.action.success'));
          this.visible = false;
          this.loadData();
          this.clearForm();
        }
        if (res.status === 200 && res.data) {
          this.state.error = res.data.code;
        }
      } catch (e) {
        console.log(e);
      }

      this.state.submitting = false;
    },
    async handleEditPayment() {
      const refForm = (this.$refs as any).formPayment;
      refForm.clearValidate();

      const result = await refForm.validate();
      if (result.errorFields && result.errorFields.length > 0) return;

      this.state.error = undefined;
      this.state.submitting = true;
      try {
        const res = await UpdatePaymentMethod({
          id: this.formPayment.id,
          uid: this.formPayment.uid,
          type: this.formPayment.type,
          walletAddress: this.formPayment.walletAddress,
          bankName: this.formPayment.bankName,
          branch: this.formPayment.branch,
          cardName: this.formPayment.cardName,
          cardNumber: this.formPayment.cardNumber
        });
        if (res.status === 200 && res.data.code === 0) {
          message.success(this.$t('message.action.success'));
          this.visible = false;
          this.loadData();
          this.clearForm();
        }
        if (res.status === 200 && res.data) {
          this.state.error = res.data.code;
        }
      } catch (error) {
        console.log(error);
      }
      this.state.submitting = false;
    },
    clearForm() {
      this.formPayment.bankName = undefined;
      this.formPayment.branch = undefined;
      this.formPayment.cardName = undefined;
      this.formPayment.cardNumber = undefined;
      this.formPayment.walletAddress = undefined;
    },
    handleModalEdit(record) {
      this.modal = 'edit';
      this.visible = true;
      this.formPayment.id = record.id;
      this.formPayment.uid = record.uid;
      this.formPayment.bankName = record.bankName;
      this.formPayment.walletAddress = record.walletAddress;
      this.formPayment.type = record.type;
      this.formPayment.cardName = record.cardName;
      this.formPayment.branch = record.branch;
      this.formPayment.cardNumber = record.cardNumber;
    },
    handleChangeForm() {
      this.loadData();
    },
    handleFormChange(pagination) {
      this.pagination = pagination;
      this.handleChangeForm();
    },
    async handleDelete(id: number) {
      try {
        const res = await DeletePaymentMethod(id);
        if (res.status === 200 && res.data.code === 0) {
          message.success(this.$t('message.action.success'));
          this.loadData();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async loadData() {
      this.state.searching = true;
      try {
        const res = await PaymentMethodList({
          uid: this.form.uid,
          type: this.form.type,
          bankName: this.form.bankName,
          cardName: this.form.cardName,
          cardNumber: this.form.cardNumber,
          page: this.pagination.current,
          limit: this.pagination.pageSize
        });
        if (res.status === 200 && res.data.code === 0) {
          this.values = res.data.result;
          this.pagination.total = res.data.records;
        }
      } catch (e) {
        console.log(e);
      }
      this.state.searching = false;
    }
  }
};
</script>

<style ang="scss" scoped>
.inline-select {
  width: 10rem;
}
</style>
