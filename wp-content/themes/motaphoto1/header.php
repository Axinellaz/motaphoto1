
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    
    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/7e77084640.js" crossorigin="anonymous"></script>


    <title>Motaphoto</title>
    <?php wp_head(); ?>
</head>
    
<body>
<header>

    <a class="logo__nav" href="<?php echo home_url( '/' ); ?>">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/logo-motaphoto.png" alt="Logo de Nathalie Mota">
    </a>

    <!-- Bouton burger -->
    <button class="burger-menu" aria-label="Menu" aria-expanded="false">
        <span class="burger-icon"></span>
        <span class="burger-icon"></span>
        <span class="burger-icon"></span>
    </button>
    
    <nav role="navigation" aria-label="<?php _e('Menu', 'text-domain'); ?>">
        <?php wp_nav_menu([ 
                'theme_location' => 'main',
                'container'      => false,
                'menu_id'        => 'menu-main-navigation'
                ]);
         ?>
    </nav>
</header>