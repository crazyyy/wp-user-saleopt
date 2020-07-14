<?php 
// add modal container to template foorter
add_action('wp_footer', 'wpe_footer_html'); 
function wpe_footer_html() { 
    echo '<div class="mask" role="dialog"></div>
    <div class="modal" role="alert">
      <div class="modal-container"></div>
      <button class="close" role="button">X</button>
    </div>'; 
}
