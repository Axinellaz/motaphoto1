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
    var globalImageReference;
    var globalImageCategorie;

    // Fonction pour charger plus de photos en utilisant l'API REST
    function load_more_photos() {
        // Vérifie si vous êtes sur la page d'accueil
        if (is_home_page()) {
            var id_category = $('#categories-select').val();
            var id_formats = $('#formats-select').val();
            var date = $('#date-select').val();
            var cat = '';

            if (id_category !== '') {
                cat = 'categorie=' + id_category + '&';
            }

            var requestUrl = scripts_params.rest_url + 'wp/v2/photo?' + cat + 'per_page=' + page + '&offset=' + offset + '&_embed=true';

            // Si l'utilisateur a sélectionné une option de tri par date
            if (date !== '') {
                // Ajoute le paramètre de tri par date à l'URL de la requête
                requestUrl += '&orderby=date&order=' + date;
            }
            if (id_formats !== '') {
                // Ajoute le paramètre de tri par format à l'URL de la requête
                requestUrl += '&format=' + id_formats;
            }

            $.ajax({
                type: 'GET',
                url: requestUrl,
                success: function(response) {
                    offset += page; // Augmente l'offset pour la prochaine requête
                    $.each(response, function(index, photo) {
                        globalImageReference = photo.acf.references;
                        var imageReference = photo.acf.references;
                        var imageUrl = photo._embedded['wp:featuredmedia'][0].source_url;
                        var categoryId = photo.categorie[0];
                        var categoryName = '';
                        globalImageCategorie = categoryName;

                        if (photo._embedded && photo._embedded['wp:term'] && photo._embedded['wp:term'].length > 0) {
                            var terms = photo._embedded['wp:term'];
                            for (var i = 0; i < terms.length; i++) {
                                var categories = terms[i];
                                for (var j = 0; j < categories.length; j++) {
                                    if (categories[j].id === categoryId) {
                                        categoryName = categories[j].name;
                                        globalImageCategorie = categoryName;
                                        break;
                                    }
                                }
                                if (categoryName !== '') {
                                    break;
                                }
                            }
                        }
                        var imageElement = '<div class="hover_lightbox__container">';
                        imageElement += '<img src="' + imageUrl + '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' + photo.id + '"></img>';

                        imageElement += '<div class="image-reference" style="display:none;">' + imageReference + '</div>';
                        imageElement += '<div class="image-category" style="display:none;">' +  categoryName + '</div>';

                        imageElement += '<div class="icons hover_lightbox__overlay">';
                        imageElement += '<button class="fullscreen-btn btn_hover_lightbox"  data-image-url="' + photo._embedded['wp:featuredmedia'][0].source_url  + '"><i class="fa-solid fa-expand"></i></button>';
                        imageElement += '<a href="' + photo.link + '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
                        imageElement += '<a class="txt_title_overlay" href="' + photo.link + '"><p>' + photo.title.rendered + '</p></a>';
                        imageElement += '<a class="txt_title_categorie_overlay" href="' + photo.link + '"><p>' +  categoryName + '</p></a>';
                        imageElement += '</div>';
                        imageElement += '</div>';

                        $('.all_items_photos').append(imageElement);
                        images.push(photo.url);
                    });
                    loading = false;
                    if (response.length === 0) {
                        $('#load-more-btn').hide();
                    } else {
                        if (id_category === '' && id_formats === '' && date === '') {
                            $('#load-more-btn').show();
                        }
                    }
                }
            });
        }
    }

    function is_home_page() {
      return $('#banner').length > 0;
}


    // Charger les images une fois au chargement de la page
    $(document).ready(function() {
        load_more_photos();
    });
    // Ecouteur d'evenement sur btn Charger plus 
    $('#load-more-btn').on('click', function() {
        load_more_photos(); 
    });


    // Ecouteur d'événement pour détecter les changements dans les sélecteurs de filtres
    $('#categories-select, #formats-select, #date-select').on('change', function() {
        // Recharger les photos lorsque les filtres changent
        $('.all_items_photos').empty(); // Effacez les photos actuellement affichées

        offset = 0; // Réinitialiser l'offset
        load_more_photos(); // Recharger les photos avec les nouveaux filtres
    });
 
  // Associer l'événement click aux boutons fullscreen-btn
    $(document).on('click', '.fullscreen-btn', function() {
        console.log('clické')
        var imageId = $(this).closest('.hover_lightbox__container').find('img').data('image-id'); 
         var imageReference = $(this).siblings('.image-reference').text();
        console.log(imageReference);
         displayLightbox(imageId, imageReference);  
    });
    
    // Fonction pour afficher la lightbox avec l'image correspondante à l'index cliqué
    function displayLightbox(imageId) {
        var imageUrl = $('[data-image-id="' + imageId + '"]').attr('src');
        var newImage = $('<img>').attr({
            'src': imageUrl,
            'alt': 'Image en pleine taille'
        }).css({
            'max-width': '100vh',
            'max-height': '85vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99',
            
        });
    
        var currentContainer = $('[data-image-id="' + imageId + '"]').closest('.hover_lightbox__container');
        var imageCategory = currentContainer.find('.image-category').text(); // Récupérer la catégorie de l'image

        $('.lightbox__container').html(newImage);

        $('#btnAfficherReference').text(globalImageReference);
        $('#btnAfficherCategorie').text(imageCategory);
        $('#lightbox').fadeIn();
    }


function updateLightbox(direction) {
    var currentImage;
    var currentImageSrc;
    var nextIndex;

    // Vérifier si vous êtes sur la page de la galerie ou sur la page single post
    if ($('.all_items_photos').length > 0) {
        // Sélectionner l'image actuelle et son conteneur sur la page de la galerie
        currentImage = $('.all_items_photos .hover_lightbox__container img');
        currentImageSrc = $('.lightbox__container img').attr('src');
    } else {
        // Sélectionner l'image actuelle et son conteneur sur la page single post
        currentImage = $('.related_images img');
        currentImageSrc = $('.lightbox__container img').attr('src');
    }

    var currentIndex = currentImage.index(currentImage.filter('[src="' + currentImageSrc + '"]'));

    if (direction === 'prev') {
        nextIndex = (currentIndex + 1) % currentImage.length;
    } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
            nextIndex = currentImage.length - 1;
        }
    }

    var nextImageSrc = currentImage.eq(nextIndex).attr('src');

    if (nextImageSrc) {
        var newImage = $('<img>').attr({
            'src': nextImageSrc,
            'alt': 'Image en pleine taille'
        }).css({
            'max-width': '100vh',
            'max-height': '85vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99',
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


$(document).ready(function() {
    $('#contact-btn').on('click', function(event) {
        event.preventDefault();

        var reference = $(this).data('reference');
        $('#field-ref').val(reference);

        $('#contact').fadeIn();
        return false;
    });
});