

<div id="lightbox" class="lightbox">
    
  <button id="prevBtn" class="nav-btn"> <img src="<?php echo get_template_directory_uri(); ?>/assets/arrow_prev_lightbox.png" alt=""> Précédente</button>
  <button id="nextBtn" class="nav-btn"> Suivante <img src="<?php echo get_template_directory_uri(); ?>/assets/arrow_next_lightbox.png" alt=""></button>
  <button id="closeBtn" class="close-btn"><img src="<?php echo get_template_directory_uri(); ?>/assets/icone-close.png" alt=""></button>
  <?php 
    $post_id = get_the_ID();
    $image_id = $post_id;
   ?>
  <div class="lightbox__container" data-image-id="<?php echo esc_attr($image_id); ?>">
    <img class="img_lightbox" src="" alt="">
  </div>

  <p id="btnAfficherReference" > <?php echo the_title()  ?></p>
  <p>
    <?php
    $post_id = get_the_ID();
      $categories = wp_get_object_terms($image_id, 'categorie');
      if (!empty($categories) && !is_wp_error($categories)) {
          foreach ($categories as $category) {
              echo $category->name . ' ';
          }
      }
    ?>
  </p>
    
</div>