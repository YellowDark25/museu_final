// AIDEV-NOTE: Script para funcionalidade da galeria do acervo do Museu Casa Borges
// Gerencia modal de visualização de imagens, navegação entre fotos e paginação

$(document).ready(function() {
    let currentImageIndex = 0;
    let galleryImages = [];
    let currentPage = 1;
    const itemsPerPage = 12;
    let totalPages = 0;
    
    // AIDEV-NOTE: Coleta todas as imagens da galeria ao carregar a página
    function initializeGallery() {
        $('.gallery-items').each(function(index) {
            galleryImages.push({
                src: $(this).data('img-src'),
                alt: $(this).find('img').attr('alt'),
                element: $(this)
            });
        });
        
        // Calcular total de páginas
        totalPages = Math.ceil(galleryImages.length / itemsPerPage);
        
        // Inicializar paginação
        initializePagination();
        showPage(1);
    }
    
    // AIDEV-NOTE: Função para inicializar controles de paginação
    function initializePagination() {
        generatePaginationNumbers();
        updatePaginationInfo();
        updatePaginationButtons();
    }
    
    // AIDEV-NOTE: Função para gerar números das páginas
    function generatePaginationNumbers() {
        const paginationNumbers = $('#pagination-numbers');
        paginationNumbers.empty();
        
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = $(`
                <button type="button" class="btn btn-sm pagination-number ${i === currentPage ? 'btn-primary' : 'btn-outline-primary'}" 
                        data-page="${i}">${i}</button>
            `);
            paginationNumbers.append(pageButton);
        }
    }
    
    // AIDEV-NOTE: Função para mostrar página específica
    function showPage(pageNumber) {
        currentPage = pageNumber;
        
        // Esconder todas as imagens
        $('.gallery-items').hide();
        
        // Calcular índices da página atual
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, galleryImages.length);
        
        // Mostrar apenas as imagens da página atual
        for (let i = startIndex; i < endIndex; i++) {
            galleryImages[i].element.show();
        }
        
        // Atualizar controles de paginação
        updatePaginationInfo();
        updatePaginationButtons();
        generatePaginationNumbers();
        
        // Scroll suave para o topo da galeria
        $('html, body').animate({
            scrollTop: $('#gallery-container').offset().top - 100
        }, 300);
    }
    
    // AIDEV-NOTE: Função para atualizar informações de paginação
    function updatePaginationInfo() {
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, galleryImages.length);
        const infoText = `Página ${currentPage} de ${totalPages} - Mostrando ${endItem - startItem + 1} de ${galleryImages.length} itens`;
        $('#page-info').text(infoText);
    }
    
    // AIDEV-NOTE: Função para atualizar estado dos botões de navegação
    function updatePaginationButtons() {
        $('#prev-page').prop('disabled', currentPage === 1);
        $('#next-page').prop('disabled', currentPage === totalPages);
    }
    
    // AIDEV-NOTE: Função para atualizar a imagem no modal
    function updateModalImage(index) {
        if (galleryImages[index]) {
            $('#modalImage').attr('src', galleryImages[index].src);
            $('#modalImage').attr('alt', galleryImages[index].alt);
            $('#photoModalLabel').text(`${galleryImages[index].alt} - ${index + 1} de ${galleryImages.length}`);
        }
    }
    
    // AIDEV-NOTE: Eventos de clique para paginação
    $(document).on('click', '#prev-page', function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    $(document).on('click', '#next-page', function() {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
    
    $(document).on('click', '.pagination-number', function() {
        const pageNumber = parseInt($(this).data('page'));
        showPage(pageNumber);
    });

    // AIDEV-NOTE: Event listener para abrir modal ao clicar em uma imagem
    $('.gallery-items').on('click', function(e) {
        e.preventDefault();
        // Encontrar o índice real da imagem considerando a paginação
        const clickedSrc = $(this).data('img-src');
        currentImageIndex = galleryImages.findIndex(img => img.src === clickedSrc);
        updateModalImage(currentImageIndex);
        $('#photoModal').modal('show');
    });
    
    // AIDEV-NOTE: Navegação para imagem anterior
    $('.prev-photo').on('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateModalImage(currentImageIndex);
    });
    
    // AIDEV-NOTE: Navegação para próxima imagem
    $('.next-photo').on('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateModalImage(currentImageIndex);
    });
    
    // AIDEV-NOTE: Navegação por teclado (setas esquerda/direita e ESC)
    $(document).on('keydown', function(e) {
        if ($('#photoModal').hasClass('show')) {
            switch(e.keyCode) {
                case 37: // Seta esquerda
                    $('.prev-photo').click();
                    break;
                case 39: // Seta direita
                    $('.next-photo').click();
                    break;
                case 27: // ESC
                    $('#photoModal').modal('hide');
                    break;
            }
        }
    });
    
    // AIDEV-NOTE: Lazy loading para melhor performance
    function lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // AIDEV-NOTE: Função para adicionar efeito de loading nas imagens
    function addLoadingEffect() {
        $('.gallery-items img').on('load', function() {
            $(this).addClass('loaded');
        });
    }
    
    // AIDEV-NOTE: Inicialização da galeria
    initializeGallery();
    lazyLoadImages();
    addLoadingEffect();
    
    // AIDEV-NOTE: Log para debug - pode ser removido em produção
    console.log(`Galeria do acervo inicializada com ${galleryImages.length} imagens`);
});

// AIDEV-NOTE: Função para redimensionar modal em dispositivos móveis
function adjustModalForMobile() {
    if (window.innerWidth <= 768) {
        $('#photoModal .modal-dialog').addClass('modal-fullscreen');
        $('#modalImage').css('max-height', '60vh');
    } else {
        $('#photoModal .modal-dialog').removeClass('modal-fullscreen');
        $('#modalImage').css('max-height', '70vh');
    }
}

// AIDEV-NOTE: Ajustar modal ao redimensionar janela
$(window).on('resize', adjustModalForMobile);

// AIDEV-NOTE: Aplicar ajuste inicial
$(document).ready(adjustModalForMobile);