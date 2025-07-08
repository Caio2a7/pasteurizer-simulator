<script setup lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';
import { reactive, computed } from 'vue';
import Card from '@/components/Card.vue';
import Info from '@/components/icons/Info.vue';

const settings:PasteurizerSettings = reactive<PasteurizerSettings>({
    milkInputTemp: 7,
    milkHeatingTemp: 72,
    milkVolume: 500,
    milkFreezeTemp: 4.5,
    duration: 1,
    efficiency: 75
})

const heatLoss = computed(() => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizer.heatLoss();
})

console.log(heatLoss.value)
</script>

<template>
    <div class="flex flex-col items-center min-h-screen">
        <Card>
            <template v-slot:card-header>
                <div class="p-3">
                    <div>
                        <Info />
                    </div>
                    <div>
                        <h3 class="font-bold">Informações</h3>
                    </div>
                </div>
            </template>

            <template v-slot:card-body>
                <div class="p-3">
                    <label for="metro" class="block mb-2 text-sm font-medium">Metro</label>
                    <div class="relative">
                        <input type="number" id="metro" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 10.5">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 dark:text-gray-400">m</span>
                    </div>
                </div>
            </template>
        </Card>

    </div>
</template>