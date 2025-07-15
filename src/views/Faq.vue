<script setup>
import AOS from 'aos';
import 'aos/dist/aos.css';
import { onMounted } from 'vue';
onMounted(() => {
  AOS.init({
    duration: 800,
    once: true
  })
})


</script>
<template>
  <div class="faq-page">
    <div class="container w-full">
      <header class="main-header" data-aos="fade-up" duration="300">
        <h1>Perguntas Frequentes (FAQ)</h1>
        <p>
          Tem alguma dúvida sobre o funcionamento do simulador ou do projeto em geral? Se não encontrar sua resposta aqui, entre em contato.
        </p>
      </header>

      <div class="form-container w-full">
        <div class="form-card flex-1 w-full" data-aos="fade-up" duration="300">
          <div class="card-header">
            <h3 class="form-title">Não encontrou o que procurava?</h3>
            <p class="form-subtitle">Envie sua pergunta diretamente para nossa equipe. Responderemos o mais breve possível.</p>
          </div>
          
          <form 
            class="contact-form" 
            action="mailto:caiodanielfonseca@gmail.com" 
            method="POST" 
            enctype="text/plain"
          >
            <div class="form-group">
              <label for="nome" class="form-label">Seu Nome</label>
              <input type="text" id="nome" name="Nome" class="form-input" required>
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Seu Email</label>
              <input type="email" id="email" name="EmailDeContato" class="form-input" required>
            </div>

            <div class="form-group">
              <label for="assunto" class="form-label">Assunto</label>
              <input type="text" id="assunto" name="Assunto" class="form-input" required>
            </div>

            <div class="form-group">
              <label for="mensagem" class="form-label">Sua Mensagem</label>
              <textarea id="mensagem" name="Mensagem" rows="5" class="form-textarea" required></textarea>
            </div>

            <button type="submit" class="submit-button">Enviar Email</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.faq-page {
  color: #212529;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  line-height: 1.6;
  min-height: 100vh;
}

.container {
  max-width: 1124px;
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

.form-container {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.form-card {
  background-color: #ffffff;
  border-radius: 0.75rem; 
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.card-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
}

.form-subtitle {
  margin-top: 0.5rem;
  color: #6c757d;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  background-color: #0d6efd;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #0b5ed7;
}
</style>