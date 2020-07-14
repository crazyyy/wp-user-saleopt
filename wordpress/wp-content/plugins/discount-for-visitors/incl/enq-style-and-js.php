<?php 

// init front js 
add_action('wp_enqueue_scripts', 'wpeHeaderScripts'); // Add Scripts to wp_head
function wpeHeaderScripts()
{
  global $wp_query;

  wp_register_script('wpeScripts',  plugins_url( '../assets/js/scripts.js', __FILE__ ), array(), '1.0.0', true);
  wp_enqueue_script('wpeScripts');
  wp_localize_script('wpeScripts', 'adminAjax', array(
    'ajaxurl' => admin_url('admin-ajax.php'),
    'templatePath' => get_template_directory_uri(),
    'posts_per_page' => get_option('posts_per_page'),
    'postID' => $wp_query->post->ID,
  ));
}

//  init front styles
add_action('wp_enqueue_scripts', 'wpeStyles'); // Add Theme Stylesheet
function wpeStyles()
{
  wp_register_style('wpeasy-style',  plugins_url( '../assets/css/modal.css', __FILE__ ), array(), '1.0', 'all');
  wp_enqueue_style('wpeasy-style'); // Enqueue it!
}
