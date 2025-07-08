<script lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';
import { reactive, computed } from 'vue';

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
    <div>
        <router-link to="/sobre">
            Teste
        </router-link>
    </div>
</template>
