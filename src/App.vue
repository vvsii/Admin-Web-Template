<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts">
import dayjs from 'dayjs';

import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

export default {
  data() {
    return {
      locale: undefined
    };
  },
  computed: {
    locales() {
      return {
        zhCN,
        enUS
      } as Record<string, any>;
    }
  },
  watch: {
    '$i18n.locale': function () {
      this.changeLocale();
    }
  },
  mounted() {
    dayjs.extend(localizedFormat);
    this.changeLocale();
  },
  methods: {
    changeLocale() {
      this.locale = this.locales[this.$t('locale')];
      dayjs.locale(this.$t('code'));
    }
  }
};
</script>
