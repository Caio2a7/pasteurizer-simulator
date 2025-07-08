<script setup lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';
import { reactive, computed } from 'vue';
import Card from '@/components/Card.vue';
import EthereumCard from '@/components/EthereumCard.vue';

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
    <div class="flex items-center justify-center min-h-screen">
        <EthereumCard />
        <Card />
    </div>
</template>