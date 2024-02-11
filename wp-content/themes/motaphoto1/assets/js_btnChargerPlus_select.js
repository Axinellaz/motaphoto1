
        // PAGE D ACCUEIL 
// F O N C T I O N     --   B T N   C h a r g e r P l u s 
document.addEventListener('DOMContentLoaded', function() {
    var page = 1; 
    var loading = false; // Pour éviter le déclenchement de plusieurs requetes AJAX

    document.getElementById('load-more-btn').addEventListener('click', function() {
        console.log('btn cliqué')
        if (!loading) { // Vérifie si une requete Ajax est déja en cours - Si faux la nouvelle requete est lancée
            loading = true;
            page++;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', scripts_params.ajaxurl, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            xhr.onload = function() {
                if (xhr.status === 200) { // Vérifie si la requete s'est terminée avec succès
                    document.getElementById('image-container').insertAdjacentHTML('beforeend', xhr.responseText);
                    loading = false;
                }
            };

            xhr.send('action=load_more_images&page=' + page);
        }
    });
});


// btn select filtre 
document.addEventListener('DOMContentLoaded', function () {
    // Lorsqu'une option de catégorie est sélectionnée
    document.getElementById('categories-select').addEventListener('change', function () {
        var selectedCategory = this.value;

        // Effectuer une requête AJAX pour récupérer les images en fonction de la catégorie
        var xhr = new XMLHttpRequest(); // Créer une nouvelle instance de l'objet XMLHttpRequest pour effectuer une requête AJAX
        xhr.open('POST', scripts_params.ajaxurl, true); // Configuration de la requête POST vers l'URL admin-ajax.php, ajaxurl est défini par WordPress
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); // Définir l'en-tête de la requête
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Mettez à jour le contenu de la section des images avec les résultats de la requête AJAX
                document.querySelector('.all_items_photos').innerHTML = xhr.responseText;
                
            }
        };

        // Construction des données à envoyer dans la requête POST
        var data = 'action=filter_photos&category=' + selectedCategory;
        xhr.send(data); // Envoyer la requête AJAX avec les données
    });
});

/*css
* M i n i a t u r e  N A V  H O V E R */
/*
.preview-thumbnails {
    display: flex;
    justify-content: space-between;
    margin-top: 10px; /* Ajustez la marge selon vos besoins */

/*
.preview-thumbnail {
    width: 50px; /* Taille de la miniature *//*
    height: 50px; /* Taille de la miniature *//*
    border: 2px solid transparent; /* Bordure de la miniature */
   /* transition: border-color 0.3s ease; /* Transition pour un effet de survol */

/*
.preview-thumbnail.selected {
    border-color: #007bff; /* Couleur de la bordure de la miniature sélectionnée */
