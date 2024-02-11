
    <footer class="site__footer">
        
        <?php get_template_part( 'templates_part/modale_contact' ); ?>
        <?php get_template_part( 'templates_part/modale_lightbox' ); ?>
        <?php wp_nav_menu([ 
                'theme_location' => 'footer-menu',
                'container'      => false 
                ]);
         ?>
        <?php wp_footer(); ?>
    </footer>
    
</body>
</html>