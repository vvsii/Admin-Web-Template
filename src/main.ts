import { createApp } from 'vue';

import App from './App.vue';
import router from '@/router';
import store from '@/stores/pinia';
import i18n from '@/i18n';

import Antd from 'ant-design-vue';
import component from '@/component';

import 'ant-design-vue/dist/antd.css';
import '@/assets/main.scss';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(Antd);
app.use(component);

app.mount('#app');
