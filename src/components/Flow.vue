<template>
  <div style="height: 430px; width: 320px; border: 1px solid #ccc; margin: 10px;">
    <VueFlow
      v-model="elements"
      :nodes-draggable="false"
      :pan-on-drag="false"
      :zoom-on-scroll="false"
      :pan-on-scroll="false"
      :zoom-on-double-click="false"
      :fit-view-on-init="true"
      :connection-line-style="connectionStyle"
      :default-edge-options="defaultEdgeOptions"
      @node-click="onNodeClick"
    >
      <!-- Background removido para tirar as bolinhas -->
    </VueFlow>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';

import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';

// Estilos vivos e bold para os nós
const defaultStyle = {
  backgroundColor: '#6B21A8',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '14px',
  padding: '2px 6px', // Bem menos padding horizontal
  borderRadius: '4px',
  border: '1px solid #A855F7',
  textAlign: 'center',
  display: 'inline-block',
  width: 'fit-content', // <- ESSENCIAL para não alargar o node
  minWidth: '0px',
};

const clickedStyle = {
  backgroundColor: '#1F2937',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '14px',
  padding: '2px 6px',
  borderRadius: '4px',
  border: '1px solid #FACC15',
  textAlign: 'center',
  display: 'inline-block',
  width: 'fit-content',
  minWidth: '0px',
};


// Estiliza as conexões
const defaultEdgeOptions = {
  style: {
    stroke: '#7C3AED', // Roxo vibrante
    strokeWidth: 1.5,
  },
  markerEnd: undefined, // Remove a bolinha da ponta
  type: 'straight',
};

// Estilo direto da linha
const connectionStyle = {
  stroke: '#9333EA',
  strokeWidth: 1.5,
};

const initialNodes = [
  { id: '1', label: 'Node 1', position: { x: 100, y: 0 } },
  { id: '2', label: 'Node 2', position: { x: 100, y: 100 } },
  { id: '3', label: 'Node 3', position: { x: 100, y: 200 } },
  { id: '4', label: 'Node 4', position: { x: 100, y: 300 } },
  { id: '5', label: 'Node 5', position: { x: 100, y: 400 } },
  { id: '6', label: 'Node 6', position: { x: 100, y: 500 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-6', source: '5', target: '6' },
];

// Aplica estilo aos nós
const styledNodes = initialNodes.map(node => ({
  ...node,
  style: { ...defaultStyle },
}));

const elements = ref([...styledNodes, ...initialEdges]);

function onNodeClick(event) {
  elements.value = elements.value.map(el => {
    if (el.position) {
      el.style = el.id === event.node.id ? { ...clickedStyle } : { ...defaultStyle };
    }
    return el;
  });
}
</script>
