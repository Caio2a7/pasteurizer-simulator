<script setup lang="ts">
const props = defineProps({
    title:String,
    description:String
})

</script>

<template>
    <section class="flex flex-col justify-start items-center mx-40">
        <div class="section-header">
            <h2 class="text-[var(--text-section-title-color)] font-bold mb-5">{{ props.title }}</h2>
            <p class="text-[var(--text-description-color)]">{{ props.description }}</p>
        </div>
        <div class="section-body">
    
        </div>
        <div class="section-footer">
    
        </div>
    </section>
</template>