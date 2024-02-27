
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
});

    // Charger les images lorsque les filtres sont modifiés
    $('#categories-select, #formats-select, #date-select').change(function() {
        var selectedCategory = $('#categories-select').val();
        var selectedFormat = $('#formats-select').val();
        var selectedDate = $('#date-select').val();
        // Réinitialiser les variables et le contenu de la galerie
        offset = 0;
        $('.all_items_photos').html('');
        load_more_photos(selectedCategory, selectedFormat, selectedDate); 
        
        // Vérifier si tous les sélecteurs sont à leur valeur par défaut
        var allSelectorsDefault = selectedCategory === '' && selectedFormat === '' && selectedDate === '';
        // Afficher le bouton "Load More" si tous les sélecteurs sont à leur valeur par défaut
        if (allSelectorsDefault) {
            $('#load-more-btn').show();
        } else {
            $('#load-more-btn').hide();
        }
    });

    // F O N C T I O N     --   B T N   C h a r g e r P l u s 
jQuery(document).ready(function($) {
    var page = 8;
    var loading = false;
    var offset = 0;
    var images = [];
    var currentIndex = 0;

    // Fonction pour charger plus de photos en utilisant l'API REST 
    function load_more_photos() {
        // Vérifie si une autre requête est déjà en cours, pour éviter les requêtes multiples
        if (!loading) {
            loading = true; 

            $.ajax({
                type: 'GET',
                url: scripts_params.rest_url + 'wp/v2/photo', // Endpoint de l'API REST personnalisé pour les photos
                data: {
                    action: 'load_more_photos_callback',
                    per_page: page, 
                    offset: offset, 

                },
                success: function(response) {
                    console.log(response);
                    offset += page; // Augmente l'offset pour la prochaine requête

                    $.each(response, function(index, photo) {
                        var imgContent = $(photo.content.rendered).find('img');
                        var imageURL = imgContent.attr('src');
                        var imageElement = '<div class="hover_lightbox__container">';
                        imageElement += '<img src="' + imageURL + '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' + photo.id + '">';
                        
                        // Ajoutez les boutons en tant qu'enfant de la div hover_lightbox__container
                        imageElement += '<div class="icons hover_lightbox__overlay">';
                        imageElement += '<button class="fullscreen-btn btn_hover_lightbox" data-image-url="' + imageURL + '"><i class="fa-solid fa-expand"></i></button> ';
                        imageElement += '<a href="' + photo.link + '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
                        imageElement += '<a class="txt_title_overlay" href="' + photo.link + '"><p>' + photo.title.rendered + '</p></a>';
                        imageElement += '</div>'; // Fermez la div des boutons
                        imageElement += '</div>'; // Fermez la div hover_lightbox__container

                        $('.all_items_photos').append(imageElement);

                         images.push(imageURL);
                });

                   

                    loading = false; // Indique que la requête est terminée
                    // Cache le bouton "Load More" s'il n'y a plus de photos à charger
                    if (response.length === 0) {
                        $('#load-more-btn').hide();
                    }
                }
            });
        }
    }

    // Charger les images une fois au chargement de la page
    $(document).ready(function() {
        load_more_photos();
    });
    // Ecouteur d'evenement sur btn Charger plus 
    $('#load-more-btn').on('click', function() {
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
            'max-height': '85vh',
            'display': 'block',
            'margin': 'auto',
            'z-index': '99',
            
        });
        $('.lightbox__container').html(newImage);
        $('#lightbox').fadeIn();
    }

  // Associer l'événement click aux boutons fullscreen-btn
    $('.all_items_photos').on('click', '.fullscreen-btn', function() {
        var imageId = $(this).closest('.hover_lightbox__container').find('img').data('image-id'); 
         displayLightbox(imageId);  
    });

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


    // Écoute des changements dans les sélecteurs
    $('.btn-select-motaphoto').change(function() {
        // Récupération des valeurs sélectionnées
        var categorie = $('#categories-select').val();
        console.log(categorie);
        var format = $('#formats-select').val();
        var tri = $('#date-select').val();

        // Envoi de la requête AJAX
        $.ajax({
            url: scripts_params.ajaxurl,
            type: 'POST',
            data: {
                action: 'update_gallery',
                categorie: categorie,
                format: format,
                tri: tri
            },
            success: function(response) {
                // Mise à jour de la section avec le nouveau contenu
                $('#all_items_photos').html(response);
            }
        });
    });

     function load_more_photos(selectedCategory, selectedFormat, selectedDate) {
        // Vérifie si une autre requête est déjà en cours, pour éviter les requêtes multiples
        if (!loading) {
            loading = true; // Indique que la requête est en cours
            var id_category = $('#categories-select').val();
            var formats = $('#formats-select').val();
            var date = $('#date-select').val();
            var cat = '';
            if (id_category !== '') {
                cat = 'categorie=' + id_category + '&';
            }
            var requestUrl = scripts_params.rest_url + 'wp/v2/photo?' + cat + 'per_page=' + page + '&offset=' + offset + '&_embed=true';
            $.ajax({
                type: 'GET',
                url: requestUrl,
                success: function(response) {
                    console.log(response);
                    offset += page; // Augmente l'offset pour la prochaine requête
                    // Parcourt chaque photo dans la réponse et l'ajoute à la galerie
                    $.each(response, function(index, photo) {
                        console.log(photo._embedded['wp:featuredmedia'][0].source_url);
                        $('.all_items_photos').append('<div class="hover_lightbox__container"><img src="' + photo._embedded['wp:featuredmedia'][0].source_url + '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' + photo.id + '"></div>');
                        images.push(photo.url); // Ajoute l'URL de la photo à la liste des images chargées
                    });
                    loading = false; // Indique que la requête est terminée
                    // Cache le bouton "Load More" s'il n'y a plus de photos à charger
                    if (response.length === 0) {
                        $('#load-more-btn').hide();
                    }
                }
            });
        }
    }


     function load_more_photos() {
    
        // Vérifie si une autre requête est déjà en cours, pour éviter les requêtes multiples
        if (!loading) {
            loading = true; 
            
            var id_category = $('#categories-select').val();
            var formats = $('#formats-select').val();
            var date = $('#date-select').val();
            var cat = '';

            var requestUrl = scripts_params.rest_url + 'wp/v2/photo?' + cat + 'per_page=' + page + '&offset=' + offset + '&_embed=true';
            $.ajax({
                type: 'GET',
                url: requestUrl,
                success: function(response) {
                    console.log(response);
                    offset += page; // Augmente l'offset pour la prochaine requête

                    $.each(response, function(index, photo) {
                        var imgContent = $(photo.content.rendered).find('img');
                        var imageURL = imgContent.attr('src');
                        var imageElement = '<div class="hover_lightbox__container">';
                        imageElement += '<img src="' + imageURL + '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' + photo.id + '">';
                        
                        // Ajoutez les boutons en tant qu'enfant de la div hover_lightbox__container
                        imageElement += '<div class="icons hover_lightbox__overlay">';
                        imageElement += '<button class="fullscreen-btn btn_hover_lightbox" data-image-url="' + imageURL + '"><i class="fa-solid fa-expand"></i></button> ';
                        imageElement += '<a href="' + photo.link + '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
                        imageElement += '<a class="txt_title_overlay" href="' + photo.link + '"><p>' + photo.title.rendered + '</p></a>';
                        imageElement += '</div>'; // Fermez la div des boutons
                        imageElement += '</div>'; // Fermez la div hover_lightbox__container

                        $('.all_items_photos').append(imageElement);

                         images.push(imageURL);
                });
