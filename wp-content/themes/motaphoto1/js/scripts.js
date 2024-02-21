console.log('je fonctionne ');

jQuery(document).ready(function($) {
    // Initialisation de Select2 sur un élément avec l'ID 'select-element'
    $('.btn-select-motaphoto').select2({
        minimumResultsForSearch: Infinity
    });
});

// F O N C T I O N     --   B T N   C h a r g e r P l u s 
jQuery(document).ready(function($) {
    var page = 8;
    var loading = false;
    var offset = 0;
    var images = [];
    var currentIndex = 0;


     // Fonction pour charger plus de photos
    function load_more_photos(selectedCategory, selectedFormat,selectedDate) {
        if (!loading) {
            loading = true;
            $.ajax({
                type: 'POST',
                url: scripts_params.ajaxurl,
                data: {
                    action: 'load_more_images',
                    page: page,
                    offset: offset,
                    category: selectedCategory, // Transmettre la catégorie sélectionnée
                    format: selectedFormat, // Transmettre le format sélectionné
                    date: selectedDate // Transmettre la date sélectionnée
                },
                success: function(response) {
                    offset += page;
                    $('.all_items_photos').append(response);
                    $('.all_items_photos .hover_lightbox__container img').each(function() {
                        images.push($(this).attr('src')); // Ajoute la source réelle de l'image à la liste
                    });
                    loading = false;
                   
                   if (response.trim() == '') {
                    // Masquer le bouton "Load More" s'il n'y a pas de nouvelles images
                    $('#load-more-btn').hide();
                }
                    
                }
            });
        }
    }

    // Charger les images lorsque les filtres sont modifiés
    $('#categories-select, #formats-select, #date-select').change(function() {
        var selectedCategory = $('#categories-select').val();
        console.log(selectedCategory);
        var selectedFormat = $('#formats-select').val();
        console.log(selectedFormat);
        var selectedDate = $('#date-select').val();
        console.log(selectedDate);
        // Réinitialiser les variables et le contenu de la galerie
        offset = 0;
        $('.all_items_photos').html('');
        load_more_photos(selectedCategory, selectedFormat, selectedDate); // Charger les premières images avec les nouveaux filtres
        
        // Vérifier si tous les sélecteurs sont à leur valeur par défaut
        var allSelectorsDefault = selectedCategory === '' && selectedFormat === '' && selectedDate === '';

        // Afficher le bouton "Load More" si tous les sélecteurs sont à leur valeur par défaut
        if (allSelectorsDefault) {
            $('#load-more-btn').show();
        } else {
            $('#load-more-btn').hide();
        }
    });

    // Charger les images une fois au chargement de la page
    $(document).ready(function() {
        load_more_photos();
    });

    $('#load-more-btn').on('click', function() {
    console.log("Bouton 'Load More' cliqué !");
    load_more_photos(); 
});

    // Fonction pour afficher la lightbox avec l'image correspondante à l'index cliqué
    function displayLightbox(imageId) {
        var imageUrl = $('[data-image-id="' + imageId + '"]').attr('src');
        var newImage = $('<img>').attr({
            'src': imageUrl,
            'alt': 'Image en pleine taille'
        }).css({
            'max-width': '100vh',
            'max-height': '90vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99'
        });
        $('.lightbox__container').html(newImage);
        $('#lightbox').fadeIn();
    }



    // Fonction pour mettre à jour la lightbox avec l'image suivante ou précédente
function updateLightbox(direction) {
    var currentGallery = $('.all_items_photos .hover_lightbox__container img');
    var currentImageSrc = $('.lightbox__container img').attr('src');
    var currentIndex = currentGallery.index($('[src="' + currentImageSrc + '"]'));

    var nextIndex;
    if (direction === 'prev') {
        nextIndex = (currentIndex + 1) % currentGallery.length;
    } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = currentGallery.length - 1;
        }
    }

    var nextImageSrc = currentGallery.eq(nextIndex).attr('src');

    // Vérifier si l'index de l'image suivante est égal à zéro,
    // ce qui signifie que nous sommes arrivés à la fin du nouveau catalogue filtré
    if (nextIndex === 0 && direction === 'prev') {
        // Renvoyer à la première image du nouveau catalogue
        nextImageSrc = currentGallery.eq(0).attr('src');
    }

    // Vérifier si nextImageSrc est défini avant de créer la nouvelle image
    if (nextImageSrc) {
        var newImage = $('<img>').attr({
            'src': nextImageSrc,
            'alt': 'Image en pleine taille'
        }).css({
            'max-width': '100vh',
            'max-height': '90vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99'
        });

        $('.lightbox__container img').replaceWith(newImage);
    }
}



    // Associer les événements click aux boutons prevBtn, nextBtn et closeBtn
    $("#prevBtn").on('click', function() {
        updateLightbox('next'); // Sens inversé rectifié
    });

    $("#nextBtn").on('click', function() {
        updateLightbox('prev'); // Sens inversé rectifié
    });
    $("#closeBtn").on('click', function() {
        $("#lightbox").fadeOut();
    });

    // Associer l'événement click aux boutons fullscreen-btn
    $('.all_items_photos').on('click', '.fullscreen-btn', function() {
            var imageId = $(this).closest('.hover_lightbox__container').find('img').data('image-id'); 
        // Utilisez l'URL de l'image pour afficher la lightbox ou effectuer d'autres opérations nécessaires
        console.log(imageId);
      displayLightbox(imageId);  
    });


});

// BTN CONTACT MENU NAVIGATION  
jQuery(document).ready(function($) {
     // Lorsque le lien "Contact" est cliqué
        $(".menu-item-33").on('click', function() {
            $("#contact").fadeIn();
            return false;
        });

        // Lorsque le bouton de fermeture est cliqué
        $(".close__icone").on('click',function() {
            // Masque la modale
            $("#contact").fadeOut();
        });
});

// -- PAGE D ARTICLE - SINGLE 
jQuery(document).ready(function($) {
// F L E C H E  D E  N A V I G A T I O N 
    function nav_arrow_single_article() {
        $('.container_arrow_nav a').on('click', function(e) {
            e.preventDefault();
            var post_url = $(this).attr('href');
            // Charger le contenu de l'article via AJAX et l'afficher
            $('#content-container').load(post_url + ' #content');
            // Mettre à jour l'URL du navigateur
            history.pushState(null, null, post_url);
        });
    };

});


