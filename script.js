// Seleção de elementos do DOM
const steps = document.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentStepSpan = document.getElementById('currentStep');
const totalStepsSpan = document.getElementById('totalSteps');

// Variável para controlar o passo atual
let currentStep = 0;

// Inicialização
function init() {
    // Define o total de passos
    totalStepsSpan.textContent = steps.length;
    
    // Mostra o primeiro passo
    showStep(0);
    
    // Adiciona event listeners aos botões
    prevBtn.addEventListener('click', () => navigateStep(-1));
    nextBtn.addEventListener('click', () => navigateStep(1));
    
    // Adiciona suporte para teclado (setas)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateStep(-1);
        } else if (e.key === 'ArrowRight') {
            navigateStep(1);
        }
    });
}

// Função para mostrar um passo específico
function showStep(stepIndex) {
    // Remove a classe 'active' de todos os passos
    steps.forEach((step, index) => {
        if (index === stepIndex) {
            // Adiciona a classe 'active' ao passo atual com animação
            step.classList.add('active');
            // Força um reflow para garantir que a animação funcione
            step.offsetHeight;
        } else {
            // Remove a classe 'active' dos outros passos
            step.classList.remove('active');
        }
    });
    
    // Atualiza o indicador de passo atual
    currentStepSpan.textContent = stepIndex + 1;
    
    // Atualiza o estado dos botões
    updateButtons();
    
    // Atualiza o passo atual
    currentStep = stepIndex;
    
    // Scroll suave para o topo do conteúdo (útil em mobile)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função para navegar entre os passos
function navigateStep(direction) {
    const newStep = currentStep + direction;
    
    // Verifica se o novo passo está dentro dos limites
    if (newStep >= 0 && newStep < steps.length) {
        showStep(newStep);
    }
}

// Função para atualizar o estado dos botões
function updateButtons() {
    // Desabilita o botão "Anterior" se estiver no primeiro passo
    prevBtn.disabled = currentStep === 0;
    
    // Desabilita o botão "Próximo" se estiver no último passo
    nextBtn.disabled = currentStep === steps.length - 1;
    
    // Adiciona texto especial no último passo
    if (currentStep === steps.length - 1) {
        nextBtn.textContent = '✓ Concluído';
    } else {
        nextBtn.textContent = 'Próximo →';
    }
    
    // Adiciona texto especial no primeiro passo
    if (currentStep === 0) {
        prevBtn.textContent = '← Início';
    } else {
        prevBtn.textContent = '← Anterior';
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);

