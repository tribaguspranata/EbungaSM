// Route
var rToDetailProduct = server + "product/detail/";
var rToCheckArea = server + "product/checkarea";
// Vue object 
var div_product_depan = new Vue({
    el : '#div_product_depan',
    data : {
        cap_div : 'Product of Ebunga'
    },
    methods : {
        detailAtc : function(idProduct)
        {
            document.querySelector('#txtLokasi').value = '';
            document.querySelector('#result-box').innerHTML = '';
            axios.get(rToDetailProduct+idProduct).then(function(res){
                let dataProduct = res.data.product;
                div_modal_product.title_modal = dataProduct.nama_produk;
                div_modal_product.deks_produk = dataProduct.deks_produk;
                div_modal_product.price = dataProduct.harga;
                div_modal_product.kd_produk = dataProduct.kd_produk;
                document.querySelector('#picMain').setAttribute("src", server+"ladun/ebunga_asset/image/product/"+dataProduct.foto_utama);
                $('#txtLokasi').focus();
            });
            
        }
    }
});
// Inisialisasi
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
$('#loaderLokasi').hide();
$('#txtTabelArea').hide();

// Function
