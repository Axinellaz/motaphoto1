<?php
get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        while (have_posts()) : the_post();
            $post_id = get_the_ID();
        ?>

            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <div class="entry-header_single_post">

                    <div class="container_cpt_taxonomie_cf_single_post">

                        <h2 class="entry-title"><?php the_title(); ?></h2>
                        <p>References : <?php the_field('references', $post_id); ?></p>
                        <p> <?php the_terms($post_id, 'categorie', 'Categorie : '); ?></p>
                        <p><?php the_terms($post_id, 'format', 'Format : '); ?> </p>
                        <p>Type : <?php the_field('types', $post_id); ?></p>
                        <p>Année : <?php echo get_the_date('Y', $post_id); ?> </p>

                    </div>

                    <div class="img_event">
                        <?php
                            if (has_post_thumbnail()) {
                                the_post_thumbnail('large');
                            }
                        ?>
                    </div>
                </div>

                <div class="entry-content">

                    <div class="items_container_entry_content">
                        <h3>Cette photo vous intéresse ?</h3>
                        <a id="contact-btn" href="" data-reference="<?php the_field('references', $post_id); ?>">
                            <button type="button">Contact</button>
                        </a>
                    </div>

                    <?php
                        // Récupérer l'ID de l'article actuel
                        $current_post_id = get_the_ID();

                        // Récupérer l'ID de l'article précédent
                        $previous_post_id = get_previous_post(false);

                        // Récupérer l'ID de l'article suivant
                        $next_post_id = get_next_post(false);

                        // Créer les liens de navigation
                        $previous_link = ($previous_post_id) ? get_permalink($previous_post_id) : '';
                        $next_link = ($next_post_id) ? get_permalink($next_post_id) : '';
                    ?>

                    <div class="container_arrow_nav">
                        <div class="preview-thumbnails">
                            <img id="prev-preview" class="preview-thumbnail" src="" >
                            <img id="next-preview" class="preview-thumbnail" src="" >
                        </div>
                        <div class="arrow_nav">
                            <?php if ($previous_post_id): ?>
                                <?php $previous_thumbnail_url = get_the_post_thumbnail_url($previous_post_id); ?>
                                <a href="<?php echo esc_url($previous_link); ?>" class="previous">
                                    <img class="navigation-arrow previous" id="prev-image-<?php echo $post->ID; ?>"  src="<?php echo get_template_directory_uri(); ?>/assets/precedent.png" alt=" flèche de navigation. image précédente">
                                </a>
                            <?php endif; ?>

                            <?php if ($next_post_id): ?>
                                <?php $next_thumbnail_url = get_the_post_thumbnail_url($next_post_id);?>
                                
                                <a href="<?php echo esc_url($next_link); ?>" class="next">
                                    <img class="navigation-arrow" id="next-image-<?php echo $post->ID; ?>" src="<?php echo get_template_directory_uri(); ?>/assets/prochain.png" alt=" flèche de navigation. prochaine image">
                                </a>
                            <?php endif; ?>

                            <script>
                                jQuery(document).ready(function($) {
                                    // Gestion du survol de la flèche précédente
                                    $('.container_arrow_nav .previous').hover(function() {
                                        var prevImage = '<?php echo $previous_thumbnail_url; ?>';
                                        console.log(prevImage , 'btn-prev');
                                        $('#prev-preview').attr('src', prevImage);
                                        $('#prev-preview').addClass('selected');
                                        $('#next-preview').removeClass('selected');
                                        
                                        
                                    });

                                    // Gestion du survol de la flèche suivante
                                    $('.container_arrow_nav .next').hover(function() {
                                        var nextImage = '<?php echo $next_thumbnail_url; ?>';
                                        console.log(nextImage, 'btn-next');
                                        $('#next-preview').prop('src', nextImage);
                                        $('#next-preview').addClass('selected');
                                        $('#prev-preview').removeClass('selected');
                                        
                                    });
                                });

                                
                        </script>
                        
                        </div>

                    </div>

                </div>

                <div class="entry-content_bottom_page">

                    <h3>Vous aimerez aussi</h3>
                        <div class="container_images_same_categorie">
                            <?php
                                // Récupére les termes de la taxonomie associée à l'image principale
                                $main_image_terms = wp_get_post_terms($post->ID, 'categorie', array("fields" => "slugs"));
            
                                $related_args = array(
                                    'post_type' => 'photo', 
                                    'posts_per_page' => 2, 
                                    'tax_query' => array(
                                        array(
                                            'taxonomy' => 'categorie', 
                                            'field' => 'slug',
                                            'terms' => $main_image_terms,
                                        ),
                                    ),
                                    'post__not_in' => array($post->ID), // Exclure l'image principale de la liste des résultats
                                );

                                $related_query = new WP_Query($related_args);

                                if ($related_query->have_posts()) :
                                    while ($related_query->have_posts()) : $related_query->the_post();
                            ?>
                                    <div class="related_images">
                                        <?php if (has_post_thumbnail()): ?>
                                            <div class="hover_lightbox__container image-wrapper">
                                                <?php the_post_thumbnail('large'); ?>
                                                <div class="icons hover_lightbox__overlay overlay_hover">
                                                    <a href="<?php esc_url(get_permalink())?>" class="btn_hover_lightbox" id="open-article-icon">
                                                        <i class="fa-regular fa-eye"></i>
                                                    </a>
                                                    <button class="fullscreen-btn btn_hover_lightbox" id="fullscreen-icon">
                                                        <i class="fa-solid fa-expand"></i>
                                                    </button>          
                                                </div>
                                            </div>
                                        <?php endif; ?>
                                    </div>

                                <?php
                                    endwhile;
                                    wp_reset_postdata();
                                else :
                                    echo 'Aucune image supplémentaire trouvée.';
                                endif;
                                ?>
                        </div>
                </div>

            </article>

        <?php endwhile; ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
