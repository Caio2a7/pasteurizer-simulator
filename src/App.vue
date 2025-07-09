<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <div>
    <Header />
    <main class="mx-4 my-8 min-h-[750px]">
      <router-view />
    </main>
    <Footer />
  </div>
</template>


