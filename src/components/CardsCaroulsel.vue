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
    'forwardCard',
    'reset'
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
const onResetCard = () => {
    // Emite um evento 'reset' que o componente pai pode ouvir
    emit('reset');
};
const cardsButtonTransition = ref('');

</script>

<template>
    <div class="relative flex justify-center items-center my-7">
        <div class="absolute top-2 right-4 z-10 flex items-center gap-x-2">
            <button
                type="button"
                aria-label="Anterior"
                @click="onBackCard()"
                :disabled="props.disabledButton === 'l'"
                class="
                    border border-gray-400 shadow-sm flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    bg-white/60 text-slate-700 backdrop-blur-sm
                "
                :class="{
                    'hover:bg-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2': props.disabledButton !== 'l',
                    'opacity-50 cursor-not-allowed': props.disabledButton === 'l'
                }"
            >
                <LeftArrow class="w-5 h-5" />
            </button>

            <button
                type="button"
                aria-label="Próximo"
                @click="onForwardCard()"
                :disabled="props.disabledButton === 'r'"
                class="
                    border border-gray-400 shadow-sm flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    bg-white/60 text-slate-700 backdrop-blur-sm
                "
                :class="{
                    'hover:bg-blue-600 hover:text-white hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2': props.disabledButton !== 'r',
                    'opacity-50 cursor-not-allowed': props.disabledButton === 'r'
                }"
            >
                <RightArrow class="w-5 h-5" />
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