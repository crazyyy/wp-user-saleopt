var $ = jQuery;

function CheckCustomer() {
  var data = {
    action: 'is_user_logged_in'
  };
  var result = jQuery.post(adminAjax.ajaxurl, data, function (response) { // console.log(response)
  });
  return result == 'yes' ? 'customer' : 'visitor';
}

function GetCustomerDisc() {
  var res = jQuery.ajax({
    url: adminAjax.ajaxurl,
    type: 'POST',
    dataType: "json",
    async: false,
    data: {
      action: 'cust_discount',
      id: adminAjax.postID
    },
    success: function success(obj) { // console.log(obj);
    }
  });
  return res.status == 200 ? res.responseJSON : 0;
}

function GetVisitorDisc() {
  var res = jQuery.ajax({
    url: adminAjax.ajaxurl,
    type: 'POST',
    dataType: "json",
    async: false,
    data: {
      action: 'vis_discount',
      id: adminAjax.postID
    },
    success: function success(obj) { // console.log(obj);
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
      action: 'global_discount'
    },
    success: function success(obj) {
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
      ShowModal("You are WINNER!! your discount ".concat(sale));
    }, 5000);
  }
}

function TrackUserActivity() {
  var key = 'visited_pages';
  var result = LSsave(key, adminAjax.postID); // console.log(result)
}

function isUserVisitedThisPage(id) {
  var key = 'visited_pages';
  var arrVisited = LSget(key);
  var result = arrVisited.includes(id); // console.log(result)

  return result;
}

function LSsave(key) {
  var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var data = [];
  var storageItems = JSON.parse(localStorage.getItem(key));
  console.log(storageItems);

  if (Array.isArray(storageItems)) {
    data = storageItems;
  }

  data.push(item);
  var uniq = [...new Set(data)];
  localStorage.setItem(key, JSON.stringify(uniq));
  var result = JSON.parse(localStorage.getItem(key));
  return result;
}

function LSget(key) {
  var data = JSON.parse(localStorage.getItem(key));
  var result = Array.isArray(data) ? data : [];
  return result;
}

if ($('body').hasClass('single-product')) {
  (async () => {

    let isNeedShowSale = await isUserVisitedThisPage(adminAjax.postID)

    let userstate = await CheckCustomer();

    let sale = userstate == 'customer' ?  GetCustomerDisc() : GetVisitorDisc()

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
function ShowModal(message) {
  $(".mask").addClass("active");
  $('.modal-container').html(message);
} // Function for close the Modal


function closeModal() {
  $(".mask").removeClass("active");
  $('.modal-container').html('');
} // Call the closeModal function on the clicks/keyboard


$(".close, .mask").on("click", function () {
  closeModal();
});
$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    closeModal();
  }
});
