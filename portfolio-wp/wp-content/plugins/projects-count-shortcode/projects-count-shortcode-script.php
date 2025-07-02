<?php
/*
Plugin Name: Projects Count Shortcode
Plugin URI:
Description: Adds a shortcode to display the total number of Projects.
Version: 1.0
Author: Matin Meskinnavaz
Author URI: https://localhost/portfolio-wp/
License:
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Register the shortcode
function pcs_display_project_count() {
    $args = array(
        'post_type'      => 'project',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'fields'         => 'ids'
    );

    $query = new WP_Query($args);
    $count = $query->found_posts;

    return "<strong>Total Projects:</strong> $count";
}
add_shortcode('project_count', 'pcs_display_project_count');
