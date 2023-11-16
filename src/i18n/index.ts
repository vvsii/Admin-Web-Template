import { createI18n } from 'vue-i18n';

import zhCN from './zh_cn';
import enUS from './en_us';

const messages = {} as Record<string, any>;

for (const language of [zhCN, enUS]) {
  messages[language.code] = language;
}

const i18n = createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  messages
});

export { i18n as default };
