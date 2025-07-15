<script setup>
import { onMounted } from 'vue';
import katex from 'katex';
import 'katex/dist/katex.min.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,    
  });
  try {
    const blockElements = document.querySelectorAll('.formula-block');
    blockElements.forEach(el => {
      katex.render(el.textContent || '', el, {
        throwOnError: false,
        displayMode: true,
      });
    });

    const inlineElements = document.querySelectorAll('.formula-inline');
    inlineElements.forEach(el => {
      katex.render(el.textContent || '', el, {
        throwOnError: false,
        displayMode: false,
      });
    });
  } catch (error) {
    console.error('Erro ao renderizar KaTeX:', error);
  }
});


</script>

<template>
  <div class="about-page">
    <div class="container px-0">
      
      <header class="main-header" data-aos="fade-up" duration="300">
        <h1>O Coração do Pasteurizador: Uma Análise Detalhada</h1>
        <p>
          Entenda a ciência e a matemática por trás da simulação de um pasteurizador de placas, desde a termodinâmica até a dinâmica dos fluidos.
        </p>
      </header>

      <section class="info-card" data-aos="fade-up" duration="300">
        <h2 class="section-title">O que é um Pasteurizador?</h2>
        <p>
          O pasteurizador é um equipamento crucial na indústria alimentícia, projetado para garantir a segurança dos alimentos e prolongar sua vida útil. O processo, nomeado em homenagem a Louis Pasteur, envolve o aquecimento controlado do produto (como o leite) a uma temperatura específica por um determinado tempo, seguido por um resfriamento rápido. Esta ação elimina ou inativa microrganismos patogênicos e de deterioração.
        </p>
        <p class="mt-2">
          Este simulador modela o desempenho de um pasteurizador calculando as seguintes métricas fundamentais, cujas fórmulas e variáveis detalharemos a seguir.
        </p>
      </section>

      <div class="formulas-container">

        <div class="formula-card" data-aos="fade-up" duration="300">
          <h3 class="formula-title">1. Energia Total Gasta pelo Pasteurizador (kJ)</h3>
          <p class="description">
            Esta é a quantidade total de energia térmica necessária para elevar a temperatura do leite do seu estado inicial até a temperatura de pasteurização, considerando as perdas de calor para o ambiente através da eficiência do equipamento.
          </p>
          <div class="formula-block">
            E_{\text{total}} = \frac{m_{\text{leite}} \cdot c_{\text{leite}} \cdot (T_{\text{pasteurização}} - T_{\text{entrada}})}{\eta}
          </div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
            <ul class="variable-list">
              <li>
                <strong>Massa do Leite 
                  (<span class="formula-inline">m_{\text{leite}}</span>):
                </strong>
                 Primeiro, convertemos o volume de litros para metros cúbicos 
                
                  <span class="formula-inline">V_{\text{m³}} = V_{\text{L}} / {\text{1000}} </span>

                 e depois calculamos a massa. 
                 <br><span class="formula-inline">
                  m_{\text{leite}} (\text{kg}) = V_{\text{leite}} (\text{m³}) \cdot \rho_{\text{leite}} (\text{kg/m³})
                </span>
              </li>
              <li><strong>Calor Específico do Leite (<span class="formula-inline">
                  c_{\text{leite}}</span>):
                </strong> 
                Uma constante que representa a energia necessária para aquecer 1 kg de leite em 1°C. (Valor típico: ~3.93 kJ/kg°C).
              </li>
              <li><strong>Variação de Temperatura (<span class="formula-inline">\Delta T</span>):</strong> A diferença entre a temperatura final (pasteurização) e a inicial. <br><span class="formula-inline">\Delta T = T_{\text{pasteurização}} - T_{\text{entrada}}</span></li>
              <li><strong>Eficiência (<span class="formula-inline">\eta</span>):</strong> A eficiência do pasteurizador, expressa em forma decimal (ex: 90% = 0.90). Representa a fração da energia que é efetivamente usada para aquecer o leite.</li>
            </ul>
          </div>
        </div>

        <div class="formula-card" data-aos="fade-up" duration="300">
          <h3 class="formula-title">2. Vazão do Leite Pasteurizado (L/min)</h3>
          <p class="description">Representa o volume de leite que o sistema consegue processar por minuto. É um indicador direto da capacidade de produção do equipamento.</p>
          <div class="formula-block">\text{Vazão}_{\text{leite}} = \frac{V_{\text{leite}} (\text{L})}{t_{\text{processo}} (\text{min})}</div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
            <ul class="variable-list">
              <li><strong>Volume do Leite (<span class="formula-inline">V_{\text{leite}}</span>):</strong> O volume total de leite a ser processado, em litros.</li>
              <li><strong>Duração do Processo (<span class="formula-inline">t_{\text{processo}}</span>):</strong> O tempo total do ciclo de pasteurização, convertido de horas para minutos. <br><span class="formula-inline">t_{\text{processo}} (\text{min}) = \text{Duração} (\text{h}) \cdot 60</span></li>
            </ul>
          </div>
        </div>
        
        <div class="formula-card" data-aos="fade-up" duration="300">
            <h3 class="formula-title">3. Vazão de Entrada de Vapor (kg/h)</h3>
            <p class="description">Para aquecer o leite, utiliza-se vapor d'água, que libera uma grande quantidade de energia (calor latente) ao condensar. Esta fórmula calcula a quantidade de vapor necessária por hora.</p>
            <div class="formula-block">\dot{m}_{\text{vapor}} = \frac{E_{\text{total}}}{L_v \cdot t_{\text{processo}}(\text{h})}</div>
            <div class="variables-section">
                <h4 class="variables-title">Variáveis e Passos:</h4>
                <ul class="variable-list">
                    <li><strong>Energia Total (<span class="formula-inline">E_{\text{total}}</span>):</strong> A energia total calculada no primeiro passo (em kJ).</li>
                    <li><strong>Calor Latente de Vaporização (<span class="formula-inline">L_v</span>):</strong> A energia liberada por kg de vapor ao se condensar. (Valor típico para vapor a 100°C: ~2260 kJ/kg).</li>
                    <li><strong>Duração do Processo (<span class="formula-inline">t_{\text{processo}}</span>):</strong> O tempo total em horas.</li>
                </ul>
            </div>
        </div>

        <div class="formula-card" data-aos="fade-up" duration="300">
          <h3 class="formula-title">4. Vazão de Entrada de Água Fria (kg/h)</h3>
          <p class="description">Após o aquecimento, o leite precisa ser resfriado rapidamente. A água fria é usada para absorver o calor do leite. Esta fórmula determina a quantidade de água fria necessária por hora.</p>
          <div class="formula-block">\dot{m}_{\text{água}} = \frac{m_{\text{leite}} \cdot c_{\text{leite}} \cdot (T_{\text{pasteurização}} - T_{\text{saída}})}{c_{\text{água}} \cdot (T_{\text{saída, água}} - T_{\text{entrada, água}}) \cdot t_{\text{processo}}(\text{h})}</div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
             <ul class="variable-list">
              <li><strong>Energia a ser Removida (<span class="formula-inline">Q_{\text{removida}}</span>):</strong> Calor que o leite cede no resfriamento. <span class="formula-inline">Q_{\text{removida}} = m_{\text{leite}} \cdot c_{\text{leite}} \cdot \Delta T_{\text{leite}}</span>.</li>
              <li><strong>Energia Absorvida pela Água (<span class="formula-inline">Q_{\text{absorvida}}</span>):</strong> Calor que a água fria absorve. <span class="formula-inline">Q_{\text{absorvida}} = m_{\text{água}} \cdot c_{\text{água}} \cdot \Delta T_{\text{água}}</span>.</li>
              <li>Assumindo <span class="formula-inline">Q_{\text{removida}} = Q_{\text{absorvida}}</span>, isolamos a massa de água (<span class="formula-inline">m_{\text{água}}</span>) e dividimos pelo tempo para encontrar a vazão.</li>
              <li><strong><span class="formula-inline">c_{\text{água}}</span>:</strong> Calor específico da água (~4.186 kJ/kg°C).</li>
            </ul>
          </div>
        </div>

        <div class="formula-card" data-aos="fade-up" duration="300"> 
          <h3 class="formula-title">5. Área do Trocador de Calor (m²)</h3>
          <p class="description">A área de troca térmica é uma medida da superfície através da qual o calor passa do fluido quente para o fluido frio. É um parâmetro de projeto fundamental do pasteurizador.</p>
          <div class="formula-block">A = \frac{P}{U \cdot \Delta T_{LM}}</div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
            <ul class="variable-list">
              <li><strong>Potência de Troca Térmica (<span class="formula-inline">P</span>):</strong> É a energia transferida por unidade de tempo, em Watts. <br><span class="formula-inline">P (\text{W}) = \frac{E_{\text{total}} (\text{kJ}) \cdot 1000}{t_{\text{processo}} (\text{h}) \cdot 3600}</span></li>
              <li><strong>Coeficiente Global de Troca Térmica (<span class="formula-inline">U</span>):</strong> Mede a eficiência da transferência de calor através das placas (W/m²°C).</li>
              <li><strong>Diferença de Temperatura Média Logarítmica (<span class="formula-inline">\Delta T_{LM}</span>):</strong> É a média da diferença de temperatura entre os fluidos. <br><span class="formula-inline">\Delta T_{LM} = \frac{\Delta T_2 - \Delta T_1}{\ln(\Delta T_2 / \Delta T_1)}</span>, onde: <br><span class="formula-inline">\Delta T_2 = T_{\text{quente, entrada}} - T_{\text{frio, saída (leite)}} </span> <br><span class="formula-inline">\Delta T_1 = T_{\text{quente, saída}} - T_{\text{frio, entrada (leite)}} </span></li>
            </ul>
          </div>
        </div>

        <div class="formula-card" data-aos="fade-up" duration="300">
          <h3 class="formula-title">6. Perdas Térmicas (kJ)</h3>
          <p class="description">Representa a quantidade de energia fornecida ao sistema mas que não foi absorvida pelo leite, sendo dissipada para o ambiente. É o inverso da eficiência.</p>
          <div class="formula-block">E_{\text{perdida}} = E_{\text{total}} \cdot (1 - \eta)</div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
            <ul class="variable-list">
              <li><strong>Energia Total (<span class="formula-inline">E_{\text{total}}</span>):</strong> A energia total calculada no primeiro passo.</li>
              <li><strong>Eficiência (<span class="formula-inline">\eta</span>):</strong> A eficiência do equipamento em formato decimal. A parcela <span class="formula-inline">(1 - \eta)</span> representa a fração da energia que é perdida.</li>
            </ul>
          </div>
        </div>

        <div class="formula-card" data-aos="fade-up" duration="300">
          <h3 class="formula-title">7. Custo Operacional (R$/h)</h3>
          <p class="description">Agrega os custos de vapor, água fria e eletricidade para calcular o custo operacional total da pasteurização.</p>
          <div class="formula-block">E_{\text{perdida}} = E_{\text{total}} \cdot (1 - \eta)</div>
          <div class="variables-section">
            <h4 class="variables-title">Variáveis e Passos:</h4>
            <ul class="variable-list">
              <li><strong>Energia Total (<span class="formula-inline">E_{\text{total}}</span>):</strong> A energia total calculada no primeiro passo.</li>
              <li><strong>Eficiência (<span class="formula-inline">\eta</span>):</strong> A eficiência do equipamento em formato decimal. A parcela <span class="formula-inline">(1 - \eta)</span> representa a fração da energia que é perdida.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
