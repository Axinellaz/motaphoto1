<?php 
function motaphoto_register_assets() {
    // Inclure jQuery
    wp_enqueue_script('jquery');

    // Inclure Select2
    wp_enqueue_style('select2',  "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" );
    wp_enqueue_script('select2', "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js", array('jquery'), '4.1.0-rc.0', true);

    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '1.0', true);
    // Localiser vos scripts_params sur les scripts personnalisés
    wp_localize_script(
        'scripts', // Utilisez le nom du script personnalisé où vous utilisez les paramètres,
        'scripts_params',
        array('ajaxurl' => admin_url('admin-ajax.php'),
              'rest_url' => esc_url_raw(rest_url()),
        )
    );

    // Déclarer fichiers CSS et JavaScript personnalisés
    wp_enqueue_style( 'main', get_template_directory_uri() . '/css/main.css', array(), '1.0');
    wp_enqueue_script( 'custom', get_template_directory_uri() . '/js/custom.js', array( 'jquery' ), '1.0', true);
}
add_action( 'wp_enqueue_scripts', 'motaphoto_register_assets' );


// Déclarer mon menu nav 
function register_my_menu() {
    register_nav_menu( 'main', __( 'Menu', 'text-domain' ) );
    register_nav_menu( 'footer-menu', __( 'Pied de page ', 'text-domain' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );

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

// Fonction pour filtrer les tailles de l'image dans srcset
function custom_image_srcset($sources, $size_array, $image_src) {
    // Retirer toutes les tailles sauf celle que vous avez définie
    $sources = array(
        array(
            'src'   => $image_src,
            'descriptor' => 'x',
            'value' => $size_array[0],
        )
    );
    return $sources;
}
add_filter('wp_calculate_image_srcset', 'custom_image_srcset', 10, 5);

