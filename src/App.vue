<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <div>
    <Header />
    <main class="min-h-[750px]">
      <router-view />
    </main>
    <Footer />
  </div>
</template>


