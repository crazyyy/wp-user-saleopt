// Avoid `console` errors in browsers that lack a console.
(function() {
  var method
  var noop = function() {}
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn"
  ]
  var length = methods.length
  var console = (window.console = window.console || {})

  while (length--) {
    method = methods[length]

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop
    }
  }
})()
if (typeof jQuery === "undefined") {
  console.warn("jQuery hasn't loaded")
} else {
  console.log("jQuery " + jQuery.fn.jquery + " has loaded")
}
// Place any jQuery/helper plugins in here.

var $ = jQuery

function CheckCustomer () {
  var data = {
    action: 'is_user_logged_in'
  };
  
  jQuery.post(adminAjax.ajaxurl, data, function(response) {
    if(response == 'yes') {
        // user is logged in, do your stuff here
        console.log('customer')
        return 'customer'
    } else {
        // user is not logged in, show login form here
        console.log('visitor')
        return 'visitor'
    }
  });
}


function GetCustomerSale() {
  var res = jQuery.ajax({ 
		url : adminAjax.ajaxurl,
		type : 'POST',
		dataType: "json",
		async: false,
		data : {
      action: 'customer_sale',
      id: adminAjax.postID
		},
		success: function(obj) {
      // console.log(obj);
		}
  });
  return res.status == 200 ? res.responseJSON : 0;

}

function GetVisitorSale() {
  var res = jQuery.ajax({ 
		url : adminAjax.ajaxurl,
		type : 'POST',
		dataType: "json",
		async: false,
		data : {
      action: 'visitor_sale',
      id: adminAjax.postID
		},
		success: function(obj) {
      // console.log(obj);
		}
  });
  return res.status == 200 ? res.responseJSON : 0;
}

if ($('body').hasClass('single-product')){
 
  // GetCustomerSale()
  // GetVisitorSale()
  console.log(GetCustomerSale())
  console.log(GetVisitorSale())


  (async () => {
    let customer = await CheckCustomer();
    console.log(customer)
  })();
}
