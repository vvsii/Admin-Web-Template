import Cauth from './AAuth.vue';

export default {
  install: (app: App) => {
    app.component(Cauth.name, Cauth);
  }
};
