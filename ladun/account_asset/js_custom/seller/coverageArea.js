// Route
var rToGetKabupaten = server + "get/location/kabupaten/";
var rToGetKecamatan = server + "get/location/kecamatan/";
var rToGetKelurahan = server + "get/location/kelurahan/";
var rToCekBranchLocation = server + "account/seller/branch/cek-branch-location/";
var rToCekLocationForMarker = server + "account/seller/branch/get-data-kelurahan-for-marker/";
var rToSaveCoverageLocation = server + "account/seller/branch/save-coverage-area";
var rToGetCoverageAreaOnload = server + "account/seller/branch/get-branch-coverage-area/";
var rToClearCoverageArea = server + "account/seller/branch/clear-coverage-area";

var dataKelurahan = [];
var kelurahanDipilih = [];
var markers = [];
// Vue Object 
var divAddCoverage = new Vue({
    el : '#divAddCoverage',
    data : {
        kabupaten : [],
        kecamatan : [],
        kelurahan : [],
        kelurahanDipilih : []
    },
    methods : {
        addKel : function(idKel)
        {
            let dataKelRec = idKel.split("-");
            let kdKel = dataKelRec[0];
            let namaKel = dataKelRec[1];
            /**
             * Check kelurahan if exist
             */
            let indexKelurahan = kelurahanDipilih.includes(kdKel);
            if(indexKelurahan === true){
              pesanUmumApp('warning', 'Area exist', 'Area is exist for branch');
            }else{
              kelurahanDipilih.push(kdKel);
              console.log(kelurahanDipilih);
              this.kelurahanDipilih.push({ nama : namaKel, idKel : kdKel});
              let cekArray = dataKelurahan.includes(kdKel);
              let letakKel = dataKelurahan.indexOf(kdKel);
              dataKelurahan.splice(letakKel, 1);
              this.kelurahan.splice(letakKel, 1);
              axios.get(rToCekLocationForMarker+kdKel).then(function(res){
                let namaKec = res.data.namaKec;
                let namaKel = res.data.namaKel;
                var rToGetCordinateVillage = "https://maps.googleapis.com/maps/api/geocode/json?address="+namaKel+"+"+namaKec+"&key="+pathEbunga;
                axios.get(rToGetCordinateVillage).then(function(res){
                  let lat = res.data.results[0].geometry.location.lat;
                  let lng = res.data.results[0].geometry.location.lng;
                  let myLatLng = { lat: lat, lng: lng };
                  let marker = new google.maps.Marker({ position: myLatLng, map, animation: google.maps.Animation.DROP, title: namaKel });
                  new google.maps.Circle({ radius: 40*40, center: myLatLng, map: map, fillColor: '#3498db', fillOpacity: 0.2, strokeColor: '#FF0000', strokeOpacity: 0.6 });
                  markers.push(marker);
                });
              });
            }
        },
        clearKelDipilih : function()
        {
          Swal.fire({
            title: "Clear area ...?",
            text: "Clear all covarage area ... ?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if(result.value) {
              axios.post(rToClearCoverageArea, {'idBranch':idBranch}).then(function(res){
                pesanUmumApp('success', 'Success', 'Coverage area cleared ..');
              });
              let cArrKelDipilih = this.kelurahanDipilih.length;
              var i;
              for(i = 0; i < cArrKelDipilih; i++){
                this.kelurahanDipilih.splice(0,1);
              }
              let cArrKel = this.kelurahan.length;
              var h;
              for(h = 0; h < cArrKel; h++){
                this.kelurahan.splice(0,1);
              }
              var rToGetCordinateVillage = "https://maps.googleapis.com/maps/api/geocode/json?address="+namaKel+"+"+namaKec+"&key="+pathEbunga;
              axios.get(rToGetCordinateVillage).then(function(res){
                let lat = res.data.results[0].geometry.location.lat;
                let lng = res.data.results[0].geometry.location.lng;
                var mapProp = { center:new google.maps.LatLng(lat,lng), zoom:13 };
                map = new google.maps.Map(document.getElementById("maps"), mapProp);  
              }); 
              document.querySelector('#txtCountry').selectedIndex = "0";
              document.querySelector('#txtProvinsi').selectedIndex = "0";
              $('#divKelurahan').hide();
            }
          });
          
        }
    }
});

// Inisialisasi 
$('#divProvinsi').hide();
$('#divKabupaten').hide();
$('#divKecamatan').hide();
$('#divKelurahan').hide();

