// PRODUTOS DIRETO NO CÓDIGO - EDITÁVEL NA MÃO MESMO!
const storeProducts = [
    {
        id: 1,
        name: "Barba e Cabelo Profissional",
        description: "Máquina de cortar cabelo e barba, kit completo perfeita para uso caseiro ou profissional.",
        image: "assets/maquina.png",
        price: "R$ 16,96",
        affiliateLink: "https://mercadolivre.com/sec/13g1KdT"
    },
    {
        id: 2,
        name: "Fone de Ouvido Bluetooth",
        description: "Fone de ouvido sem fio com cancelamento de ruído, bateria de 22h, qualidade de som premium.",
        image: "assets/fone.png",
        price: "R$ 78,90",
        affiliateLink: "https://mercadolivre.com/sec/1GBLM7S"
    },
    {
        id: 3,
        name: "Smartwatch Esportivo",
        description: "Smartwatch que combina tecnologia avançada, design moderno e o melhor custo-benefício do mercado.",
        image: "assets/relogio.png",
        price: "R$ 143,83",
        affiliateLink: "https://mercadolivre.com/sec/2pXy9sW"
    },
    {
        id: 4,
        name: "Caixa de Som Bluetooth",
        description: "Caixinha som portátil Oraolo oferece 24 W de som estéreo com graves profundos, resistência à água IPX6.",
        image: "assets/caixa.png",
        price: "R$ 192,06",
        affiliateLink: "https://mercadolivre.com/sec/1L5BHK7"
    }
];

// Inicialização da loja
document.addEventListener('DOMContentLoaded', function() {
    initializeStore();
    setupEventListeners();
});

// Inicializar a loja - SIMPLIFICADO!
function initializeStore() {
    // USA DIRETO OS PRODUTOS DO CÓDIGO - SEM LOCALSTORAGE COMPLICADO
    renderProducts(storeProducts);
}

// Configurar event listeners
function setupEventListeners() {
    // Busca de produtos
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });
    }
}

// Renderizar produtos na página
function renderProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    // Limpar grid
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }
    
    // Adicionar cada produto ao grid
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <a href="${product.affiliateLink}" target="_blank" class="btn buy-btn">Comprar Agora</a>
        </div>
    `;
    
    return card;
}

// Manipular busca de produtos - SIMPLIFICADO!
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderProducts(storeProducts);
        return;
    }
    
    // Filtrar produtos pelo termo de busca
    const filteredProducts = storeProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
}

// Função para mostrar notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        animation: fadeIn 0.3s, fadeOut 0.3s 2.7s forwards;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 3000);
}