// Route 
var rToGetProvinsi = server + "get/location/provinsi-all";
var rToGetKabupaten = server + "get/location/kabupaten/";
var rToGetKecamatan = server + "get/location/kecamatan/";
var rToGetKelurahan = server + "get/location/kelurahan/";
var rToApplyNewBranch = server + "account/seller/branch/apply-new-branch";
var rToDetailBranch = server + "account/seller/branch/detail/";
var r_to_get_provinsi = "";

// Vue object
var divBranch = new Vue({
    el : '#divBranch',
    data : {

    },
    methods : {
        tampilFormTambahAtc : function()
        {
            document.querySelector('#titlePanel').innerHTML = "Add new branch";
            document.querySelector('#divBranch').style.display = "none";
            $('#divTambahBranch').show();
            document.querySelector('#txtNameBranch').focus();
        },
        detailAtc : function(idBranch)
        {
            renderPage(rToDetailBranch+idBranch,'Detail Branch', '');
        }
    }
});

var divTambahBranch = new Vue({
  el : '#divTambahBranch',
  data : {
    provinsi : [],
    kabupaten : [],
    kecamatan : [],
    kelurahan : []
  },
  methods : {
    saveNewBranchAtc : function()
    {
      let nameBranch = document.querySelector('#txtNameBranch').value;
      let emailBranch = document.querySelector('#txtEmailBranch').value;
      let phoneBranch = document.querySelector('#txtPhoneBranch').value;
      let country = document.querySelector('#txtKdCountry').value;
      let provinsi = document.querySelector('#txtProvinsi').value;
      let kabupaten = document.querySelector('#txtKabupaten').value;
      let kecamatan = document.querySelector('#txtKecamatan').value;
      let kelurahan = document.querySelector('#txtKelurahan').value;
      if(nameBranch === '' || emailBranch === '' || phoneBranch === '' || country === 'none' || provinsi === 'none' || kabupaten === 'none' || kecamatan === 'none' || kelurahan === 'none'){
        pesanUmumApp('warning', 'Isi field!!!', 'Please fill the all field!!');
      }else{
        let dataSend = {'nameBranch':nameBranch, 'emailBranch':emailBranch, 'phoneBranch':phoneBranch, 'country':country, 'provinsi':provinsi, 'kabupaten':kabupaten, 'kecamatan':kecamatan, 'kelurahan':kelurahan}
        axios.post(rToApplyNewBranch, dataSend).then(function(res){
          let dr = res.data;
          if(dr.status === 'name_duplicate'){
            pesanUmumApp('warning', 'Name failed', 'Name of new branch is exist .. ');
          }else{
            pesanUmumApp('success', 'Success', 'New branch applied ...');
            divUtama.myBranchAtc();
          }
        });
      }
    }
  }
});

// Inisialisasi
$('#divTambahBranch').hide();
$('#txtRegionIndonesia').hide();
$('#txtRegionMalaysia').hide();


// Function
function checkCountry()
{
    let kdCountry = document.querySelector('#txtKdCountry').value;
    if(kdCountry === 'id'){
      $('#txtRegionIndonesia').show();
      $('#txtRegionMalaysia').hide();
      getProvinsi();
    }else if(kdCountry === 'my'){
      clearKabupaten();
      $('#txtRegionIndonesia').hide();
      $('#txtRegionMalaysia').show();
    }else{
      $('#txtRegionIndonesia').hide();
      $('#txtRegionMalaysia').hide();
    }
}

function getProvinsi()
{
  axios.get(rToGetProvinsi).then(function(res){
    let dr = res.data;
    let provinsi = dr.provinsi;
    provinsi.forEach(renderProvinsi);
    function renderProvinsi(item, index){
      divTambahBranch.provinsi.push({nama:provinsi[index].nama, id_prov:provinsi[index].id_prov});
    }
  });
}

function provinsiPilih()
{
  clearKabupaten();
  let idProvinsi = document.querySelector('#txtProvinsi').value;
  getKabupaten(idProvinsi);
}

function getKabupaten(idProvinsi){
  axios.get(rToGetKabupaten+idProvinsi).then(function(res){
    let dr = res.data;
    let kabupaten = dr.kabupaten;
    kabupaten.forEach(renderKabupaten);
    function renderKabupaten(item, index){
      divTambahBranch.kabupaten.push({nama:kabupaten[index].nama, id_kab:kabupaten[index].id_kab});
    }
  });
}

function kabupatenPilih()
{
  clearKecamatan();
  let idKabupaten = document.querySelector('#txtKabupaten').value;
  getKecamatan(idKabupaten);
}

function getKecamatan(idKabupaten)
{
  axios.get(rToGetKecamatan+idKabupaten).then(function(res){
    let dr = res.data;
    let kecamatan = dr.kecamatan;
    kecamatan.forEach(renderKecamatan);
    function renderKecamatan(item, index){
      divTambahBranch.kecamatan.push({nama:kecamatan[index].nama, id_kec:kecamatan[index].id_kec});
    }
  });
}

function kecamatanPilih()
{
  let idKecamatan = document.querySelector('#txtKecamatan').value;
  getKelurahan(idKecamatan);
}

function getKelurahan(idKecamatan)
{
  axios.get(rToGetKelurahan+idKecamatan).then(function(res){
    let dr = res.data;
    let kelurahan = dr.kelurahan;
    kelurahan.forEach(renderKelurahan);
    function renderKelurahan(item, index){
      divTambahBranch.kelurahan.push({nama:kelurahan[index].nama, id_kel:kelurahan[index].id_kel});
    }
  });
}

function clearKabupaten()
{
  let jlhItem = divTambahBranch.kabupaten.length;
  let i;
  for(i = 0; i < jlhItem; i++){
    divTambahBranch.kabupaten.splice(0,1);
  }
  clearKecamatan();
}

function clearKecamatan()
{
  let jlhItem = divTambahBranch.kecamatan.length;
  let i;
  for(i = 0; i < jlhItem; i++){
    divTambahBranch.kecamatan.splice(0,1);
  }
  clearKelurahan();
}

function clearKelurahan()
{
  let jlhItem = divTambahBranch.kelurahan.length;
  let i;
  for(i = 0; i < jlhItem; i++){
    divTambahBranch.kelurahan.splice(0,1);
  }
}