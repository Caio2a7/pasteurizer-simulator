<scrip lang="ts">

</scrip>
<template>
    <div class="w-full max-w-5xl mx-auto flex flex-col overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div class="flex items-center gap-4 bg-gray-100/50 p-4  border-b border-gray-300 ">
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
            <p class="text-xl font-bold text-gray-800 ">Calculadora de Grandezas</p>
        </div>
        
        <div class="p-6 space-y-6">
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div>
                    <label for="metro" class="block mb-2 text-sm font-medium text-gray-700 ">Metro</label>
                    <div class="relative">
                        <input type="number" id="metro" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 10.5">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">m</span>
                    </div>
                </div>

                <div>
                    <label for="volume" class="block mb-2 text-sm font-medium text-gray-700 ">Volume</label>
                    <div class="relative">
                        <input type="number" id="volume" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 2.0">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">m³</span>
                    </div>
                </div>

                <div>
                    <label for="temperatura" class="block mb-2 text-sm font-medium text-gray-700 ">Temperatura</label>
                    <div class="relative">
                        <input type="number" id="temperatura" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 25">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">°C</span>
                    </div>
                </div>

                <div>
                    <label for="pressao" class="block mb-2 text-sm font-medium text-gray-700 ">Pressão</label>
                    <div class="relative">
                        <input type="number" id="pressao" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pr-12 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" placeholder="Ex: 101325">
                        <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-500 ">Pa</span>
                    </div>
                </div>
            </div>

            <button type="button" class="w-full flex items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ">
                Calcular
            </button>

            <div class="mt-2 rounded-lg border border-dashed border-gray-400 bg-gray-50/50 p-6 text-center ">
                <p class="text-sm font-medium tracking-wider text-gray-600 ">RESULTADO</p>
                <p class="text-4xl font-bold text-gray-900  mt-2">1.234,56</p>
                <p class="text-sm text-gray-500 mt-1">Unidade Final</p>
            </div>
        </div>
    </div>
</template>