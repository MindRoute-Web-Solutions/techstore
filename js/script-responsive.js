// Scripts para responsividade

document.addEventListener('DOMContentLoaded', function() {
    initializeResponsiveFeatures();
});

// Inicializar recursos responsivos
function initializeResponsiveFeatures() {
    setupMobileMenu();
    setupSearchToggle();
}

// Configurar menu mobile
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Configurar toggle de busca no mobile
function setupSearchToggle() {
    const searchBox = document.querySelector('.search-box');
    
    if (window.innerWidth <= 768 && searchBox) {
        const headerContainer = document.querySelector('.header .container');
        const originalSearchBox = searchBox.cloneNode(true);
        
        // Criar ícone de busca para mobile
        const mobileSearchIcon = document.createElement('div');
        mobileSearchIcon.className = 'mobile-search-icon';
        mobileSearchIcon.innerHTML = '<i class="fas fa-search"></i>';
        
        // Adicionar ícone ao header
        headerContainer.appendChild(mobileSearchIcon);
        
        // Esconder a caixa de pesquisa original
        searchBox.style.display = 'none';
        
        // Toggle da caixa de pesquisa no mobile
        mobileSearchIcon.addEventListener('click', function() {
            const existingMobileSearch = document.querySelector('.search-box.mobile-active');
            
            if (existingMobileSearch) {
                existingMobileSearch.remove();
            } else {
                const mobileSearchBox = originalSearchBox.cloneNode(true);
                mobileSearchBox.classList.add('mobile-active');
                
                headerContainer.parentNode.insertBefore(mobileSearchBox, headerContainer.nextSibling);
                
                const searchInput = mobileSearchBox.querySelector('input');
                if (searchInput) {
                    searchInput.focus();
                    
                    searchInput.addEventListener('keyup', function(event) {
                        if (event.key === 'Enter') {
                            handleSearch();
                            mobileSearchBox.remove();
                        }
                    });
                }
                
                document.addEventListener('click', function closeSearchBox(e) {
                    if (!mobileSearchBox.contains(e.target) && e.target !== mobileSearchIcon) {
                        mobileSearchBox.remove();
                        document.removeEventListener('click', closeSearchBox);
                    }
                });
            }
        });
    }
}

// Função para manipular busca de produtos
function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        renderProducts(storeProducts);
        return;
    }
    
    const filteredProducts = storeProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm)
    );
    
    renderProducts(filteredProducts);
}

// Redimensionamento da janela
window.addEventListener('resize', function() {
    const mobileSearchIcon = document.querySelector('.mobile-search-icon');
    if (mobileSearchIcon) {
        mobileSearchIcon.remove();
    }
    
    const mobileSearchBox = document.querySelector('.search-box.mobile-active');
    if (mobileSearchBox) {
        mobileSearchBox.remove();
    }
    
    setupSearchToggle();
});