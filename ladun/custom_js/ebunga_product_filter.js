/**
 * Route
 */
var rToDefaultProduct = server + "rest/product/list/default";
var rToGetProductByKelurahan = server + "rest/product/getProductByKelurahan";
var rToGetForkDaerah = server + "get/location/fork/";
var rToGetKabupaten = server + "get/location/kabupaten/";
var rToGetKecamatan = server + "get/location/kecamatan/";
var rToGetKelurahan = server + "get/location/kelurahan/";
var kelurahanFinal = "";
/**
 * Vue object
 */
var divListProduk = new Vue({
  el : '#divListProduk',
  data : {
    provinsiData : [],
    kabupatenData : [],
    kecamatanData : [],
    kelurahanData : [],
    produk : [],
    kdKelurahanDipilih : ''
  },
  methods : {

  }
});

/**
 * Inisialisasi
 */
pesanUmumApp('info', 'Set delivery area first', 'Please set area to delivery ..');
$('#txtDaerah').focus();

$("#txtDaerah").select2({
    minimumInputLength: 4,
    allowClear: true,
    placeholder: 'masukkan nama kelurahan',
    ajax: {
        url: server + "get/location/kelurahan",
        type: "post",
        dataType: 'json',
        delay: 200,
        data: function (params) {
         return {
           searchTerm: params.term // search term
         };
        },
        processResults: function (response) {
          return { results: response };
        },
        cache: true
       }
}).on('select2:select', function (evt) {
    let kdKelurahan = $("#txtDaerah").val();
    divListProduk.kdKelurahanDipilih = kdKelurahan;
    searchKel(kdKelurahan);
    updateArea(kdKelurahan);
 });

/**
 * Function
 */
 function getKabupaten(idProvinsi)
 {
   divListProduk.kabupatenData.push({ nama : '--- Pilih kabupaten ---', id_kab : 'none' });
  axios.get(rToGetKabupaten+idProvinsi).then(function(res){
    let dr = res.data;
    let kabupaten = dr.kabupaten;
    kabupaten.forEach(renderKabupaten);

    function renderKabupaten(item, index){
      divListProduk.kabupatenData.push({ nama:kabupaten[index].nama, id_kab:kabupaten[index].id_kab });
    }
  });
}

function getKecamatan(idKabupaten)
{
  divListProduk.kecamatanData.push({ nama : '--- Pilih kecamatan ---', id_kec : 'none' });
  axios.get(rToGetKecamatan+idKabupaten).then(function(res){
    let dr = res.data;
    let kecamatan = dr.kecamatan;
    kecamatan.forEach(renderKecamatan);
    function renderKecamatan(item, index){
      divListProduk.kecamatanData.push({ nama:kecamatan[index].nama, id_kec:kecamatan[index].id_kec });
    }
  });
}

function getKelurahan(idKecamatan)
{
  divListProduk.kelurahanData.push({ nama : '--- Pilih kelurahan ---', id_kel : 'none' });
  axios.get(rToGetKelurahan+idKecamatan).then(function(res){
    let dr = res.data;
    let kelurahan = dr.kelurahan;
    kelurahan.forEach(renderKelurahan);
    function renderKelurahan(item, index){
      divListProduk.kelurahanData.push({ nama:kelurahan[index].nama, id_kel:kelurahan[index].id_kel });
    }
  });
}

 function updateArea(kdKelurahan)
 {
   clearProvinsi();
   clearKabupaten();
   clearKecamatan();
   clearKelurahan();
   axios.get(rToGetForkDaerah+kdKelurahan).then(function(res){
     let data = res.data;
     let kelurahan = data.dataKelurahan;
     let kecamatan = data.dataKecamatan;
     let kabupaten = data.dataKabupaten;
     let provinsi = data.dataProvinsi;
     let kelurahanAll = data.dataAllKelurahan;
     let kecamatanAll = data.dataAllKecamatan;
     let kabupatenAll = data.dataAllKabupaten;
     let provinsiAll = data.dataAllProvinsi;

     kelurahanAll.forEach(renderKelurahanAll);
     kecamatanAll.forEach(renderKecamatanAll);
     kabupatenAll.forEach(renderKabupatenAll);
     provinsiAll.forEach(renderProvinsiAll);

     function renderKelurahanAll(item, index){
       divListProduk.kelurahanData.push({ nama:kelurahanAll[index].nama, id_kel:kelurahanAll[index].id_kel });
     }
     function renderKecamatanAll(item, index){
       divListProduk.kecamatanData.push({ nama:kecamatanAll[index].nama, id_kec:kecamatanAll[index].id_kec });
     }
     function renderKabupatenAll(item, index){
       divListProduk.kabupatenData.push({ nama:kabupatenAll[index].nama, id_kab:kabupatenAll[index].id_kab });
     }
     function renderProvinsiAll(item, index)
     {
       divListProduk.provinsiData.push({ nama:provinsiAll[index].nama, id_prov:provinsiAll[index].id_prov });
     }
     setTimeout(function(){
       $('#txtKelurahan').val(kdKelurahan);
       $('#txtKecamatan').val(kecamatan.id_kec);
       $('#txtKabupaten').val(kabupaten.id_kab);
       $('#txtProvinsi').val(provinsi.id_prov);
     }, 500);
   });
 }

