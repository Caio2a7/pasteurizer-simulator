<script setup lang="ts">
const props = defineProps({
    title:String,
    description:String
})

</script>

<template>
    <section class="xl:mx-10 lg:mx-35 sm:mx-10">
        <div class="section-header">
            <h2 class="text-[var(--text-section-title-color)] font-bold mb-5">{{ props.title }}</h2>
            <p class="text-[var(--text-description-color)]">{{ props.description }}</p>
        </div>
        <div class="flex justify-start items-start">
            <slot>
                
            </slot>
        </div>
    </section>
</template>