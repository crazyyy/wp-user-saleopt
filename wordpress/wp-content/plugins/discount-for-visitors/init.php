<?php
/**
* Plugin Name: Discount Plugin
* Plugin URI: https://github.com/crazyyy/wp-user-saleopt
* Description: T###
* Version: 1.0
* Author: Vitalii A.
* Author URI: https://github.com/crazyyy/
**/

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

// Path to this file.
if (!defined('S_PLUGIN_FILE')) {
  define('S_PLUGIN_FILE', __FILE__);
}

// Path to the plugin's directory.
if (!defined('S_DIRECTORY')) {
  define('S_DIRECTORY', dirname(__FILE__));
}

define('S_VERSION', '0.0.1');

// Load the actual plugin.
require S_DIRECTORY . '/incl/enq-style-and-js.php';
require S_DIRECTORY . '/incl/settings-page.php';
require S_DIRECTORY . '/incl/wpc-product-discount-opt.php';
require S_DIRECTORY . '/incl/wrap-modal-in-footer.php';
require S_DIRECTORY . '/incl/functions.php';