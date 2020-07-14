<?php
// overall init 
// init js 
add_action('wp_enqueue_scripts', 'wpeHeaderScripts'); // Add Scripts to wp_head
function wpeHeaderScripts()
{
  global $wp_query;

  wp_register_script('wpeScripts', get_template_directory_uri() . '/js/scripts.js', array(), '1.0.0', true);
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
  wp_register_style('wpeasy-style', get_template_directory_uri() . '/css/modal.css', array(), '1.0', 'all');
  wp_enqueue_style('wpeasy-style'); // Enqueue it!
}


// PRODUCT INIT 

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
      'id' => '_custom_product_sale_customer',
      'placeholder' => 'Sale for customer',
      'label' => __('Sale for customer', 'woocommerce'),
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
      'id' => '_custom_product_returnet',
      'placeholder' => 'Sale fo noncustomer',
      'label' => __('Sale fo noncustomer', 'woocommerce'),
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
  $woocommerce_custom_product_sale_customer = $_POST['_custom_product_sale_customer'];
  if (!empty($woocommerce_custom_product_sale_customer))
    update_post_meta($post_id, '_custom_product_sale_customer', esc_attr($woocommerce_custom_product_sale_customer));
  // Custom Product Number Field
  $woocommerce_custom_product_returnet = $_POST['_custom_product_returnet'];
  if (!empty($woocommerce_custom_product_returnet))
    update_post_meta($post_id, '_custom_product_returnet', esc_attr($woocommerce_custom_product_returnet));
}




//  SETTINGS

class MySettingsPage
{
  /**
   * Holds the values to be used in the fields callbacks
   */
  private $options;
  /**
   * Start up
   */
  public function __construct()
  {
    add_action('admin_menu', array($this, 'add_plugin_page'));
    add_action('admin_init', array($this, 'page_init'));
  }
  /**
   * Add options page
   */
  public function add_plugin_page()
  {
    // This page will be under "Settings"
    add_options_page(
      'Settings Admin',
      'Salve Store Setting',
      'manage_options',
      'my-setting-admin',
      array($this, 'create_admin_page')
    );
  }
  /**
   * Options page callback
   */
  public function create_admin_page()
  {
    // Set class property
    $this->options = get_option('my_option_name');
?>
    <div class="wrap">
      <h1>My Settings</h1>
      <form method="post" action="options.php">
        <?php
        // This prints out all hidden setting fields
        settings_fields('my_option_group');
        do_settings_sections('my-setting-admin');
        submit_button();
        ?>
      </form>
    </div>
<?php
  }

  /**
   * Register and add settings
   */
  public function page_init()
  {
    register_setting(
      'my_option_group', // Option group
      'my_option_name', // Option name
      array($this, 'sanitize') // Sanitize
    );

    add_settings_section(
      'setting_section_id', // ID
      'My Custom Settings', // Title
      array($this, 'print_section_info'), // Callback
      'my-setting-admin' // Page
    );

    add_settings_field(
      'id_number', // ID
      'discount for leaving users', // Title 
      array($this, 'id_number_callback'), // Callback
      'my-setting-admin', // Page
      'setting_section_id' // Section           
    );
  }

  /**
   * Sanitize each setting field as needed
   *
   * @param array $input Contains all settings fields as array keys
   */
  public function sanitize($input)
  {
    $new_input = array();
    if (isset($input['id_number']))
      $new_input['id_number'] = absint($input['id_number']);

    return $new_input;
  }
  /** 
   * Print the Section text
   */
  public function print_section_info()
  {
    print 'Enter your settings below:';
  }

  /** 
   * Get the settings option array and print one of its values
   */
  public function id_number_callback()
  {
    printf(
      '<input type="text" id="id_number" name="my_option_name[id_number]" value="%s" />',
      isset($this->options['id_number']) ? esc_attr($this->options['id_number']) : ''
    );
  }
}

if (is_admin()) {
  $my_settings_page = new MySettingsPage();
}




/// ajax funct

function ajax_check_user_logged_in()
{
  echo is_user_logged_in() ? 'yes' : 'no';
  die();
}
add_action('wp_ajax_is_user_logged_in', 'ajax_check_user_logged_in');
add_action('wp_ajax_nopriv_is_user_logged_in', 'ajax_check_user_logged_in');

function ajax_get_product_sale_for_customer()
{
  global $woocommerce, $product;
  if (isset($_POST['id'])) {
    $post_id = intval($_POST['id']);
  } else {
    $post_id = "";
  }
  $sale = get_post_meta($post_id, '_custom_product_returnet', true);
  wp_send_json($sale);
  die();
}
add_action('wp_ajax_customer_sale', 'ajax_get_product_sale_for_customer');
add_action('wp_ajax_nopriv_customer_sale', 'ajax_get_product_sale_for_customer');


function ajax_get_product_sale_for_visitor()
{
  global $woocommerce, $product;
  if (isset($_POST['id'])) {
    $post_id = intval($_POST['id']);
  } else {
    $post_id = "";
  }
  $sale = get_post_meta($post_id, '_custom_product_sale_customer', true);
  wp_send_json($sale);
  die();
}
add_action('wp_ajax_visitor_sale', 'ajax_get_product_sale_for_visitor');
add_action('wp_ajax_nopriv_visitor_sale', 'ajax_get_product_sale_for_visitor');

function ajax_get_global_discount()
{
  $result =  get_option('id_number');
  wp_send_json($result);
  die();
}
add_action('wp_ajax_global_discount', 'ajax_get_global_discount');
add_action('wp_ajax_nopriv_global_discount', 'ajax_get_global_discount');
