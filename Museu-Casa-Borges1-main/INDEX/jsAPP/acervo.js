// Encapsular todo o código para evitar conflitos de variáveis
(function() {
    // Verificar se o acervo já foi inicializado para evitar múltiplas execuções
    if (window.acervoInitialized) {
        console.log('Acervo já foi inicializado, reinicializando...');
        // Resetar o flag para permitir reinicialização
        window.acervoInitialized = false;
    }
    
    console.log('Inicializando módulo do acervo...');
    
    const images = [
        "acervo1.jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (1).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (2).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (3).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (4).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (5).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.26.jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (1).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (2).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (3).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (4).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (5).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (6).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (7).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (8).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (9).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (10).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (11).jpeg",
        "WhatsApp Image 2025-06-09 at 11.30.56 (12).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (2).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (3).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (4).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (5).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (6).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (7).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (8).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (9).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (11).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (12).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (13).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (14).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (15).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (16).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (17).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (18).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (20).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (21).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (22).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (23).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (24).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (25).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (26).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (27).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (29).jpeg",
        "WhatsApp Image 2025-06-09 at 11.11.27 (30).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (6).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (7).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (8).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (9).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (10).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (11).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (13).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (14).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (15).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (16).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (17).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (18).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (19).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (20).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (22).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (23).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (24).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (25).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (26).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (27).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (28).jpeg",
        "WhatsApp Image 2025-06-09 at 11.21.25 (29).jpeg"
    ];

    // Função de comparação para ordenar as imagens
    images.sort((a, b) => {
        const extractNumber = (filename) => {
            const match = filename.match(/\((\d+)\)/);
            return match ? parseInt(match[1]) : Infinity; // Retorna Infinity se não houver número, para que fiquem no final
        };

        const numA = extractNumber(a);
        const numB = extractNumber(b);

        if (numA !== Infinity && numB !== Infinity) {
            return numA - numB;
        } else if (numA === Infinity && numB === Infinity) {
            return a.localeCompare(b); // Ordena alfabeticamente se ambos não tiverem número
        } else {
            return numA === Infinity ? 1 : -1; // Coloca os arquivos sem número no final
        }
    });

    const itemsPerPage = 12;
    let currentPage = 1;

    function displayImages(page) {
        console.log(`Exibindo página ${page}`);
        
        const imageContainer = document.getElementById('imageContainer');
        if (!imageContainer) {
            console.error('Container de imagens não encontrado na displayImages');
            return;
        }
        
        imageContainer.innerHTML = ''; // Limpa o contêiner

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const imagesToDisplay = images.slice(startIndex, endIndex);
        
        console.log(`Exibindo ${imagesToDisplay.length} imagens (${startIndex} a ${endIndex})`);

        imagesToDisplay.forEach((imageName, index) => {
            console.log(`Criando imagem ${index + 1}: ${imageName}`);
            
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 mb-4';

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card acervo-card';

            const imgElement = document.createElement('img');
            imgElement.src = `INDEX/fotos_acervo/${imageName}`;
            imgElement.className = 'card-img-top acervo-image';
            imgElement.alt = 'Imagem do Acervo';
            
            // Adicionar evento de carregamento para debug
            imgElement.onload = function() {
                console.log(`Imagem carregada: ${imageName}`);
            };
            
            imgElement.onerror = function() {
                console.error(`Erro ao carregar imagem: ${imageName}`);
            };

            cardDiv.appendChild(imgElement);
            colDiv.appendChild(cardDiv);
            imageContainer.appendChild(colDiv);
        });
        
        console.log('Imagens adicionadas ao container');
    }

    function setupPagination() {
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = '';
        paginationContainer.className = 'pagination justify-content-center acervo-pagination';

        const totalPages = Math.ceil(images.length / itemsPerPage);

        // Botão Anterior
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.textContent = 'Anterior';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayImages(currentPage);
                setupPagination();
            }
        });
        prevLi.appendChild(prevLink);
        paginationContainer.appendChild(prevLi);

        // Números das páginas
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            const link = document.createElement('a');
            link.className = 'page-link';
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayImages(currentPage);
                setupPagination();
            });
            li.appendChild(link);
            paginationContainer.appendChild(li);
        }

        // Botão Próximo
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.textContent = 'Próximo';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayImages(currentPage);
                setupPagination();
            }
        });
        nextLi.appendChild(nextLink);
        paginationContainer.appendChild(nextLi);
    }

    // Função para inicializar o acervo
    function initAcervo() {
        console.log('Iniciando carregamento do acervo...');
        console.log('Total de imagens:', images.length);
        
        // Verificar se os elementos existem
        const imageContainer = document.getElementById('imageContainer');
        const paginationContainer = document.getElementById('paginationContainer');
        
        if (!imageContainer) {
            console.error('Container de imagens não encontrado');
            return;
        }
        
        if (!paginationContainer) {
            console.error('Container de paginação não encontrado');
            return;
        }
        
        console.log('Containers encontrados, carregando imagens...');
        displayImages(currentPage);
        setupPagination();
        console.log('Acervo carregado com sucesso!');
        
        // Marcar como inicializado
        window.acervoInitialized = true;
    }

    // Inicializa a exibição e a paginação quando a página for carregada
    $(document).ready(function() {
        console.log('Document ready - inicializando acervo');
        setTimeout(initAcervo, 100);
    });

    // Também inicializar imediatamente se o DOM já estiver pronto
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        console.log('DOM já pronto - inicializando acervo imediatamente');
        setTimeout(initAcervo, 50);
    }

})(); // Fim da função encapsulada