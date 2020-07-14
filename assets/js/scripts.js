if (typeof jQuery === "undefined") {
  console.warn("jQuery hasn't loaded")
} else {
  console.log("jQuery " + jQuery.fn.jquery + " has loaded")
}
// Place any jQuery/helper plugins in here.
var $ = jQuery

function CheckCustomer() {
  var data = {
    action: 'is_user_logged_in'
  };

  var result = jQuery.post(adminAjax.ajaxurl, data, function (response) {
    // console.log(response)
  });
  return result == 'yes' ? 'customer' : 'visitor'
}


function GetCustomerSale() {
  var res = jQuery.ajax({
    url: adminAjax.ajaxurl,
    type: 'POST',
    dataType: "json",
    async: false,
    data: {
      action: 'customer_sale',
      id: adminAjax.postID
    },
    success: function (obj) {
      // console.log(obj);
    }
  });
  return res.status == 200 ? res.responseJSON : 0;

}

function GetVisitorSale() {
  var res = jQuery.ajax({
    url: adminAjax.ajaxurl,
    type: 'POST',
    dataType: "json",
    async: false,
    data: {
      action: 'visitor_sale',
      id: adminAjax.postID
    },
    success: function (obj) {
      // console.log(obj);
    }
  });
  return res.status == 200 ? res.responseJSON : 0;
}

function GetGlobalDiscount() {
  var res = jQuery.ajax({
    url: adminAjax.ajaxurl,
    type: 'POST',
    dataType: "json",
    async: false,
    data: {
      action: 'global_discount',
    },
    success: function (obj) {
      console.log(obj);
    }
  });
  return res.status == 200 ? res.responseJSON : 0;
}

function ShowSale(isNeedShowSale, sale) {
  if (isNeedShowSale) {
    // alert(`you sale is: ${sale}`)
    // console.log(`you sale is: ${sale}`)
    setTimeout(() => {
      ShowModal(`You are WINNER!! your discount ${sale}`)
    }, 5000);
    
  }

}


function TrackUserActivity() {
  const key = 'visited_pages';
  const result = LSsave(key, adminAjax.postID);
  // console.log(result)
}

function isUserVisitedThisPage(id) {
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

if ($('body').hasClass('single-product')) {

  (async () => {

    let isNeedShowSale = await isUserVisitedThisPage(adminAjax.postID)

    let userstate = await CheckCustomer();

    let sale = userstate == 'customer' ? GetCustomerSale() : GetVisitorSale()

    await ShowSale(isNeedShowSale, sale);

    await TrackUserActivity()

  })();


  const globalDiscount = GetGlobalDiscount();
  $(document).bind("mouseleave", function (e) {
    if (e.pageY - $(window).scrollTop() <= 1) {
      // alert('Stop! Dont Go! Your sale is 3%')
      ShowModal(`Please do not go!! we give you a gif with discount ${globalDiscount}%`)
    }
  });
}



// modal 
// Click function for show the Modal
function ShowModal(message) {
  $(".mask").addClass("active");
  $('.modal-container').html(message)
}

// Function for close the Modal
function closeModal(){
  $(".mask").removeClass("active");
  $('.modal-container').html('')
}
// Call the closeModal function on the clicks/keyboard
$(".close, .mask").on("click", function(){
  closeModal();
});

$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    closeModal();
  }
});