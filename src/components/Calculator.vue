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
    <div class="xl:w-full lg:w-auto w-full mx-0 flex flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div class="flex items-center gap-4 bg-gray-100/50 ps-4 p-2  border-b border-gray-300 ">
            <p class="lg:text-xl sm:text-[15px] flex-1 break-words font-bold text-gray-800"> {{ props.cardTitle }} </p>
        </div>
        
        <div @keyup.enter="onCalcButtonClick" class="p-6 space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-2 xxl:grid-cols-3 gap-6">
                <slot name="card-form">

                </slot>
            </div>

            <button @click="onCalcButtonClick" type="button" class="w-full flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md hover:bg-blue-700 transition-all duration-300 active:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
                Calcular
            </button>

            <div class="mt-2 rounded-lg border border-dashed border-gray-400 bg-gray-50/50 p-6 text-center ">
                <p class="text-sm font-medium tracking-wider text-gray-600 ">RESULTADO</p>
                <p class="text-4xl font-bold text-gray-900  mt-2">{{ props.calcResult ? props.calcResult : ''}}</p>
                <p class="text-sm text-gray-500 mt-1">{{ props.calcResultMeasure }}</p>
            </div>
        </div>
    </div>
</template>