<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

</script>

<template>
  <div>
    <Header />
    <div class="">
      <router-view />
    </div>
    <Footer />
  </div>
</template>


