<script setup lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';
import { ref, reactive, computed } from 'vue';
import Card from '@/components/Card.vue';
import CardsCaroulsel from '@/components/CardsCaroulsel.vue';
import EthereumCard from '@/components/EthereumCard.vue';
import Info from '@/components/icons/Info.vue';
import Flow from '@/components/Flow.vue';

import Section from '@/components/Section.vue'

interface ResultValue {
  result: number | null;
  measure: string;
}

interface PasteurizerResults {
  energyConsumedToHeatMilk: ResultValue;
  milkFlowRate: ResultValue;
  steamInputFlowRate: ResultValue;
  freezingWaterInputFlowRate: ResultValue;
  requiredAreaToHeatExchanger: ResultValue;
  heatLoss: ResultValue;
}

const settings:PasteurizerSettings = reactive<PasteurizerSettings>({
    milkInputTemp: 7,
    milkHeatingTemp: 72,
    milkVolume: 500,
    milkFreezeTemp: 4.5,
    duration: 1,
    efficiency: 75
})
const pasteurizerResults = reactive<PasteurizerResults>({
    energyConsumedToHeatMilk:       {result: null, measure: 'kJ'},
    milkFlowRate:                   {result: null, measure: 'L/min'},
    steamInputFlowRate:             {result: null, measure: 'kg/h'},
    freezingWaterInputFlowRate:     {result: null, measure: 'kg/h'},
    requiredAreaToHeatExchanger:    {result: null, measure: 'm²'},
    heatLoss:                       {result: null, measure: 'kJ'}
})

const EnergyConsumedToHeatMilk = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.energyConsumedToHeatMilk.result = pasteurizer.EnergyConsumedtoHeatMilk();
}

const milkFlowRate = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.milkFlowRate.result = pasteurizer.milkFlowRate();
}

const steamInputFlowRate = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.steamInputFlowRate.result = pasteurizer.steamInputFlowRate();
}

const freezingWaterInputFlowRate = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.freezingWaterInputFlowRate.result = pasteurizer.freezingWaterInputFlowRate();
}

const requiredAreaToHeatExchanger = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.requiredAreaToHeatExchanger.result = pasteurizer.requiredAreaToHeatExchanger();
}

const heatLoss = () => {
    const pasteurizer = new Pasteurizer(settings);
    return pasteurizerResults.heatLoss.result = pasteurizer.heatLoss();
}

const totalCards = 6;
const actualCardPosition = ref(0);
const transitionName = ref('slide-next');
const disabledButton = ref('l');
const handleBackCard = () => {
    if(actualCardPosition.value <= 0){
        disabledButton.value = 'l';
        return actualCardPosition.value = 0;
    }
    disabledButton.value = '';
    transitionName.value = 'slide-prev';
    return actualCardPosition.value--;
}
const handleForwardCard = () => {
    if(actualCardPosition.value >= 4){
        disabledButton.value = 'r';
        return actualCardPosition.value = 5;
    }
    disabledButton.value = '';
    transitionName.value = 'slide-next';
    return actualCardPosition.value++;
}
</script>

