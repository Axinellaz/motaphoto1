<?php 
function motaphoto_register_assets(){

wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js', array(), null, true);
 // Localisez votre script
    wp_localize_script(

        'jquery', // Utilisez 'jquery' comme le nom du script, car c'est le même que celui inclus ci-dessus,
        'scripts_params',
        array('ajaxurl' => admin_url('admin-ajax.php'))
    );
// Declarer fichier main.css
wp_enqueue_style( 'main', get_template_directory_uri() . '/css/main.css', array(), '1.0');
// Déclarer fichier scripts.js 
wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '1.0', true);
// Déclarer fichier scripts.js 
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
    $index = 0; 

    $args = array(
        'post_type' => 'photo', 
        'posts_per_page' => $page, 
        'offset' => $offset,
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();

            $categories = get_the_terms(get_the_ID(), 'categorie');
            $category_name = !empty($categories) ? $categories[0]->name : '';
            
            echo '<div class="hover_lightbox__container">';
            echo  get_the_post_thumbnail(get_the_ID(), 'grande-miniature');
            echo '<div class="icons hover_lightbox__overlay">';
            echo '<button class="fullscreen-btn btn_hover_lightbox" id="fullscreen-icon" data-index="' . $index . '"><i class="fa-solid fa-expand"></i></button> ';
            echo '<a href="' . esc_url(get_permalink()) . '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';;
            echo '<a class="txt_title_overlay" href="' . esc_url(get_permalink()) . '"><p>' . get_the_title() .'</p> </a>';
            echo '<a class="txt_categorie_overlay" href="' . esc_url(get_permalink()) . '"><p>' . $category_name . '</p></a>';
           
            echo '</div>';
            echo '</div>';

            $index++;
                                                   
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


/* F O N C T I O N  -- C O T E  S E R V E U R --  L E S  B T N  S E L E C T */
function filter_photos() {
    $selectedCategory = isset($_POST['category']) ? $_POST['category'] : '';
    $selectedFormat = isset($_POST['format']) ? $_POST['format'] : '';
    $selectedDate = isset($_POST['date']) ? $_POST['date'] : '';
    $index = 0;

    $args = array(
        'post_type' => 'photo',
        'posts_per_page' => -1,
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
        $args['order'] = $selectedDate === 'recent' ? 'DESC' : 'ASC';
    }

    if (!empty($tax_query)) {
        $tax_query['relation'] = 'AND';
        $args['tax_query'] = $tax_query;
    }

    $custom_query = new WP_Query($args);

    if ($custom_query->have_posts()) :
        while ($custom_query->have_posts()) : $custom_query->the_post();
            // Récupérer les catégories et formats de l'image depuis les données des Custom Post Types (CPT)
            $categories = get_the_terms(get_the_ID(), 'categorie');
            $category_name = !empty($categories) ? $categories[0]->name : '';
            
            // Afficher la div principale pour l'image
            echo '<div class="hover_lightbox__container">';
            echo get_the_post_thumbnail(get_the_ID(), 'grande-miniature');
            echo '<div class="icons hover_lightbox__overlay">';
            echo '<button class="fullscreen-btn btn_hover_lightbox" id="fullscreen-icon" data-index="' . $index . '"><i class="fa-solid fa-expand"></i></button> ';
            echo '<a href="' . esc_url(get_permalink()) . '" class="btn_hover_lightbox" id="open-article-icon"><i class="fa-regular fa-eye"></i></a>';
            echo '<a class="txt_title_overlay" href="' . esc_url(get_permalink()) . '"><p>' . get_the_title() .'</p> </a>';
            echo '<a class="txt_categorie_overlay" href="' . esc_url(get_permalink()) . '"><p>' . $category_name . '</p></a>';
            echo '</div>'; // Ferme hover_lightbox__overlay
            echo '</div>'; // Ferme hover_lightbox__container

            $index++;
        endwhile;
    else :
        echo 'Aucune photo trouvée.';
    endif;

    wp_reset_postdata();
    die();
}




add_action('wp_ajax_filter_photos', 'filter_photos');
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos');

// Ajouter une taille a la fonction get_the_post 

add_action( 'after_setup_theme', 'theme_custom_image_sizes' );
function theme_custom_image_sizes() {
    add_image_size( 'grande-miniature', 500, 500, true );
}
