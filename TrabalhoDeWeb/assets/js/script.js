// Controle das abas de filtro
function initFilterTabs() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
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

// Efeitos de hover nos produtos
function initProductHover() {
    const produtoCards = document.querySelectorAll('.produto-card');
    if (!produtoCards.length) return;
    
    produtoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
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

 // Carrinho
// Controle do carrinho lateral
document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('cart-toggle');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeBtn = document.getElementById('cart-close');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.produto-card');

    if (toggleBtn && cartSidebar && closeBtn) {
        toggleBtn.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            atualizarCarrinho();
        });

        closeBtn.addEventListener('click', () => {
            cartSidebar.classList.remove('open');
        });

        window.addEventListener('click', (e) => {
            if (!cartSidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
                cartSidebar.classList.remove('open');
            }
        });
    } else {
        console.warn('IDs não encontrados: verifique HTML');
    }

    // Filtro de produtos
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-categoria');
                card.style.display = (filterValue === 'todos' || filterValue === cardCategory) ? 'block' : 'none';
            });
        });
    });
});

//carrinho
let carrinho = [];

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalCarrinho = document.getElementById('total-carrinho');

    itensCarrinho.innerHTML = '';

    let total = 0;

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = '<p>Seu carrinho está vazio</p><a href="#Produtos" class="cart-link">Continuar comprando</a>';
        totalCarrinho.textContent = 'Total: R$ 0,00';
        return;
    }

    carrinho.forEach((item, index) => {
        total += item.preco;

        const itemElement = document.createElement('div');
        itemElement.className = 'item-carrinho';
        itemElement.innerHTML = `
            <span>${item.nome} - R$ ${item.preco.toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        itensCarrinho.appendChild(itemElement);
    });

    totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

//
document.addEventListener('DOMContentLoaded', function () {
    const botoesComprar = document.querySelectorAll('.btn-comprar');
  
    botoesComprar.forEach(botao => {
      botao.addEventListener('click', function (e) {
        e.preventDefault(); // previne redirecionamento de links
        const nome = this.getAttribute('data-nome');
        const preco = parseFloat(this.getAttribute('data-preco'));
        adicionarAoCarrinho(nome, preco);
      });
    });
  });
  
//

//filtor
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.produto-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-categoria');

                // Mostra ou esconde o card baseado no filtro
                if (filterValue === 'todos' || filterValue === cardCategory) {
                    card.style.display = 'block'; // ou 'flex', 'grid', dependendo do seu layout
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});