
<div id="contact" class="popup__overlay">
    <div class="popup__container-items">
        <img class="close__icone" src="<?php echo get_template_directory_uri() . '/assets/icone-close.png'; ?>" alt="">
        <div class="container_img-title-modale-contact">
            <img src="<?php echo get_template_directory_uri() . '/assets/modale-contact.png'; ?>" alt="">
        </div>
        <?php
            // On insère le formulaire de demandes de renseignements
          echo  do_shortcode('[contact-form-7 id="ec62281" title="MODALE CONTACT"]');
        ?>
    </div>
</div>

