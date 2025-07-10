<script setup lang="ts">
import { PasteurizerSettings, Pasteurizer } from '@/services/Pasteurizer';
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Calculator from '@/components/Calculator.vue';
import Card from '@/components/Card.vue';
import CardsCaroulsel from '@/components/CardsCaroulsel.vue';
import EthereumCard from '@/components/EthereumCard.vue';
import Info from '@/components/icons/Info.vue';
import Flow from '@/components/Flow.vue';
import Section from '@/components/Section.vue';
import CalcPath from '@/components/CalcPath.vue';


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

const allResultsReady = ref(false);
const resultsSection = ref(null);

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,    
  });
});

watch(pasteurizerResults, (newValues) => {
  const allFilled = Object.values(newValues).every(item => item.result !== null);

  if (allFilled) {
    allResultsReady.value = true;
    
    nextTick(() => {
      resultsSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}, {
  deep: true 
});
// Remova o objeto 'labels' antigo e substitua por este
const cardDetails = {
  energyConsumedToHeatMilk: {
    label: 'Energia Consumida',
    description: 'Representa a quantidade total de energia térmica necessária para elevar a temperatura do leite até o nível de pasteurização.',
    icon: `<p>⚡</p>`,
    calc: pasteurizerResults.energyConsumedToHeatMilk
  },
  heatLoss: {
    label: 'Perda de Calor',
    description: 'Energia dissipada para o ambiente durante o processo. Um valor menor indica maior eficiência energética do sistema.',
    icon: `<p>🔥</p>`,
    calc: pasteurizerResults.heatLoss
  },
  steamInputFlowRate: {
      label: 'Vazão de Vapor',
      description: 'A quantidade de vapor de alta temperatura necessária por hora para fornecer a energia ao trocador de calor.',
      icon: `<p>💨</p>`,
    calc: pasteurizerResults.steamInputFlowRate
  },
  freezingWaterInputFlowRate: {
    label: 'Vazão de Água Gelada',
    description: 'O volume de água gelada utilizado para resfriar rapidamente o leite após a pasteurização, garantindo sua conservação.',
    icon: `<p>❄️</p>`,
    calc: pasteurizerResults.freezingWaterInputFlowRate
    },
    requiredAreaToHeatExchanger: {
        label: 'Área de Troca',
        description: 'A área de superfície necessária no trocador de calor para que a transferência de energia térmica ocorra de forma eficiente.',
        icon: `<p>↔️</p>`,
        calc: pasteurizerResults.requiredAreaToHeatExchanger
    },
    milkFlowRate: {
    label: 'Vazão de Leite',
    description: 'Indica o volume de leite que o sistema consegue processar por minuto. Essencial para o dimensionamento da produção.',
    icon: `<p>🥛</p>`,
    calc: pasteurizerResults.milkFlowRate
    },
};

const handleResetValues = () => {
    for (const key in pasteurizerResults) {
        pasteurizerResults[key].result = null;
    }
    for (const key in settings){
        settings[key] = null;
    }
}

</script>

<template>
    <div class="flex flex-col items-center min-h-screen">
        <Section data-aos="fade-up" duration="300" title="O que é um Pasteurizador ?" description="O pasteurizador é um equipamento que aquece alimentos a uma temperatura controlada e depois os resfria para eliminar microrganismos e estender a vida útil do produto com segurança. Este sistema simulará seu desempenho calculando: Energia total gasta (kJ), Vazão do leite (L/min), Vazão de vapor e de água fria (kg/h), Área do trocador de calor (m²) e as Perdas térmicas (kJ).">

            <div class="mt-8 flex items-start justify-start gap-x-6">
                <a href="/sobre" class=" inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Saber mais sobre o projeto <span aria-hidden="true">→</span>
                </a>

                <!-- <div class="h-4 w-px bg-gray-300"></div>

                <a href="/sobre" class="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200">
                Referências
                </a> -->
            </div>
        </Section>

        <div class="flex flex-auto flex-col lg:flex-row lg:items-start md:flex-col sm:flex-row justify-center items-center md:items-center mt-5">
            <CardsCaroulsel class="mx-4" data-aos="fade-up" duration="200" @backCard="handleBackCard()" @forwardCard="handleForwardCard()" @reset="handleResetValues()" :transitionName="transitionName" :disabledButton="disabledButton">
                <div class="flex justify-center" :key="actualCardPosition">
                <Calculator v-if="actualCardPosition === 0" @calc="EnergyConsumedToHeatMilk()" :calcResult="pasteurizerResults.energyConsumedToHeatMilk.result" :calcResultMeasure="pasteurizerResults.energyConsumedToHeatMilk.measure" cardTitle="⚡ Energia Total Gasta pelo Pasteurizador (kJ)"> 
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
                    </Calculator> 
            
                    <Calculator v-if="actualCardPosition === 1" @calc="heatLoss()" :calcResult="pasteurizerResults.heatLoss.result" :calcResultMeasure="pasteurizerResults.heatLoss.measure" cardTitle="🔥 Perda Térmica (kJ)"> 
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
                    </Calculator> 
            
                    <Calculator v-if="actualCardPosition === 2" @calc="steamInputFlowRate()" :calcResult="pasteurizerResults.steamInputFlowRate.result" :calcResultMeasure="pasteurizerResults.steamInputFlowRate.measure" cardTitle="💨 Vazão de Entrada de Vapor no Pasteurizador (kg/h)"> 
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
                    </Calculator> 
            
                    <Calculator v-if="actualCardPosition === 3" @calc="freezingWaterInputFlowRate()" :calcResult="pasteurizerResults.freezingWaterInputFlowRate.result" :calcResultMeasure="pasteurizerResults.freezingWaterInputFlowRate.measure" cardTitle="❄️ Vazão de Entrada de Água Fria (kg/h')"> 
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
                    </Calculator> 
            
                    <Calculator v-if="actualCardPosition === 4" @calc="requiredAreaToHeatExchanger()" :calcResult="pasteurizerResults.requiredAreaToHeatExchanger.result" :calcResultMeasure="pasteurizerResults.requiredAreaToHeatExchanger.measure" cardTitle="↔️ Área Necessária do Trocador de Calor (m²)"> 
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
            
                            <div class="xl:col-span-2 md:col-span-1">
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
                    </Calculator> 
            
                    <Calculator v-if="actualCardPosition === 5" @calc="milkFlowRate()" :calcResult="pasteurizerResults.milkFlowRate.result" :calcResultMeasure="pasteurizerResults.milkFlowRate.measure" cardTitle="🥛 Vazão de Saída do Leite Pasteurizado (L/min)"> 
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
                    </Calculator> 
                </div>
            </CardsCaroulsel>

            <Card class="xl:max-h-95 sm:max-h-100 mt-12 pb-3" data-aos="fade-up" duration="300" cardTitle="Resultados Calculados">
                <template v-slot:card-body> 
                    <div
                        v-for="(card, key) in cardDetails"
                        :key="key"
                        :class="[
                            'flex flex-col justify-start items-start rounded-lg border border-dashed border-gray-400 m-0 p-4 mt-2 mx-2 text-center',
                            card.calc.result === null ||  Number.isNaN(card.calc.result) ? 'bg-gray-50/50 ' : 'bg-blue-600 text-white'
                        ]">
                        <h4 class="['text-sm font-medium tracking-wider', 
                        card.calc.result === null ? 'text-gray-600' : 'text-white' ]">{{ card.label }}</h4>
                        <p class="mt-2 font-bold"> {{ card.calc.result ? card.calc.result : ''}} <span> {{ card.calc.measure }} </span></p>
                    </div>
                </template>
            </Card>
        </div>

        <div v-if="allResultsReady"  ref="resultsSection" class="mb-12">
        <h2 class="mt-12 text-[var(--text-section-title-color)] text-3xl font-bold text-center mb-8" data-aos="fade-up">
            Resultados Calculados
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mx-10">
  
            <div 
                v-for="(item, key) in pasteurizerResults" 
                :key="key"
                
                class="group bg-white rounded-xl shadow-lg border border-slate-200 p-5 flex flex-col h-full transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
                data-aos="fade-up"
            >
                <div class="mb-5">
                <div 
                    class="w-14 h-14 text-2xl rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600"
                    v-html="cardDetails[key].icon"
                >
                    </div>
                </div>
                
                <div class="flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-slate-800 mb-2">
                    {{ cardDetails[key].label }}
                </h3>
                
                <p class="text-slate-500 text-sm mb-6 flex-grow">
                    {{ cardDetails[key].description }}
                </p>

                <p class="text-4xl sm:text-4xl font-extrabold text-blue-600">
                    {{ item.result ? item.result : '' }}
                    <span class="text-2xl font-medium text-slate-400 align-baseline">{{ item.measure }}</span>
                </p>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>