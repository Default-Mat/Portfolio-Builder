<?php
// Enqueue parent and child styles
add_action( 'wp_enqueue_scripts', function() {
    // Load parent style
    wp_enqueue_style( 'hello-elementor-parent', get_template_directory_uri() . '/style.css' );

    // Load child theme style
    wp_enqueue_style( 'hello-elementor-child', get_stylesheet_uri(), ['hello-elementor-parent'], wp_get_theme()->get('Version') );

    // Load custom CSS
    wp_enqueue_style( 'hello-elementor-custom', get_stylesheet_directory_uri() . '/custom.css', [], wp_get_theme()->get('Version') );
});
