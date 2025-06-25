var currentIndex = 0;
    var galleryItems = $('.gallery-items');
    var imgSrc;
    function updateModalImage(index) {
        imgSrc = galleryItems.eq(index).data('img-src');
        $('#modalImage').attr('src', imgSrc);
        currentIndex = index;
    }

    galleryItems.on('click', function(event) {
        event.preventDefault();
        var index = galleryItems.index(this);
        updateModalImage(index);
        $('#photoModal').modal('show');
    });

    $('.prev-photo').on('click', function() {
        if (currentIndex > 0) {
            updateModalImage(currentIndex - 1);
        }
    });

    $('.next-photo').on('click', function() {
        if (currentIndex < galleryItems.length - 1) {
            updateModalImage(currentIndex + 1);
        }
    });