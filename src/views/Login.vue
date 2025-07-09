<script setup lang="ts">
import { ref } from 'vue';

// Define as variáveis reativas para os campos do formulário
const email = ref('');
const password = ref('');

// Função a ser chamada quando o formulário for enviado
const handleLogin = () => {
  // Aqui você adicionaria a lógica de autenticação
  console.log('Tentativa de login com:');
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  alert(`Login com ${email.value}`);
};
</script>

<template>
  <div class="flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex flex-col items-center">
        <NuxtLink to="/" class="flex items-center gap-4">
          <svg class="h-10 w-auto text-gray-600" viewBox="0 0 161.031 185.775" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M80.515 0L0 46.486v92.971L80.515 185.775l80.516-46.318v-92.97L80.515 0zm0 176.431L9.344 134.11V51.666L80.515 9.344l71.171 42.322V134.11L80.515 176.43z"/><path d="M80.515 12.592L15.344 51.666v82.445l65.171 39.076 65.172-39.076V51.666L80.515 12.592zm0 158.01L21.344 134.11V51.666L80.515 21.344l59.171 30.322V134.11L80.515 170.601zM48.243 62.486h64.545v11.53H60.01v16.142h50.11v11.53H60.01v19.46h52.778v11.53H48.243V62.486z"/></svg>
          <div class="h-8 w-px bg-gray-300"></div>
          <div class="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-600"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M8 4h8"/><path d="M10 20h4"/></svg>
            <h1 class="text-xl font-semibold text-gray-700">
              Pasteurizador
            </h1>
          </div>
        </NuxtLink>
      </div>

      <h2 class="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Acesse sua conta
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-6 py-8 shadow-sm ring-1 ring-gray-900/5 sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Endereço de email</label>
            <div class="mt-2">
              <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                     class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Senha</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-blue-600 hover:text-blue-700">Esqueceu a senha?</a>
              </div>
            </div>
            <div class="mt-2">
              <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required
                     class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Entrar
            </button>
          </div>
        </form>

        <p class="mt-8 text-center text-sm text-gray-500">
          Não é membro?
          <NuxtLink to="/cadastro" class="font-semibold leading-6 text-blue-600 hover:text-blue-700">Crie uma conta agora</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>