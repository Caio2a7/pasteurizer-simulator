<script lang="ts">


</script>
<template>
    <div class="flex flex-col  bg-white rounded-2xl border border-gray-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden shadow-window-box ">
        <div class="pc-card-header flex justify-between border-b border-gray-300 shadow-window-box-inset ">
            <slot name="card-header"></slot>
        </div>
        <div class="pc-card-body grid grid-cols-1 sm:grid-cols-2 gap-6">
            <slot name="card-body"></slot>
        </div>  
    </div>
</template>