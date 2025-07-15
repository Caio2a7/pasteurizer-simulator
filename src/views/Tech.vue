<script setup>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue';

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,    
  });
});

</script>

<template>
  <div class="tech-page">
    <div class="container">
      <header class="main-header" data-aos="fade-up" duration="300">
        <h1>Tecnologias Utilizadas</h1>
        <p>
          Conheça os frameworks e plataformas utilizadas para o desenvolvimento, produção e entrega desta aplicação.
        </p>
      </header>

      <div class="tech-grid">
        
        <div class="tech-card" style="--brand-color: #42b883;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/vue.svg" alt="Vue.js Icon" class="tech-icon">
            <h3 class="tech-title">Vue.js</h3>
            <p class="tech-description">O coração da interface. Framework progressivo que permite criar componentes reativos e uma experiência de usuário mais fluida e dinâmica.</p>
          </div>
        </div>

        <div class="tech-card" style="--brand-color: #646cff;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/vite.svg" alt="Vite Icon" class="tech-icon">
            <h3 class="tech-title">Vite</h3>
            <p class="tech-description">Ferramenta de build e bundle. Otimizado para desenvolvimento local com Hot Module Replacement (HMR) e otimizado para building da aplicação para produção.</p>
          </div>
        </div>

        <div class="tech-card" style="--brand-color: #38b2ac;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/tailwind.svg" alt="Tailwind CSS Icon" class="tech-icon">
            <h3 class="tech-title">Tailwind CSS</h3>
            <p class="tech-description">Framework CSS para estilização de interfaces complexas e responsivas sem sair do HTML.</p>
          </div>
        </div>

        <div class="tech-card" style="--brand-color: #000000;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/vercel.svg" alt="Vercel Icon" class="tech-icon">
            <h3 class="tech-title">Vercel</h3>
            <p class="tech-description">Plataforma de deploy da aplicação. Permite a entrega contínua (CI/CD) com performance otimizada, garante entrega rápida e eficiente.</p>
          </div>
        </div>

        <div class="tech-card" style="--brand-color: #ffca28;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/firestore.svg" alt="Firestore Icon" class="tech-icon">
            <h3 class="tech-title">Firestore</h3>
            <p class="tech-description">Banco de dados NoSQL BaaS. Garante a persistência e sincronização de dados em tempo real de forma flexível e altamente escalável.</p>
          </div>
        </div>
        
        
        
        <div class="tech-card" style="--brand-color: #007acc;" data-aos="fade-up" duration="300">
            <div class="card-content">
                <img src="@/assets/icons/typescript.svg" alt="TypeScript Icon" class="tech-icon">
                <h3 class="tech-title">TypeScript</h3>
                <p class="tech-description">A base para um código robusto. Adiciona tipagem estática ao JavaScript, prevenindo erros e melhorando a manutenibilidade do projeto.</p>
            </div>
        </div>
        
        <div class="tech-card" style="--brand-color: #f7d224;" data-aos="fade-up" duration="300">
          <div class="card-content">
            <img src="@/assets/icons/pinia.svg" alt="Pinia Icon" class="tech-icon">
            <h3 class="tech-title">Pinia</h3>
            <p class="tech-description">Gerenciador de estado oficial para Vue. Leve, intuitivo e com total suporte a TypeScript, organiza os dados da nossa aplicação de forma centralizada com stores.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<style scoped>
.tech-page {
  color: #212529;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  line-height: 1.6;
}

.container {
  max-width: 1124px;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.main-header {
  text-align: center;
  margin-bottom: 4rem;
}

.main-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.main-header p {
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #6c757d;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

/* Alterado de Grid para Flexbox para melhor centralização */
.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.tech-card {
  background-color: #ffffff;
  border-radius: 0.75rem; /* 12px */
  border: 1px solid #e5e7eb;
  /* Borda colorida no topo para um visual clean */
  border-top: 4px solid var(--brand-color, #e5e7eb);
  /* Sombra sutil e moderna */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  /* Flexbox para o card se comportar como uma coluna */
  display: flex;
  width: 320px;
}

.tech-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza horizontalmente */
  text-align: center; /* Centraliza o título */
}

.tech-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
}

.tech-title {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #343a40;
  margin-bottom: 0.75rem;
}

.tech-description {
  font-size: 0.95rem;
  color: #6c757d;
  /* Alinha o texto à esquerda para melhor leitura */
  text-align: left;
  /* Garante que o texto não estique demais */
  max-width: 100%;
  flex-grow: 1; /* Faz com que o parágrafo ocupe o espaço restante */
}
</style>