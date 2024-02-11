
// Fonction - coté serveur pour charger plus d'images avec AJAX
function load_more_images() {
    $page = $_POST['page'];

    $args = array(
        'post_type' => 'photo', 
        'posts_per_page' => 4, // Nombre d'images à charger par page
        'paged' => $page
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
        while ($query->have_posts()) : $query->the_post();
            
            echo '<div class="item_photo">' . get_the_post_thumbnail() . '</div>';
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


// Déclarer fichier scripts.js 
wp_enqueue_script( 'scripts', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '1.0', true);

wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js', array(), null, true);
 // Localisez votre script
    wp_localize_script(
        'scripts',
        'scripts_params',
        array('ajaxurl' => admin_url('admin-ajax.php'))
    );

    
/* F O N C T I O N  -- C O T E  S E R V E U R --  B T N  S E L E C T */

function filter_photos() {
    $selectedCategory = $_POST['category'];

    $args = array(
        'post_type' => 'photo', 
        'posts_per_page' => 8,
        'tax_query' => array(
            array(
                'taxonomy' => 'categorie', // Remplacez "votre_taxonomy" par le slug de votre taxonomie
                'field' => 'slug',
                'terms' => $selectedCategory,
            ),
        ),
    );

    $custom_query = new WP_Query($args);

    if ($custom_query->have_posts()) :
        while ($custom_query->have_posts()) : $custom_query->the_post();
            echo  get_the_post_thumbnail() ;
        endwhile;
        wp_reset_postdata();
    else :
        echo '';
    endif;

    die();
}

add_action('wp_ajax_filter_photos', 'filter_photos'); // Hook pour les utilisateurs connectés
add_action('wp_ajax_nopriv_filter_photos', 'filter_photos'); // Hook pour les utilisateurs non connectés

