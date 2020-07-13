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
  
   var result = jQuery.post(adminAjax.ajaxurl, data, function(response) {
  // console.log(response)
  });
  return result == 'yes' ? 'customer' : 'visitor'
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

function ShowSale(isNeedShowSale, sale) {
  if (isNeedShowSale) {
    // alert(`you sale is: ${sale}`)
    console.log(`you sale is: ${sale}`)
  }
  
}




function TrackUserActivity() {
  const key = 'visited_pages';
  const result = LSsave(key, adminAjax.postID);
  // console.log(result)
}

function isUserVisitedThisPage(id){
  const key = 'visited_pages';
  const arrVisited = LSget(key); 
  const result = arrVisited.includes(id);
  // console.log(result)
  return result
}

function LSsave(key, item = 0) {
  let data = [];
  let storageItems = JSON.parse(localStorage.getItem(key))
  console.log(storageItems)
  if (Array.isArray(storageItems)) {
    data = storageItems
  }

  data.push(item)

  const uniq = [...new Set(data)];

  localStorage.setItem(key, JSON.stringify(uniq))

  const result = JSON.parse(localStorage.getItem(key))
  return result
}

function LSget(key) {
  const data = JSON.parse(localStorage.getItem(key))
  const result = Array.isArray(data) ? data : []
  return result
}

if ($('body').hasClass('single-product')){

  (async () => {
    
    let isNeedShowSale = await isUserVisitedThisPage(adminAjax.postID) 
    
    let userstate = await CheckCustomer();

    let sale = userstate == 'customer' ?   GetCustomerSale() : GetVisitorSale() 

    await ShowSale(isNeedShowSale, sale);

    await TrackUserActivity()

  })();

  $(document).bind("mouseleave", function(e) {
    if (e.pageY - $(window).scrollTop() <= 1) {    
      alert('Stop! Dont Go! Your sale is 3%')
    }
});
}


