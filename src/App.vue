<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();

const showLayout = computed(() => {
  return !route.meta.hideLayout;
});

</script>

<template>
  <div>
    <template v-if="showLayout">
      <Header />
    </template>

    <main :class="{ 'mx-4 my-8 min-h-[750px]': showLayout }">
      <router-view />
    </main>
    
    <template v-if="showLayout">
      <Footer />
    </template>
  </div>
</template>