function provChange()
{
  let idProv = document.querySelector('#txtProvinsi').value;
  clearKabupaten();
  clearKecamatan();
  clearKelurahan();
  getKabupaten(idProv);
}

function kabChange()
{
  let idKab = document.querySelector('#txtKabupaten').value;
  clearKecamatan();
  clearKelurahan();
  getKecamatan(idKab);
}

function kecChange()
{
  let idKec = document.querySelector('#txtKecamatan').value;
  clearKelurahan();
  getKelurahan(idKec);
}

function kelChange()
{
  let idKel = document.querySelector('#txtKelurahan').value;
  searchKel(idKel);
}

function clearProvinsi()
{
  let pjg = divListProduk.provinsiData.length;
  let i;
  for(i = 0; i < pjg; i++){
    divListProduk.provinsiData.splice(0,1);
  }
}

function clearKabupaten()
{
  let pjg = divListProduk.kabupatenData.length;
  let i;
  for(i = 0; i < pjg; i++){
    divListProduk.kabupatenData.splice(0,1);
  }
}

function clearKecamatan()
{
  let pjg = divListProduk.kecamatanData.length;
  let i;
  for(i = 0; i < pjg; i++){
    divListProduk.kecamatanData.splice(0,1);
  }
}

function clearKelurahan()
{
  let pjg = divListProduk.kelurahanData.length;
  let i;
  for(i = 0; i < pjg; i++){
    divListProduk.kelurahanData.splice(0,1);
  }
}

function searchKel(kdKelurahan)
{
  clearProduk();
  $('#divLoading').show();
  // $('#divListProduk').hide();
  $('#divNoProduct').hide();
    var ds = {'kategori':kategori, 'kelurahan':kdKelurahan}
    axios.post(rToDefaultProduct, ds).then(function(res){
      let dr = res.data;
      let status = dr.status;
      if(status === 'no_product'){
        pesanUmumApp('warning', 'No product', 'No product available on area');
        $('#divSearchCoverage').hide();
        $('#divNoProduct').show();
      }else{
        axios.post(server+"update/kelurahan/order", ds).then(function(res){
          console.log(res.data);
        });
        $('#divNoProduct').hide();
        $('#divSearchCoverage').hide();
        let produk = dr.produk;
        produk.forEach(renderProduk);
        function renderProduk(item, index){
          divListProduk.produk.push({
            nama : produk[index].nama,
            kd_produk : produk[index].kd,
            kabupaten :produk[index].kabupaten,
            foto : produk[index].foto,
            harga : produk[index].harga,
            slug : produk[index].slug
          });
        }
      }
    });

    setTimeout(function(){
      $('#divShowProduct').show();
    }, 500);

    setTimeout(function(){
      $('#divLoading').hide();
    }, 500);

}


function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}

function clearProduk()
{
  let pjgArray = divListProduk.produk.length;
  var i;
  for(i = 0; i < pjgArray; i++)
  {
    divListProduk.produk.splice(0,1);
  }
}
