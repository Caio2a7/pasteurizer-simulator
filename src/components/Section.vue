<script setup lang="ts">
const props = defineProps({
    title:String,
    description:String
})

</script>

<template>
  <section class="sm:mx-10 lg:mx-20 xl:mx-28 2xl:mx-10">
    <div class="section-header">
      <h2 class="text-[var(--text-section-title-color)] font-bold mb-5 text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
        {{ props.title }}
      </h2>
      <p class="text-[var(--text-description-color)] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed xl:leading-loose">
        {{ props.description }}
      </p>
    </div>
    <div class="flex justify-start items-start">
      <slot></slot>
    </div>
  </section>
</template>
