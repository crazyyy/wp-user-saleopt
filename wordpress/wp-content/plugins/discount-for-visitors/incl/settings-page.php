<?php
// create custom plugin settings menu
add_action('admin_menu', 'discount_plugin_create_menu');

function discount_plugin_create_menu() {
	//create new top-level menu
	add_menu_page('Discounts Settings', 'Discounts Settings', 'administrator', __FILE__, 'discount_plugin_settings_page' );
	//call register settings function
	add_action( 'admin_init', 'register_discount_plugin_settings' );
}


function register_discount_plugin_settings() {
	//register our settings
	register_setting( 'discount-plugin-settings-group', 'global-discount' );
}

function discount_plugin_settings_page() {
?>
<div class="wrap">
<h1>Discount Plugin</h1>

<form method="post" action="options.php">
    <?php settings_fields( 'discount-plugin-settings-group' ); ?>
    <?php do_settings_sections( 'discount-plugin-settings-group' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">New Discount</th>
        <td><input type="number" min="0" max="99" name="global-discount" value="<?php echo esc_attr( get_option('global-discount') ); ?>" /></td>
        </tr>
    </table>
    
    <?php submit_button(); ?>

</form>
</div>
<?php } ?>
