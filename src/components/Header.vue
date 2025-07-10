<script setup lang="ts">
import { ref } from 'vue'

// Lógica para controlar a abertura e fechamento do menu em dispositivos móveis
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-[#2E3A4B] via-[#212f42] to-[#354e76] text-white shadow-md backdrop-blur-sm">
    <div class="mx-auto flex h-20  items-center justify-between px-2 sm:px-4 lg:px-6">

        <div class="flex items-center gap-4">
        <a href="/" class="flex items-center gap-4">
            <img class="ms-2 size-14" src="/icon.png">   

          <div class="flex items-center gap-3">
             <!-- <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/><path d="M8 4h8"/><path d="M10 20h4"/></svg> -->
            <h1 class="hidden text-xl font-bold tracking-wider sm:block">
              Simulador de Pasteurizador
            </h1>
          </div>
        </a>
      </div>

      <nav class="hidden items-center gap-2 lg:flex">
        <a href="/" class="group relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          Início
          <span class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="/sobre" class="group relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          Sobre
          <span class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="/tech" class="group relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          Tecnologias
          <span class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
        <a href="/faq" class="group relative px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white">
          FAQ
          <span class="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <div class="flex items-center gap-4">
        <button class="bg-[#212f42] group relative hidden overflow-hidden rounded-lg border border-white-400 shadow-sm px-5 py-2.5 text-sm font-bold text-white transition-transform duration-300 hover:scale-105 lg:block">
          <span class="absolute -inset-full top-0 block -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full group-hover:duration-1000"></span>
          Calcular
        </button>

        <button @click="toggleMenu" class="rounded-md p-2 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden">
          <span class="sr-only">Abrir menu</span>
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="border-t border-white/10 bg-gray-900/95 lg:hidden" @click.self="isMenuOpen = false">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a href="/" class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Início
        </a>
        <a href="/sobre" class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Sobre
        </a>
        <a href="/tech" class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Tecnologias
        </a>
        <a href="/faq" class="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          FAQ
        </a>
        <div class="px-8 py-4">
            <button class="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 font-bold text-white shadow-md transition-transform duration-300 hover:scale-105">
                <span class="absolute -inset-full top-0 block -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full group-hover:duration-1000"></span>
                Calcular
            </button>
        </div>
      </div>
    </div>
  </header>
</template>