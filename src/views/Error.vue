<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'ErrorView',
  props: {
    errorCode: {
      type: [String, Number],
      default: 'Erro',
    },
    errorTitle: {
      type: String,
      default: 'Algo deu errado',
    },
    errorDescription: {
      type: String,
      default: "Um erro inesperado ocorreu. Tente novamente ou volte para a página inicial.",
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    // Função para navegar para a página inicial
    const goHome = () => {
      router.push('/');
    };

    // Função para voltar para a página anterior
    const goBack = () => {
      router.go(-1);
    };

    // ✨ Lógica para pegar o erro detectado (da URL ou das props)
    // Prioriza o erro passado via query params, senão usa as props
    const finalErrorCode = computed(() => route.query.code || props.errorCode);
    const finalErrorTitle = computed(() => route.query.title || props.errorTitle);
    const finalErrorDescription = computed(() => route.query.description || props.errorDescription);

    return {
      goHome,
      goBack,
      finalErrorCode,
      finalErrorTitle,
      finalErrorDescription,
    };
  },
});
</script>

<template>
  <div class="bg-gray-100 dark:bg-gray-900 h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="relative inline-block">
        <h1 class="text-9xl font-extrabold text-blue-500 tracking-wider">{{ finalErrorCode }}</h1>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      </div>
      <h2 class="text-3xl font-bold text-gray-800 dark:text-white mt-8 mb-4">{{ finalErrorTitle }}</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">{{ finalErrorDescription }}</p>
      <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button @click="goHome" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
          <svg class="w-5 h-5 mr-2 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          Voltar para a Home
        </button>
        <button @click="goBack" class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
          Voltar
        </button>
      </div>
      <div class="mt-8 text-sm text-gray-500 dark:text-gray-400">
        Se o problema persistir, entre em contato com o desenvolvedor <a href="mailto:caiodanielfonseca@gmail.com" class="text-blue-500 hover:underline">email</a>.
      </div>
    </div>
  </div>
</template>

<style>
/* Animação para o "blob" de fundo */
.animate-blob {
  animation: blob 7s infinite;
}

@keyframes blob {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  33% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  66% {
    transform: translate(-50%, -50%) scale(0.9);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>