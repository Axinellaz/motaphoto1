console.log('je fonctionne ');

// F O N C T I O N     --   B T N   C h a r g e r P l u s 
jQuery(document).ready(function($) {
    var page = 8;
    var loading = false;
    var offset = 0;
    var images = [];
    var currentIndex = 0;

    load_more_photos();
    $('#load-more-btn').click(load_more_photos);

    function load_more_photos() {
        if (!loading) {
            loading = true;
            $.ajax({
                type: 'POST',
                url: scripts_params.ajaxurl,
                data: {
                    action: 'load_more_images',
                    page: page,
                    offset: offset
                },
                success: function(response) {
                    offset = page + offset;
                    $('.all_items_photos').append(response);
                    $('.all_items_photos .hover_lightbox__container img').each(function() {
                        images.push($(this).attr('src')); // Ajoute la source réelle de l'image à la liste
                    });
                    loading = false;
                    updateLightboxIndex(); // Mettre à jour l'index de la lightbox après le chargement de nouvelles images
                }
            });
        }
    }

    function updateLightboxIndex() {
    // Réinitialiser l'index de la lightbox pour refléter les nouvelles images
    $('.fullscreen-btn').each(function(index) {
          $(this).data('index', index + images.length - $('.fullscreen-btn').length); // Ajout d'un offset 
    });
}

    // Fonction pour afficher la lightbox avec l'image correspondante à l'index cliqué
    function displayLightbox(clickedIndex) {
        var imageUrl = images[clickedIndex];
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
        currentIndex = clickedIndex;
    }

    // Fonction pour mettre à jour la lightbox avec l'image précédente ou suivante
    function updateLightbox(direction) {
        if (direction === 'prev') {
            currentIndex = (currentIndex + 1) % images.length;
        } else {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
        }
        var newImage = $('<img>').attr({
            'src': images[currentIndex],
            'alt': 'Image en pleine taille'
        }).css({
            'max-width': '100vh',
            'max-height': '90vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99'
        });
        $('.lightbox__container').html(newImage);
    }

    // Associer les événements click aux boutons prevBtn, nextBtn et closeBtn
    $("#prevBtn").on('click', function() {
    updateLightbox('next'); // Sens inversé rectifié
    });

    $("#nextBtn").on('click', function() {
        updateLightbox('prev');// Sens inversé rectifié
    });
    $("#closeBtn").on('click', function() {
        $("#lightbox").fadeOut();
    });

    // Associer l'événement click aux boutons fullscreen-btn
    $('.all_items_photos').on('click', '.fullscreen-btn', function() {
        var clickedIndex = parseInt($(this).data('index')); // Récupérer l'index à partir de l'attribut de données
        displayLightbox(clickedIndex);
    });

    load_more_photos(); 

// F O N C T I O N -- C O T E  C L I E N T   --  B T N  S e l e c t C A T E G O R I E S 

var selectedCategory = '';
var selectedFormat = '';
var selectedDate = '';

function updateFiltersAndRefreshGallery() {
    
    selectedCategory = $('#categories-select').val();
    selectedFormat = $('#formats-select').val();
    selectedDate = $('#date-select').val();

    $.ajax({
        type: 'POST',
        url: scripts_params.ajaxurl,
        data: {
            action: 'filter_photos',
            category: selectedCategory,
            format: selectedFormat,
            date: selectedDate
        },
        success: function(response) {
            $('.all_items_photos').html(response);
        }
    });
}
      // Charger les images lorsque les filtres sont modifiés
    $('#categories-select, #formats-select, #date-select').change(function() {
        updateFiltersAndRefreshGallery()
    });

    // Charger les images une fois au chargement de la page
    updateFiltersAndRefreshGallery();

// BTN CONTACT MENU NAVIGATION  

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


// -- PAGE D ARTICLE - SINGLE 
    
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
