<script setup lang="ts">
import { ref } from 'vue';
import LeftArrow from '@/components/icons/LeftArrow.vue';
import RightArrow from '@/components/icons/RightArrow.vue';

const props = defineProps({
    transitionName: String,
    disabledButton: String
})

const emit = defineEmits([
    'backCard',
    'forwardCard'
])

const onBackCard = () => {
    cardsButtonTransition.value = 'opacity-0';
    emit('backCard');
    setTimeout(() => {
        cardsButtonTransition.value = 'opacity-100';
    }, 400);
}
const onForwardCard = () => {
    cardsButtonTransition.value = 'opacity-25';
    emit('forwardCard');
    setTimeout(() => {
        cardsButtonTransition.value = 'opacity-100';
    }, 400); 
}
const cardsButtonTransition = ref('');

</script>

<template>
    <div class="relative flex justify-center items-center my-7">
        <div class="z-40 absolute right-5 top-3">
            <button @click="onBackCard()" :class="props.disabledButton === 'l' ? 'border-gray-400 shadow-lg mx-1 rounded-sm disabled bg-gray-400' : '' + `${cardsButtonTransition} button-transition border border-gray-400 shadow-lg mx-1 rounded-sm text-white font-bold bg-[#1E61D9]`">
                <LeftArrow class="w-6 h-6" />
            </button>
            <button @click="onForwardCard()" :class="props.disabledButton === 'r' ? 'border-gray-400 shadow-lg mx-1 rounded-sm disabled bg-gray-400' : '' + `${cardsButtonTransition} button-transition border border-gray-400 shadow-lg mx-1 rounded-sm text-white font-bold bg-[#1E61D9]`">
                <RightArrow class="w-6 h-6" />
            </button>
        </div>
        <Transition :name="props.transitionName" mode="out-in">
            <slot>
                
            </slot>
        </Transition>
    </div>
</template>

<style scoped>
.button-transition{
    transition: opacity 0.4s ease-in-out;
}
/* Estilos para a animação "Próximo" (entra da direita, sai para a esquerda) */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.4s ease-out;
}

.slide-next-enter-from {
  transform: translateX(50px);
  opacity: 0;
}
.slide-next-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}

/* Estilos para a animação "Anterior" (entra da esquerda, sai para a direita) */
.slide-prev-enter-from {
  transform: translateX(-50px);
  opacity: 0;
}
.slide-prev-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>