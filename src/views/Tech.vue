<template>
  <div class="tech-page">
    <div class="container">
      <header class="main-header">
        <h1>Tecnologias que Impulsionam o Projeto</h1>
        <p>
          Conheça as ferramentas e bibliotecas que tornam este projeto possível, desde o frontend até o backend e a implantação.
        </p>
      </header>

      <section class="tech-grid">
        <div class="tech-card" style="--shadow-color: #41B883;">
          <img src="@/assets/icons/vue.svg" alt="Vue.js">
          <h3>Vue.js</h3>
          <p>Framework JavaScript progressivo para a construção de interfaces de usuário interativas e reativas.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #646CFF;">
          <img src="@/assets/icons/vite.svg" alt="Vite">
          <h3>Vite</h3>
          <p>Ferramenta de construção de nova geração que oferece uma experiência de desenvolvimento extremamente rápida para aplicações web modernas.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #38B2AC;">
          <img src="@/assets/icons/tailwindcss.svg" alt="Tailwind CSS">
          <h3>Tailwind CSS</h3>
          <p>Framework CSS utilitário que permite estilizar rapidamente interfaces sem sair do seu HTML.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #FFCA28;">
          <img src="@/assets/icons/firestore.svg" alt="Firebase Firestore">
          <h3>Firebase Firestore</h3>
          <p>Banco de dados NoSQL flexível e escalável para armazenar e sincronizar dados para desenvolvimento web e mobile.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #F06095;">
          <img src="@/assets/icons/pinia.svg" alt="Pinia">
          <h3>Pinia</h3>
          <p>A loja de estado intuitiva, de tipo seguro e flexível para Vue.js.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #007ACC;">
          <img src="@/assets/icons/typescript.svg" alt="TypeScript">
          <h3>TypeScript</h3>
          <p>Superset tipado de JavaScript que melhora a escalabilidade e a manutenibilidade do código.</p>
        </div>

        <div class="tech-card" style="--shadow-color: #000000;">
          <img src="@/assets/icons/vercel.svg" alt="Vercel">
          <h3>Vercel</h3>
          <p>Plataforma para implantação e escalabilidade de aplicações web com foco em velocidade e facilidade de uso.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Nenhuma lógica de script adicional é necessária para esta página estática.
</script>

<style scoped>
.tech-page {
  background-color: #f8f9fa;
  color: #212529;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  line-height: 1.6;
  padding-bottom: 3rem;
}

.container {
  max-width: 1024px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.main-header {
  text-align: center;
  margin-bottom: 3rem;
}

.main-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0d6efd;
  margin: 0;
}

.main-header p {
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.tech-card {
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  position: relative;
}

.tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  box-shadow: 0 0 10px 5px var(--shadow-color);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  z-index: -1;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
}

.tech-card:hover::before {
  opacity: 1;
}

.tech-card img {
  max-width: 80px;
  height: auto;
  margin-bottom: 1rem;
}

.tech-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 0.5rem;
}

.tech-card p {
  font-size: 1rem;
  color: #6c757d;
}
</style>