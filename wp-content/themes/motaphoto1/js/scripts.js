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

    // Fonction pour charger plus de photos en utilisant l'API REST 
    function load_more_photos() {
    
        // Vérifie si une autre requête est déjà en cours, pour éviter les requêtes multiples
        if (!loading) {
            loading = true; 
            
            var id_category = $('#categories-select').val();
            var id_formats = $('#formats-select').val();
            console.log(id_formats);
            var date = $('#date-select').val();
            console.log(date);
            var cat = '';
            var format = '';
            console.log(cat);

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
                // Ajoute le paramètre de tri par date à l'URL de la requête
                requestUrl += '&format=' + id_formats;
            }
            console.log(requestUrl);
            $.ajax({
                type: 'GET',
                url: requestUrl,
                success: function(response) {
                    console.log(response);
                    offset += page; // Augmente l'offset pour la prochaine requête
                    $.each(response, function(index, photo) {
                        console.log(photo._embedded['wp:featuredmedia'][0].source_url);
                    var imageElement = ('<div class="hover_lightbox__container">');
                         imageElement += '<img src="' + photo._embedded['wp:featuredmedia'][0].source_url + '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' + photo.id + '"></img>';
                        

                        imageElement += '<div class="icons hover_lightbox__overlay">';
                        imageElement += '<button class="fullscreen-btn btn_hover_lightbox" data-image-url="' + photo._embedded['wp:featuredmedia'][0].source_url  + '"><i class="fa-solid fa-expand"></i></button> ';
                        imageElement += '<a href="' + photo.link + '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
                        imageElement += '<a class="txt_title_overlay" href="' + photo.link + '"><p>' + photo.title.rendered + '</p></a>';
                        imageElement += '</div>'; // Fermez la div des boutons
                        imageElement += '</div>'; // Fermez la div hover_lightbox__container
                        $('.all_items_photos').append(imageElement)
                        images.push(photo.url); // Ajoute l'URL de la photo à la liste des images chargées
                    });
                    /* 
                    // Ajoutez les boutons en tant qu'enfant de la div hover_lightbox__container
                        imageElement += '<div class="icons hover_lightbox__overlay">';
                        imageElement += '<button class="fullscreen-btn btn_hover_lightbox" data-image-url="' + imageURL + '"><i class="fa-solid fa-expand"></i></button> ';
                        imageElement += '<a href="' + photo.link + '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
                        imageElement += '<a class="txt_title_overlay" href="' + photo.link + '"><p>' + photo.title.rendered + '</p></a>';
                        imageElement += '</div>'; // Fermez la div des boutons
                        imageElement += '</div>'; // Fermez la div hover_lightbox__container

                    */
                    loading = false; // Indique que la requête est terminée
                    // Cache le bouton "Load More" s'il n'y a plus de photos à charger
                    if (response.length === 0) {
                        $('#load-more-btn').hide();
                    }else {
                    // Affiche le bouton "Charger plus" si les catégories sont sur leur valeur par défaut
                    if (id_category === '' && id_formats === '' && date === '') {
                        $('#load-more-btn').show();
                    }
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

    // Ecouteur d'événement pour détecter les changements dans les sélecteurs de filtres
    $('#categories-select, #formats-select, #date-select').on('change', function() {
        // Recharger les photos lorsque les filtres changent
        $('.all_items_photos').empty(); // Effacez les photos actuellement affichées

        offset = 0; // Réinitialiser l'offset
        load_more_photos(); // Recharger les photos avec les nouveaux filtres
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