<template>
    <div class="flex flex-col items-center min-h-screen">
        <Section title="O que é um Pasteurizador ?" description="O pasteurizador é um equipamento que aquece alimentos a uma temperatura controlada e depois os resfria para eliminar microrganismos e estender a vida útil do produto com segurança. Este sistema simulará seu desempenho calculando: Energia total gasta (kJ), Vazão do leite (L/min), Vazão de vapor e de água fria (kg/h), Área do trocador de calor (m²) e as Perdas térmicas (kJ).">

        </Section>

        <Flow />

        <CardsCaroulsel @backCard="handleBackCard()" @forwardCard="handleForwardCard()" :transitionName="transitionName" :disabledButton="disabledButton">
        <div class="flex justify-center min-w-[1000px] " :key="actualCardPosition">
            <Card v-if="actualCardPosition === 0" @calc="EnergyConsumedToHeatMilk()" :calcResult="pasteurizerResults.energyConsumedToHeatMilk.result" :calcResultMeasure="pasteurizerResults.energyConsumedToHeatMilk.measure" cardTitle="Energia Total Gasta pelo Pasteurizador (kJ)"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="milkInputHeatingTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Entrada do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkInputTemp" type="number" id="milkInputHeatingTemp" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 7°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkHeatingTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Pasteurização/Aquecimento do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkHeatingTemp" type="number" id="milkHeatingTemp" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 72°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkInputVolume" class="block mb-2 text-sm font-medium text-gray-700 ">Volume de Entrada do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkVolume" type="number" id="milkInputVolume" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 500L">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">L</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="efficiency" class="block mb-2 text-sm font-medium text-gray-700 ">Eficiência de Pasteurização</label>
                            <div class="relative">
                                <input v-model="settings.efficiency" type="number" id="efficiency" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 75%">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">%</span>
                            </div>
                        </div>
                    </template>
                </Card> 
        
                <Card v-if="actualCardPosition === 1" @calc="heatLoss()" :calcResult="pasteurizerResults.heatLoss.result" :calcResultMeasure="pasteurizerResults.heatLoss.measure" cardTitle="Perda Térmica (kJ)"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="energytotalConsumedHeatLoss" class="block mb-2 text-sm font-medium text-gray-700 ">Energia Total Gasta pelo Pasteurizador</label>
                            <div class="relative">
                                <input readonly :value="pasteurizerResults.energyConsumedToHeatMilk.result" type="number" id="energytotalConsumedHeatLoss" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 176422 kJ">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">kJ</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="heatingLossEfficiency" class="block mb-2 text-sm font-medium text-gray-700 ">Eficiência</label>
                            <div class="relative">
                                <input v-model="settings.efficiency" type="number" id="heatingLossEfficiency" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 75%">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">%</span>
                            </div>
                        </div>
                    </template>
                </Card> 
        
                <Card v-if="actualCardPosition === 2" @calc="steamInputFlowRate()" :calcResult="pasteurizerResults.steamInputFlowRate.result" :calcResultMeasure="pasteurizerResults.steamInputFlowRate.measure" cardTitle="Vazão de Entrada de Vapor no Pasteurizador (kg/h')"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="energytotalConsumedSteamInput" class="block mb-2 text-sm font-medium text-gray-700 ">Energia Total Gasta pelo Pasteurizador</label>
                            <div class="relative">
                                <input readonly :value="pasteurizerResults.energyConsumedToHeatMilk.result" type="number" id="energytotalConsumedSteamInput" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 176422 kJ">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">kJ</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="steamInputDuration" class="block mb-2 text-sm font-medium text-gray-700 ">Duração do Processo</label>
                            <div class="relative">
                                <input v-model="settings.duration" type="number" id="steamInputDuration" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 1h">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">h</span>
                            </div>
                        </div>
                    </template>
                </Card> 
        
                <Card v-if="actualCardPosition === 3" @calc="freezingWaterInputFlowRate()" :calcResult="pasteurizerResults.freezingWaterInputFlowRate.result" :calcResultMeasure="pasteurizerResults.freezingWaterInputFlowRate.measure" cardTitle="Vazão de Entrada de Água Fria (kg/h')"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="milkHeatingTempFreezeFlow" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Pasteurização/Aquecimento do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkHeatingTemp" type="number" id="milkHeatingTempFreezeFlow" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 72°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkFreezingTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Resfriamento desejado do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkFreezeTemp" type="number" id="milkFreezingTemp" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 4.5°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div class="col-span-2">
                            <label for="milkVolumeFreezingFlow" class="block mb-2 text-sm font-medium text-gray-700 ">Volume de Entrada do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkVolume" type="number" id="milkVolumeFreezingFlow" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 500L">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">L</span>
                            </div>
                        </div>
                        
                        <div>
                            <label for="waterInTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Entrada da Água</label>
                            <div class="relative">
                                <input readonly value="2°C" type="number" id="waterInTemp" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 2°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="waterOutTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Saída da Água Fria</label>
                            <div class="relative">
                                <input readonly value="25°C" type="number" id="waterOutTemp" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 25°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
                    </template>
                </Card> 
        
                <Card v-if="actualCardPosition === 4" @calc="requiredAreaToHeatExchanger()" :calcResult="pasteurizerResults.requiredAreaToHeatExchanger.result" :calcResultMeasure="pasteurizerResults.requiredAreaToHeatExchanger.measure" cardTitle="Área Necessária do Trocador de Calor (m²)"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="energytotalConsumedRequiredArea" class="block mb-2 text-sm font-medium text-gray-700 ">Energia Total Gasta pelo Pasteurizador</label>
                            <div class="relative">
                                <input readonly :value="pasteurizerResults.energyConsumedToHeatMilk.result" type="number" id="energytotalConsumedRequiredArea" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 176422 kJ">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">kJ</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="requiredAreaDuration" class="block mb-2 text-sm font-medium text-gray-700 ">Duração do Processo</label>
                            <div class="relative">
                                <input v-model="settings.duration" type="number" id="requiredAreaDuration" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 1h">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">h</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkInputHeatingTempRequiredArea" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Entrada do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkInputTemp" type="number" id="milkInputHeatingTempRequiredArea" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 7°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkHeatingTempRequiredArea" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Pasteurização/Aquecimento do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkHeatingTemp" type="number" id="milkHeatingTempRequiredArea" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 72°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        
                        <div>
                            <label for="waterInTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Entrada da Água</label>
                            <div class="relative">
                                <input readonly :value="'2°C'" type="number" id="waterInTemp" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="85°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="waterOutTemp" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura de Saída da Água Fria</label>
                            <div class="relative">
                                <input readonly value="25°C" type="number" id="waterOutTemp" class="disabled-input w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="70°C">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                            </div>
                        </div>
                    </template>
                </Card> 
        
                <Card v-if="actualCardPosition === 5" @calc="milkFlowRate()" :calcResult="pasteurizerResults.milkFlowRate.result" :calcResultMeasure="pasteurizerResults.milkFlowRate.measure" cardTitle="Vazão de Saída do Leite Pasteurizado (L/min)"> 
                    <template v-slot:card-form>
                        <div>
                            <label for="milkFlowRateDuration" class="block mb-2 text-sm font-medium text-gray-700 ">Duração do Processo</label>
                            <div class="relative">
                                <input v-model="settings.duration" type="number" id="milkFlowRateDuration" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 1h">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">h</span>
                            </div>
                        </div>
        
                        <div>
                            <label for="milkVolumeFlowRate" class="block mb-2 text-sm font-medium text-gray-700 ">Volume de Entrada do Leite</label>
                            <div class="relative">
                                <input v-model="settings.milkVolume" type="number" id="milkVolumeFlowRate" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 500L">
                                <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">L</span>
                            </div>
                        </div>
                    </template>
                </Card> 
            </div>
        </CardsCaroulsel>


    </div>
</template>

            <!-- <template v-slot:card-header>
                <div class  ="flex items-center justify-start p-3">
                    <div class="me-2">
                        <Info class="w-6 h-6"/>
                    </div>
                    <div>
                        <h3 class="font-bold">Informações</h3>
                    </div>
                </div>
            </template>
            <template   v-slot:card-body>
                <div    class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="p-3 text-[var(--text-p-color)]">
                        <label for="metro" class="block mb-2 text-sm font-medium">Metro</label>
                        <div class="relative">
                            <input type="number" id="metro" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 10.5">
                            <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 dark:text-gray-400">m</span>
                        </div>
                    </div> 
                </div>
            </template  > -->