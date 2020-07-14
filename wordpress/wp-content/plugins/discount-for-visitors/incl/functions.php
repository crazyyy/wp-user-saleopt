<?php 

// check is user is customer or visitor
function ajax_check_user_logged_in()
{
  echo is_user_logged_in() ? 'yes' : 'no';
  die();
}
add_action('wp_ajax_is_user_logged_in', 'ajax_check_user_logged_in');
add_action('wp_ajax_nopriv_is_user_logged_in', 'ajax_check_user_logged_in');

// get discount for customers for this product
function ajax_get_customer_discount()
{
  global $woocommerce, $product, $post;
  $post_id = isset($_POST['id']) ? isset($_POST['id']) : "";
  $sale = get_post_meta($post_id, '_custom_discount_customer', true);
  $result = isset($sale) ? $sale : 0;
  wp_send_json($result);
  die();
}
add_action('wp_ajax_cust_discount', 'ajax_get_customer_discount');
add_action('wp_ajax_nopriv_cust_discount', 'ajax_get_customer_discount');


// get discount for visitors for this product
function ajax_get_visitor_discount()
{
  global $woocommerce, $product, $post;
  $post_id = isset($_POST['id']) ? isset($_POST['id']) : "";
  $sale = get_post_meta($post_id, '_custom_discount_visitor', true);
  $result = isset($sale) ? $sale : 0;
  wp_send_json($result);
  die();
}
add_action('wp_ajax_vis_discount', 'ajax_get_visitor_discount');
add_action('wp_ajax_nopriv_vis_discount', 'ajax_get_visitor_discount');



// get global exit discount 
function ajax_get_global_discount() {
  settings_fields( 'discount-plugin-settings-group' );
  do_settings_sections( 'discount-plugin-settings-group' ); 
  $discount = get_option('global-discount');
  $result = $discount ? $discount : 0; // TODO remove hard
  wp_send_json($result);
  die();
}
add_action('wp_ajax_global_discount', 'ajax_get_global_discount');
add_action('wp_ajax_nopriv_global_discount', 'ajax_get_global_discount');