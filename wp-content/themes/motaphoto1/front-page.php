<?php get_header(); ?>

    <section class="banner" id="banner">
        <div id="hero" class="hero" style="background-image: url('<?php echo esc_url($random_photo_url); ?>');">
                <div class="hero-content">
                    <h1>
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/Header_title.png" alt="titre du site '">
                    </h1>
                    
                </div>
            </div>
    </section>
    <div id="primary" class="content-area">
        <main id="main_front_page" class="site-main">

        <div class="container_btns_select">
                <div class="btn_filtres">
                        <select class="btn-select-motaphoto" name="categories" id="categories-select">
                            <option value="">Catégories</option>
                            <?php
                            $categories = get_terms('categorie');
                            foreach ($categories as $category) {
                                echo '<option value="' . $category->term_id . '">' . $category->name . '</option>';
                            }
                            ?>
                        </select>
                        <select class="btn-select-motaphoto" name="formats" id="formats-select">
                            <option value="">Formats</option>
                            <?php
                            $formats = get_terms('format');
                            foreach ($formats as $format) {
                                echo '<option value="' . $format->term_id . '">' . $format->name . '</option>';
                            }
                            ?>
                        </select>
                </div>
                <div class="container_btn_select_data">
                
                    <select class="btn-select-motaphoto custom_select_date_btn" name="date" id="date-select">
                        <option value="">Trier par</option>
                        <option value="asc">Date la plus ancienne</option>
                        <option value="desc">Date la plus récente</option>
                    </select>
                </div>

            </div>

            <section class="all_items_photos" id="all_items_photos">
                <?php
                $args = array(
                    'post_type' => 'attachment',
                    'post_mime_type' => 'image',
                    'post_status' => 'inherit',
                    'posts_per_page' => -1,
                    'orderby' => 'date',
                    'order' => 'DESC' // Par défaut, triez par date de la plus récente à la plus ancienne
                );

                if (isset($_GET['date']) && $_GET['date'] === 'asc') {
                    $args['order'] = 'ASC'; // Si l'utilisateur sélectionne "Date la plus ancienne", triez par date de la plus ancienne à la plus récente
                }

                $attachments = get_posts($args);

              
                ?>
            </section>

            <div class="container_btn_load" >
                <button id="load-more-btn" data-action="load_more_images">Charger plus</button>
            </div>

            
        </main><!-- #main -->
    </div><!-- #primary -->

<?php get_footer(); ?>
