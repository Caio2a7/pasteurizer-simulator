<script setup lang="ts">
const props = defineProps({
    cardTitle: String,
    calcResult: Number,
    calcResultMeasure: String
})
const emit = defineEmits([
    'calc'
])

const onCalcButtonClick = () => {
    emit('calc');
}

</script>
<template>
    <div class="lg:w-auto md:w-full sm:w-full lg:ms-4 sm:ms-0 flex flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div class="flex items-center gap-4 bg-gray-100/50 ps-4 p-2  border-b border-gray-300">
            <div class="grid place-items-center rounded-lg bg-blue-100 text-blue-600 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="16" height="20" x="4" y="2" rx="2"></rect>
                    <line x1="8" x2="16" y1="6" y2="6"></line>
                    <line x1="16" x2="16" y1="14" y2="18"></line>
                    <line x1="16" x2="12" y1="10" y2="10"></line>
                    <line x1="12" x2="12" y1="10" y2="18"></line>
                    <line x1="8" x2="8" y1="10" y2="18"></line>
                </svg>
            </div>
            <p class="lg:text-xl sm:text-[15px] flex-1 break-words font-bold text-gray-800"> {{ props.cardTitle }} </p>
        </div>
        
        <div class="p-3 grid grid-cols-2">
            <slot name="card-body">

            </slot>
        </div>
    </div>
</template>