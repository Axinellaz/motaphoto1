<?php
/*
Template Name: Single post Photo Evenement
*/
get_header();
?>


<div id="primary" class="content-area">
    <main id="main" class="site-main">

        <?php
        // Nouvelle boucle pour afficher une seule photo d'événement
        $args = array(
            'post_type' => 'photo', 
            'posts_per_page' => 1, 
        );
        
        $custom_query = new WP_Query($args);

        if ($custom_query->have_posts()) :
            while ($custom_query->have_posts()) : $custom_query->the_post();
                $post_id = get_the_ID();
        ?>
                <article id="post-<?php the_ID(); ?>" class="container_article"<?php post_class(); ?>>
                    <div class="entry-header_single_post">
                        
                        <div class="container_cpt_taxonomie_cf_single_post">
                        
                            <h2 class="entry-title"><?php the_title(); ?></h2>
                            <p>References : <?php the_field(  'references', $post_id ); ?></p>
                            <p> <?php the_terms( $post_id, 'categorie', 'Categorie : ' ); ?></p>
                            <p><?php the_terms( $post_id, 'format', 'Format : ' ); ?> </p>
                            <p>Type : <?php the_field(  'types', $post_id ); ?></p>
                            <p>Année : <?php echo get_the_date('Y', $post_id); ?> </p>
                        
                        </div>
                        
                       <div class="img_event">
                       
                            <?php
                            // Afficher la photo
                            if (has_post_thumbnail()) {
                                the_post_thumbnail('large');

                            }
                            ?>
                        </div>
                    </div>

                    <div class="entry-content">

                        <div class="items_container_entry_content">
                            <h3>Cette photo vous intéresse ?</h3>
                            <input type="submit" value="Contact">
                        </div>
                        <div class="container_arrow_nav">
                            <img id="before-image-<?php echo $post->ID; ?>"  src="<?php echo get_template_directory_uri(); ?>/assets/precedent.png" alt=" fleche de navigation. image précédente">
                            <img id="next-image-<?php echo $post->ID; ?>" src="<?php echo get_template_directory_uri(); ?>/assets/prochain.png" alt=" fleche de navigation. prochaine image">
                        </div>
                    </div>
                    <div class="entry-content_bottom_page">
                    
                        <h3>Vous aimerez aussi</h3>
                            <div class="container_images_same_categorie">
                            <?php
                                // Récupérer les termes de la taxonomie associée à l'image principale
                                $main_image_terms = wp_get_post_terms($post->ID, 'categorie', array("fields" => "slugs"));
            
                                // Requête pour récupérer les deux images supplémentaires dans la même catégorie
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
                                            
                                            <?php
                                            if (has_post_thumbnail()) {
                                                the_post_thumbnail('large');
                                            }
                                            ?>
                    
                                            </div>
                                        <?php
                                    endwhile;
                                    wp_reset_postdata();
                                else :
                                    // Aucune image supplémentaire trouvée
                                    echo 'Aucune image supplémentaire trouvée.';
                                endif;
                                ?>
                            </div>
                    </div>
                            
                    
                    </div>

                </article>
            <?php
            endwhile;
            wp_reset_postdata();
        else :
            // Aucune photo d'événement trouvée
            echo 'Aucune photo d\'événement trouvée.';
        endif;
        ?>

    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer() ?>