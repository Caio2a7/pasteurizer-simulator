<script lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';

const settings:PasteurizerSettings = {
    milkInputTemp: 7,
    milkHeatingTemp: 72,
    milkVolume: 500,
    duration: 1,
    efficiency: 75,
    
    steamTotalMassIn: 100
}

const pasteurizer = new Pasteurizer(settings);

const teste = pasteurizer.heatLoss();
console.log(teste)
</script>

<template>
    <div>
        <router-link to="/sobre">
            Teste
        </router-link>
    </div>
</template>
