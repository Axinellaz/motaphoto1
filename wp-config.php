<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link https://fr.wordpress.org/support/article/editing-wp-config-php/ Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @link https://fr.wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define( 'DB_NAME', 'motaphoto1' );

/** Utilisateur de la base de données MySQL. */
define( 'DB_USER', 'root' );

/** Mot de passe de la base de données MySQL. */
define( 'DB_PASSWORD', 'root' );

/** Adresse de l’hébergement MySQL. */
define( 'DB_HOST', 'localhost' );

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clés secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ' ~-b]3s&s9=Q{73zb`i{eSCC-}8`DvB8tq+9MU%Rf-LTBriURld!`!FAWS/yR!}s' );
define( 'SECURE_AUTH_KEY',  '~yDfIKXbprX:SvyAT+E{q%EZ.BSVO_*RcNA~|?2 l;Jy0,48>#j}3zBMY7JG,E@x' );
define( 'LOGGED_IN_KEY',    'v2{Lyt ]NsvU)F92cofJ}}rS,*+kZ[9 % A0#?yTMWZTFE,`<_`)xsZ~XaEG5h;U' );
define( 'NONCE_KEY',        'Fihz9jgqm3`t-ILCf6hpuJ^YZdt$!1b;{Cqi~56er>wQF}=WVU%mu2d,;~/<#wH;' );
define( 'AUTH_SALT',        '1C#Nd|3n]W(OwPj}=*^zw)ly#h*GQa<PO8kX8eLq=h>@v?`?|PX|vmh@,KS56HuI' );
define( 'SECURE_AUTH_SALT', 'Jxippu.%LV%uBVmp$ZPz4pb7NpgLl|xPc%V-x1%IBu!R qxjA(*r/:gq$(({2`<y' );
define( 'LOGGED_IN_SALT',   '$+eL%]7x|6~iltd?A{#~z>NO=~hkp=iV`0;suh6[c&28Wl&5pUySBG_0B+57AY*J' );
define( 'NONCE_SALT',       '#w`mf$oX9oZ;xDnCVpY9,18@&/f/_N(RcU_syP!5j!e*/Xdl?rO@7MS.(K[~i;_p' );
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix = 'wp_';

/**
 * Pour les développeurs et développeuses : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortement recommandé que les développeurs et développeuses d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d’information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur la documentation.
 *
 * @link https://fr.wordpress.org/support/article/debugging-in-wordpress/
 */
define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);

/* C’est tout, ne touchez pas à ce qui suit ! Bonne publication. */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');
