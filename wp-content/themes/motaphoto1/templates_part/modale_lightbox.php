
<?php
$image_id = get_the_ID(); 

$reference = get_post_meta($image_id, 'references', true);

$categories =  get_the_terms($image_id, 'categorie');


if ($categories && !is_wp_error($categories)) {
    $category_names = array();
    foreach ($categories as $category) {
        $category_names[] = $category->name;
    }
    $categories_list = implode(', ', $category_names);
} else {
    $categories_list = 'Aucune catégorie';
}


?>


<div id="lightbox" class="lightbox">
    
  <button id="prevBtn" class="nav-btn"> <img src="<?php echo get_template_directory_uri(); ?>/assets/arrow_prev_lightbox.png" alt=""> Précédente</button>
  <button id="nextBtn" class="nav-btn"> Suivante <img src="<?php echo get_template_directory_uri(); ?>/assets/arrow_next_lightbox.png" alt=""></button>
  <button id="closeBtn" class="close-btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icone-close.png" alt=""></button>
  <div class="lightbox__container" data-image-id="<?php echo esc_attr($image_id); ?>">
    <img class="img_lightbox" src="chemin/vers/image.jpg" alt="">
  </div>

  <p id="btnAfficherReference" > <?php echo esc_html($reference);  ?></p>
  <p>Catégories : <?php esc_html($categories_list) ?></p>
    
</div>