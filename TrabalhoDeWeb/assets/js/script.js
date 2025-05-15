// Controle das abas de filtro
function initFilterTabs() {
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    if (!filtroButtons.length) return;
    
    filtroButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filtroButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar classe ativa ao botão clicado
            button.classList.add('active');
            
            // Lógica para filtrar produtos (simulação)
            const filterType = button.textContent.trim();
            console.log(`Filtrando por: ${filterType}`);
            
            // Em um cenário real, você filtraria os produtos com base no tipo
            const produtoCards = document.querySelectorAll('.produto-card');
            
            if (filterType === 'Todos') {
                produtoCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                // Simulação de filtro - em um cenário real você teria atributos de categoria
                produtoCards.forEach(card => {
                    // Verificar se o card pertence à categoria selecionada
                    // Esta é uma simulação simplificada
                    const shouldShow = Math.random() > 0.5;
                    card.style.display = shouldShow ? 'block' : 'none';
                });
            }
        });
    });
}

// Animações de scroll
function initScrollAnimation() {
    // Selecionar elementos que receberão animações
    const elements = document.querySelectorAll('.section-title, .produto-card, .stat-card');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Função para adicionar classe de animação aos elementos visíveis
    function handleScroll() {
        elements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated', 'fadeIn');
            }
        });
    }
    
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verificar elementos visíveis no carregamento inicial
    handleScroll();
}

//carrinho

//

//filtor
document.addEventListener('DOMContentLoaded', function() {
    const filtroButtons = document.querySelectorAll('.filtro-btn');
    const productCards = document.querySelectorAll('.produto-card');

    filtroButtons.forEach(button => {
        button.addEventListener('click', function() {
            filtroButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-categoria');

                if (filterValue === 'todos' || filterValue === cardCategory) {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Template produtos