axios.get(rToGetCoverageAreaOnload+idBranch).then(function(res){
  let dr = res.data;
  let dataCoverage = dr.dataCoverage;
  dataCoverage.forEach(renderCoverage);
  function renderCoverage(item, index){
    kelurahanDipilih.push(dataCoverage[index].kdKelurahan);
    divAddCoverage.kelurahanDipilih.push({
      nama : dataCoverage[index].namaKelurahan,
      idKel : dataCoverage[index].kdKelurahan,
      namaKec : dataCoverage[index].namaKecamatan,
      namaKab : dataCoverage[index].namaKabupaten 
    });
  }
});
var map;

axios.get(rToGetCordinateVillage).then(function(res){
  let lat = res.data.results[0].geometry.location.lat;
  let lng = res.data.results[0].geometry.location.lng;
  var mapProp = { center:new google.maps.LatLng(lat,lng), zoom:13 };
  map = new google.maps.Map(document.getElementById("maps"),  mapProp);
}); 

// Function 
function saveArea()
{
  let dataKelurahan = divAddCoverage.kelurahanDipilih;
  console.log(dataKelurahan);
  dataKelurahan.forEach(renderKelurahan);
  function renderKelurahan(item, index){
    let idKel = dataKelurahan[index].idKel;
    let dataSend = {'idKel':idKel, 'idBranch':idBranch}
    axios.post(rToSaveCoverageLocation, dataSend).then(function(res){
      document.querySelector('#txtCountry').selectedIndex = "0";
      document.querySelector('#txtProvinsi').selectedIndex = "0";
      $('#divKelurahan').hide();
    });
  }
  pesanUmumApp('success', 'Update', 'Coverage area are updated ..');
  let cArrKel = divAddCoverage.kelurahan.length;
  var h;
  for(h = 0; h < cArrKel; h++){
    divAddCoverage.kelurahan.splice(0,1);
  }
}

function countryPilih()
{
    let kdCountry = document.querySelector('#txtCountry').value;
    if(kdCountry === 'id'){
        $('#divKelurahan').hide();
        $('#divProvinsi').show();
    }else{

    }
}

function provinsiPilih()
{
    clearKabupaten();
    let kdProvinsi = document.querySelector('#txtProvinsi').value;
    getKabupaten(kdProvinsi);
    $('#divKabupaten').show();
}

function kabupatenPilih()
{
    clearKecamatan();
    let kdKabupaten = document.querySelector('#txtKabupaten').value;
    getKecamatan(kdKabupaten);
    $('#divKecamatan').show();
}


function kecamatanPilih()
{
    let kdKecamatan = document.querySelector('#txtKecamatan').value;
    $('#divProvinsi').hide();
    $('#divKabupaten').hide();
    $('#divKecamatan').hide();
    $('#divKelurahan').show();
    getKelurahan(kdKecamatan);
}


function getKabupaten(idProvinsi){
    $.get(rToGetKabupaten+idProvinsi, function(data){
      let kabupaten = data.kabupaten;
      kabupaten.forEach(renderKabupaten);
      function renderKabupaten(item, index){
        divAddCoverage.kabupaten.push({nama:kabupaten[index].nama, id_kab:kabupaten[index].id_kab});
      }
    });
}

function getKecamatan(idKabupaten)
{
  $.get(rToGetKecamatan+idKabupaten, function(data){
    let kecamatan = data.kecamatan;
    kecamatan.forEach(renderKecamatan);
    function renderKecamatan(item, index){
        divAddCoverage.kecamatan.push({nama:kecamatan[index].nama, id_kec:kecamatan[index].id_kec});
    }
  });
}

function getKelurahan(idKecamatan)
{
  $.get(rToGetKelurahan+idKecamatan, function(data){
    let kelurahan = data.kelurahan;
    kelurahan.forEach(renderKelurahan);
    function renderKelurahan(item, index){
        divAddCoverage.kelurahan.push({nama:kelurahan[index].nama, id_kel:kelurahan[index].id_kel});
        dataKelurahan.push(kelurahan[index].id_kel);
    }
  });
}


function clearKabupaten()
{
  let jlhItem = divAddCoverage.kabupaten.length;
  let i;
  for(i = 0; i < jlhItem; i++){
    divAddCoverage.kabupaten.splice(0,1);
  }
  clearKecamatan();
}


function clearKecamatan()
{
  let jlhItem = divAddCoverage.kecamatan.length;
  let i;
  for(i = 0; i < jlhItem; i++){
    divAddCoverage.kecamatan.splice(0,1);
  }
}