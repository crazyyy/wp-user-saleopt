<?php 
// The code for displaying WooCommerce Product Custom Fields
add_action('woocommerce_product_options_general_product_data', 'woocommerce_product_custom_fields');
// Following code Saves  WooCommerce Product Custom Fields
add_action('woocommerce_process_product_meta', 'woocommerce_product_custom_fields_save');
function woocommerce_product_custom_fields()
{
  global $woocommerce, $post;
  echo '<div class="product_custom_field">';
  // Custom Product Text Field
  woocommerce_wp_text_input(
    array(
      'id' => '_custom_discount_customer',
      'placeholder' => 'Customer Discount',
      'label' => __('Customer Discount', 'woocommerce'),
      'type' => 'number',
      'custom_attributes' => array(
        'step' => 'any',
        'min' => '0'
      )
    )
  );
  //Custom Product Number Field
  woocommerce_wp_text_input(
    array(
      'id' => '_custom_discount_visitor',
      'placeholder' => 'Visitor Discount',
      'label' => __('Visitor Discount', 'woocommerce'),
      'type' => 'number',
      'custom_attributes' => array(
        'step' => 'any',
        'min' => '0'
      )
    )
  );
  echo '</div>';
}

function woocommerce_product_custom_fields_save($post_id)
{
  // Custom Product Text Field
  $woocommerce_custom_discount_customer = $_POST['_custom_discount_customer'];
  if (!empty($woocommerce_custom_discount_customer))
    update_post_meta($post_id, '_custom_discount_customer', esc_attr($woocommerce_custom_discount_customer));
  
    // Custom Product Number Field
  $woocommerce_custom_discount_visitor = $_POST['_custom_discount_visitor'];
  if (!empty($woocommerce_custom_discount_visitor))
    update_post_meta($post_id, '_custom_discount_visitor', esc_attr($woocommerce_custom_discount_visitor));
}