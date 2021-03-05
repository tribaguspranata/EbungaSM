// route 
var rToDetailsOrder = server + "account/seller/order/details/";
// vue object
var divOrderList = new Vue({
  el : '#divOrderList',
  data : {

  },
  methods : {
    detailsAtc : function(kdOrder)
    {
      renderPage(rToDetailsOrder+kdOrder, 'Order Details', '');
    }
  }
});