h3{
  font-size: 1.7rem !important;
}
p, span, li{
  font-size: 1.5rem !important;
}
@media (max-width: 768px) {
  h3{
    font-size: 1.3rem !important;
  }
  p, span, li{
    font-size: 1.1rem !important;
  }
}
/* Os estilos permanecem exatamente os mesmos. Nenhuma alteração aqui. */
.about-page {
  color: #212529;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif;
  line-height: 1.6;
}

.container {
  margin: 0 auto;
}

.main-header {
  text-align: center;
  margin-bottom: 3rem;
}

.main-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
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

.info-card {
  background-color: #ffffff;
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
  border: 1px solid #dee2e6;
}

.info-card .mt-2 {
  margin-top: 0.75rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1rem;
  border-left: 4px solid #0d6efd;
  padding-left: 1rem;
}

.formulas-container {
  margin-top: 2.5rem;
  display: grid;
  gap: 2rem;
}

.formula-card {
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.formula-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.formula-title {
  font-size: 1.25rem;
  font-weight: 600;
  background-color: #f8f9fa;
  color: #0d6efd;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #dee2e6;
}

.description {
  padding: 1rem 1.5rem;
  color: #495057;
}

.formula-block {
  background-color: #ffffff;
  padding: 1.5rem;
  font-size: 1.25rem;
  text-align: center;
  overflow-x: auto;
  color: #343a40;
}

.variables-section {
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e9ecef;
}

.variables-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #343a40;
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.variable-list {
  list-style-position: inside;
  padding-left: 0.5rem;
  color: #495057;
}

.variable-list li {
  margin-bottom: 1rem;
}

.variable-list li strong {
  font-weight: 600;
  color: #212529;
}

.variable-list li br {
  display: block;
  content: "";
  margin-top: 4px;
}

/* O estilo do .formula-inline foi removido para não interferir com a renderização do KaTeX */
.formula-inline {
  padding: 0 2px;
}
</style>