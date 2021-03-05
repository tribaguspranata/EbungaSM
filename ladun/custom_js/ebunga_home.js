/**
 * Vue object
 */
var divProduct = new Vue({
    el : '#divProduct',
    data : {

    },
    methods : {
        switchProduct : function(btn)
        {
            $('.divProduct').hide();
            $('#divKategori'+btn).fadeIn(300);
            $('.active-btn').removeClass('active-btn');
            $('.btnProd'+btn).addClass('active-btn');
        }
    }
});

/**
 * Inisialisasi
 */
$('#divKategoriPapanBunga').hide();
$('#divKategoriParcel').hide();
$('#divKategoriCake').hide();
/**
 * Function
 */
