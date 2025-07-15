import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.config.errorHandler = (err, instance, info) => {

  router.push({
    path: '/error',
    query: {
      code: '500',
      title: 'Ocorreu um Erro na Aplicação',
      description: 'Nossa equipe foi notificada sobre uma falha inesperada. Por favor, tente recarregar a página ou volte mais tarde.'
    }
  });
}

app.use(router);
app.mount('#app');