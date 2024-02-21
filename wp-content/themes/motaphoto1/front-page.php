<?php
/*
Template Name: All photos event
*/
?>
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


        <div class="btn_filtres">

            <div class="btn_select_categories_formats">
                <select class="btn-select-motaphoto" name="categories" id="categories-select">
                    <option value="">Catégories</option>
                    <option value="reception">Réception</option>
                    <option value="mariage">Mariage</option>
                    <option value="concert">Concert</option>
                    <option value="television">Télevision</option>
                </select>

            
                <select class="btn-select-motaphoto" name="formats" id="formats-select">
                    <option value="">Formats</option>
                    <option value="paysage">Paysage</option>
                    <option value="portrait">Portrait</option>
                </select>
            </div>

            <select class="btn-select-motaphoto left-margin" name="date" id="date-select">
                <option value=""> Trier par </option>
                <option value="recentes"> à partir des plus récentes</option>
                <option value="ancienne">à partir des plus anciennes</option>
            </select>
        </div>

        <section class="all_items_photos" id="all_items_photos">
            <script>
                    
            </script>
        </section>

        <div class="container_btn_load" >
            <button id="load-more-btn" data-action="load_more_images">Charger plus</button>
        </div>

        
    </main><!-- #main -->
</div><!-- #primary -->

<?php get_footer(); ?>
