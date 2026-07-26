// Funcionalidades JavaScript para CT Filhote

// 1. Animações ao scroll
document.addEventListener('DOMContentLoaded', function() {
    observarElementos();
    adicionarEfeitosHover();
});

// Função para observar elementos e animar ao entrar na viewport
function observarElementos() {
    const elementos = document.querySelectorAll('section, .pilar, .modalidade');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para adicionar efeitos hover nos cards
function adicionarEfeitosHover() {
    const cards = document.querySelectorAll('.pilar, .modalidade');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 12px 20px rgba(255,0,0,0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';
        });
    });
}

// 2. Função para abrir WhatsApp com mensagem personalizada
function abrirWhatsApp(mensagem = 'Olá! Quero agendar uma aula experimental') {
    const numero = '5511960187902';
    const mensagemCodificada = encodeURIComponent(mensagem);
    const url = `https://wa.me/${numero}?text=${mensagemCodificada}`;
    window.open(url, '_blank');
}

// 3. Função para contar visitantes (localStorage)
function inicializarContadorVisitas() {
    let visitas = localStorage.getItem('ctFilhoteVisitas') || 0;
    visitas = parseInt(visitas) + 1;
    localStorage.setItem('ctFilhoteVisitas', visitas);
    console.log('Total de visitas: ' + visitas);
}

inicializarContadorVisitas();

// 4. Função para validar se é o horário de funcionamento
function verificarHorarioAberto() {
    const agora = new Date();
    const diaSemana = agora.getDay();
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const horaAtual = hora + (minutos / 60);
    
    let aberto = false;
    
    // Segundas, Quartas e Sextas: 09h às 21h30
    if ([1, 3, 5].includes(diaSemana)) {
        aberto = (horaAtual >= 9 && horaAtual <= 21.5);
    }
    // Terças e Quintas: 09h às 20h30
    else if ([2, 4].includes(diaSemana)) {
        aberto = (horaAtual >= 9 && horaAtual <= 20.5);
    }
    // Sábado: 09h às 12h
    else if (diaSemana === 6) {
        aberto = (horaAtual >= 9 && horaAtual <= 12);
    }
    // Domingo: fechado
    else if (diaSemana === 0) {
        aberto = false;
    }
    
    return aberto;
}

// 5. Função para destacar links ativos no menu (se houver)
function ativarLinkAtivo() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        links.forEach(link => {
            const secao = document.querySelector(link.getAttribute('href'));
            if (secao) {
                const rect = secao.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    link.classList.add('ativo');
                } else {
                    link.classList.remove('ativo');
                }
            }
        });
    });
}

// 6. Função para rastrear cliques nos botões de ação
function rastrearCliques() {
    const botoesWhats = document.querySelectorAll('a[href*="wa.me"]');
    
    botoesWhats.forEach(botao => {
        botao.addEventListener('click', function(e) {
            console.log('Clique no botão WhatsApp em: ' + new Date().toLocaleString());
            // Aqui você pode enviar dados para analytics se desejar
        });
    });
}

rastrearCliques();

// 7. Função para scroll suave (compatibilidade com navegadores antigos)
function scrollSuave() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const alvo = document.querySelector(this.getAttribute('href'));
            if (alvo) {
                alvo.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

scrollSuave();

// 8. Exportar funções para uso global
window.ctFilhote = {
    abrirWhatsApp: abrirWhatsApp,
    verificarHorarioAberto: verificarHorarioAberto
};
