"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;

  var noop = function noop() {};

  var methods = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"];
  var length = methods.length;
  var console = window.console = window.console || {};

  while (length--) {
    method = methods[length]; // Only stub undefined methods.

    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

if (typeof jQuery === "undefined") {
  console.warn("jQuery hasn't loaded");
} else {
  console.log("jQuery " + jQuery.fn.jquery + " has loaded");
} // Place any jQuery/helper plugins in here.


var $ = jQuery;

function CheckCustomer() {
  var data = {
    action: 'is_user_logged_in'
  };
  var result = jQuery.post(adminAjax.ajaxurl, data, function (response) {// console.log(response)
  });
  return result == 'yes' ? 'customer' : 'visitor';
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
    success: function success(obj) {// console.log(obj);
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
    success: function success(obj) {// console.log(obj);
    }
  });
  return res.status == 200 ? res.responseJSON : 0;
}

function ShowSale(isNeedShowSale, sale) {
  if (isNeedShowSale) {
    // alert(`you sale is: ${sale}`)
    console.log("you sale is: ".concat(sale));
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
  _asyncToGenerator(function* () {
    var isNeedShowSale = yield isUserVisitedThisPage(adminAjax.postID);
    var userstate = yield CheckCustomer();
    var sale = userstate == 'customer' ? GetCustomerSale() : GetVisitorSale();
    yield ShowSale(isNeedShowSale, sale);
    yield TrackUserActivity();
  })();

  $(document).bind("mouseleave", function (e) {
    if (e.pageY - $(window).scrollTop() <= 1) {
      alert('Stop! Dont Go! Your sale is 3%');
    }
  });
}