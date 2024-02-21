<?php 
function motaphoto_register_assets() {
    // Inclure jQuery
    wp_enqueue_script('jquery');

    // Inclure Select2
    wp_enqueue_style('select2',  "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" );
    wp_enqueue_script('select2', "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js", array('jquery'), '4.1.0-rc.0', true);

    // Localiser vos scripts_params sur le script personnalisé
    wp_localize_script(
        'jquery', // Utilisez le nom du script personnalisé où vous utilisez les paramètres,
        'scripts_params',
        array('ajaxurl' => admin_url('admin-ajax.php'))
    );

    // Déclarer fichiers CSS et JavaScript personnalisés
    wp_enqueue_style( 'main', get_template_directory_uri() . '/css/main.css', array(), '1.0');
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '1.0', true);
    wp_enqueue_script( 'custom', get_template_directory_uri() . '/js/custom.js', array( 'jquery' ), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'motaphoto_register_assets' );


// Déclarer mon menu nav 
function register_my_menu() {
    register_nav_menu( 'main', __( 'Menu', 'text-domain' ) );
    register_nav_menu( 'footer-menu', __( 'Pied de page ', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

// Fonction - coté serveur pour btn charger plus d'images avec AJAX
function load_more_images() {
    $page = $_POST['page'];
    $offset = $_POST['offset'];
    $selectedCategory = isset($_POST['category']) ? $_POST['category'] : '';
    $selectedFormat = isset($_POST['format']) ? $_POST['format'] : '';
    $selectedDate = isset($_POST['date']) ? $_POST['date'] : '';
    $index = 0; 

    $args = array(
        'post_type' => 'photo', 
        'posts_per_page' => $page, 
        'offset' => $offset,
    );

     $tax_query = array();

    if (!empty($selectedCategory)) {
        $tax_query[] = array(
            'taxonomy' => 'categorie',
            'field' => 'slug',
            'terms' => $selectedCategory,
        );
    }

    if (!empty($selectedFormat)) {
        $tax_query[] = array(
            'taxonomy' => 'format',
            'field' => 'slug',
            'terms' => $selectedFormat,
        );
    }

    if (!empty($selectedDate)) {
        $args['orderby'] = 'date';
        if ($selectedDate === 'recent') {
            $args['order'] = 'DESC'; // Si la date sélectionnée est 'recent', trie par ordre décroissant (les plus récents d'abord).
        } elseif ($selectedDate === 'ancienne') {
            $args['order'] = 'ASC'; // Si la date sélectionnée est 'ancienne', trie par ordre croissant (les plus anciens d'abord).
        }
    }

    if (!empty($tax_query)) {
        $args['tax_query'] = array(
            'relation' => 'AND', // Définir la relation en dehors des clauses de taxonomie
            $tax_query, // Ajouter les clauses de taxonomie dans un tableau séparé
        );
    }


    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();

            $image_id = get_post_thumbnail_id();
            $categories = get_the_terms(get_the_ID(), 'categorie');
            $category_name = !empty($categories) ? $categories[0]->name : '';
            
            echo '<div class="hover_lightbox__container">';
            echo '<img src="' . esc_url(get_the_post_thumbnail_url(get_the_ID(), 'grande-miniature')) . '" class="attachment-grande-miniature size-grande-miniature wp-post-image" data-image-id="' . $image_id . '">';
            echo '<div class="icons hover_lightbox__overlay">';
            echo '<button class="fullscreen-btn btn_hover_lightbox" data-index="' . $index .'"  data-image-url="' . esc_url(get_the_post_thumbnail_url(get_the_ID(), 'full')) . '"><i class="fa-solid fa-expand"></i></button> ';
            echo '<a href="' . esc_url(get_permalink()) . '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';;
            echo '<a class="txt_title_overlay" href="' . esc_url(get_permalink()) . '"><p>' . get_the_title() .'</p> </a>';
            echo '<a class="txt_categorie_overlay" href="' . esc_url(get_permalink()) . '"><p>' . $category_name . '</p></a>';
           
            echo '</div>';
            echo '</div>';
            
                                                   
        endwhile;
        wp_reset_postdata();
    else :
        
        echo '';
    endif;

    die();
}
// Action WordPress pour traiter la requête AJAX
add_action('wp_ajax_load_more_images', 'load_more_images');
add_action('wp_ajax_nopriv_load_more_images', 'load_more_images');

// F O N C T I O N  -  H E R O  B A N N E R 
function get_random_photo_url() {
    $args = array(
        'post_type' => 'photo',
        'orderby'   => 'rand', // Récupère une image aléatoire
        'posts_per_page' => 1,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        $query->the_post();
        $image_url = get_the_post_thumbnail_url();
        wp_reset_postdata();
        return $image_url;
    }

    // Si aucune image n'est trouvée, retourne une image de remplacement
    return get_template_directory_uri() . '/assets/default_background.jpg';
}

// URL de l'image aléatoire
$random_photo_url = get_random_photo_url();



// Ajouter une taille a la fonction get_the_post 

add_action( 'after_setup_theme', 'theme_custom_image_sizes' );
function theme_custom_image_sizes() {
    add_image_size( 'grande-miniature', 500, 500, true );
}
