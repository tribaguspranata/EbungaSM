// Route
var rToGetSubKategori = server + "get/sub-kategori/";
var rToAddMainProcuct = server + "account/seller/product/add/main-product";
var rToProductList = server + "account/seller/product/list";
var rToAddVariantProduct = server + "account/seller/product/add/variant";

// Vue object
var divProductList = new Vue({
    el: "#divProductList",
    data: {},
    methods: {
        detailProductAtc: function () {
            console.log("hang up ..");
        },
        tambahProductTampilAtc: function () {
            divBreadcumb.titleForm = "Add new product";
            $("#divProductList").hide();
            $("#divTambahProduct").show();
            document.querySelector("#txtProductName").focus();
            // $('.cropper-container').hide();
            $(".cropper-container").attr("width", "1500px");
        },
    },
});

var divTambahProduct = new Vue({
    el: "#divTambahProduct",
    data: {
        capTitleForm : 'Add new product',
        subKategori: [],
        productName : '',
        numVariant : 0,
        messageHelp : [
            {
                productName : '', kategori : '', subKategori : '', branch : '', deksripsi : '', price : '', stok : '', mainPhotos : '', minPic : ''
            } 
        ],
        stateSave : [
            { 
                productName : false, kategori : false, subKategori : false, branch : false, deksripsi : false, price : false, stok : false, mainPic : false, minPic : false
            }
        ]
    },
    methods: {
        backAtc: function () {
            divUtama.myProductAtc();
        },
    },
});

// Inisialisasi 
var deksProduct = document.getElementById("txtDeksripsiProduct");
var deksVar2 = document.getElementById("txtDeksVar2");
var deksVar3 = document.getElementById("txtDeksVar3");
var deksVar4 = document.getElementById("txtDeksVar4");
var fieldVar2 = false;
var fieldVar3 = false;
var fieldVar4 = false;

CKEDITOR.replace(deksProduct, {language:'id-gb'});
var edVar2 = CKEDITOR.replace(deksVar2, {language:'id-gb'});
var edVar3 = CKEDITOR.replace(deksVar3, {language:'id-gb'});
var edVar4 = CKEDITOR.replace(deksVar4, {language:'id-gb'});
CKEDITOR.config.allowedContent = true;
$('.cropme').simpleCropper();
$('#txtPrice').mask('000.000.000.000.000', {reverse: true});
$('#txtPriceVar2').mask('000.000.000.000.000', {reverse: true});
$('#txtPriceVar3').mask('000.000.000.000.000', {reverse: true});
$('#txtPriceVar4').mask('000.000.000.000.000', {reverse: true});

// Function
function cekVar2(){
    let namaVar = document.querySelector('#txtNamaVar2').value;
    let deksVar = CKEDITOR.instances['txtDeksVar2'].getData();
    let price = document.querySelector('#txtPriceVar2').value;
    let stock = document.querySelector('#txtStockVar2').value;
    let pic = $('#imgVar2 img').attr('src');
    if(pic === undefined){
        pesanUmumApp('warning', 'Choose pic ..', 'Please upload picture of this variant ...!!!');
        return false;
    }else{
        if(namaVar === '' || deksVar === '' || price === '' || stock === ''){
            pesanUmumApp('warning', 'Fill field ...!!!', 'Please fill all field ...!!!');
            return false;
        }else{
            return true;
        }
    }
    
}

function cekVar3(){
    let namaVar = document.querySelector('#txtNamaVar3').value;
    let deksVar = CKEDITOR.instances['txtDeksVar3'].getData();
    let price = document.querySelector('#txtPriceVar3').value;
    let stock = document.querySelector('#txtStockVar3').value;
    let pic = $('#imgVar3 img').attr('src');
    if(pic === undefined){
        pesanUmumApp('warning', 'Choose pic ..', 'Please upload picture of this variant ...!!!');
        return false;
    }else{
        if(namaVar === '' || deksVar === '' || price === '' || stock === ''){
            pesanUmumApp('warning', 'Fill field ...!!!', 'Please fill all field ...!!!');
            return false;
        }else{
            return true;
        }
    }
    
}

function cekVar4(){
    let namaVar = document.querySelector('#txtNamaVar4').value;
    let deksVar = CKEDITOR.instances['txtDeksVar4'].getData();
    let price = document.querySelector('#txtPriceVar4').value;
    let stock = document.querySelector('#txtStockVar4').value;
    let pic = $('#imgVar4 img').attr('src');
    if(pic === undefined){
        pesanUmumApp('warning', 'Choose pic ..', 'Please upload picture of this variant ...!!!');
        return false;
    }else{
        if(namaVar === '' || deksVar === '' || price === '' || stock === ''){
            pesanUmumApp('warning', 'Fill field ...!!!', 'Please fill all field ...!!!');
            return false;
        }else{
            return true;
        }
    }
}

document.querySelector('#btnSetVar2').addEventListener('click', function(){
    var cobaCekVar2 = cekVar2();
    if(cobaCekVar2 === false){
    
    }else{
        document.querySelector('#txtNamaVar2').setAttribute("disabled", "disabled");
        document.querySelector('#txtPriceVar2').setAttribute("disabled", "disabled");
        document.querySelector("#txtStockVar2").setAttribute("disabled", "disabled");
        let deksVar2 = CKEDITOR.instances['txtDeksVar2'].getData();
        document.querySelector('#capDeksVar2').innerHTML = deksVar2;
        edVar2.destroy();
        $('#txtDeksVar2').hide();
        $('#capDeksVar2').show();
        $('#btnSetVar2').hide();
        fieldVar2 = true;
    }
    
});


document.querySelector('#btnSetVar3').addEventListener('click', function(){
    var cobaCekVar3 = cekVar3();
    if(cobaCekVar3 === false){
    
    }else{
        document.querySelector('#txtNamaVar3').setAttribute("disabled", "disabled");
        document.querySelector('#txtPriceVar3').setAttribute("disabled", "disabled");
        document.querySelector("#txtStockVar3").setAttribute("disabled", "disabled");
        let deksVar3 = CKEDITOR.instances['txtDeksVar3'].getData();
        document.querySelector('#capDeksVar3').innerHTML = deksVar3;
        edVar3.destroy();
        $('#txtDeksVar3').hide();
        $('#capDeksVar3').show();
        $('#btnSetVar3').hide();
        fieldVar3 = true;
    }
    
});

document.querySelector('#btnSetVar4').addEventListener('click', function(){
    var cobaCekVar4 = cekVar4();
    if(cobaCekVar4 === false){
    
    }else{
        document.querySelector('#txtNamaVar4').setAttribute("disabled", "disabled");
        document.querySelector('#txtPriceVar4').setAttribute("disabled", "disabled");
        document.querySelector("#txtStockVar4").setAttribute("disabled", "disabled");
        let deksVar4 = CKEDITOR.instances['txtDeksVar4'].getData();
        document.querySelector('#capDeksVar4').innerHTML = deksVar4;
        edVar4.destroy();
        $('#txtDeksVar4').hide();
        $('#capDeksVar4').show();
        $('#btnSetVar4').hide();
        fieldVar4 = true;
    }
    
});

document.querySelector('#btnSubmitNewProduct').addEventListener('click', function(){
    let totalVar = 0;
    if(fieldVar2 === true){
        totalVar ++;
    }
    if(fieldVar3 === true){
        totalVar ++;
    }
    if(fieldVar4 === true){
        totalVar ++;
    }

    Swal.fire({
        title: "Confirm ... ?",
        text: "Submit a new product with "+ totalVar +" variant ... ?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if(result.value) {
            $('#conVariant').hide();
            $('#divLoading').show();
            $('#divBtnSaveProduct').hide();
            setTimeout(function(){
                /**
                 * Upload main product ... 
                 */
                let deksripsiProduk = CKEDITOR.instances['txtDeksripsiProduct'].getData();
                let productName = document.querySelector('#txtProductName').value;
                let kategori = document.querySelector('#txtKategori').value;
                let subKategori = document.querySelector('#txtSubKategori').value;
                let branch = document.querySelector('#txtBranch').value;
                let price = document.querySelector('#txtPrice').value;
                let stock = document.querySelector('#txtStock').value;
                let picUtama = $('#txtFotoUtama img').attr('src');
                let dataSend = {'deks':deksripsiProduk, 'nama':productName, 'kategori':kategori, 'subKategori':subKategori, 'branch':branch, 'price':price, 'stock':stock, 'picUtama':picUtama}
                axios.post(rToAddMainProcuct, dataSend).then(function(res){
                    let dr = res.data;
                    let kdProduct = dr.kdProduct;
                    if(dr.status === 'sukses'){
                        /**
                         * Waktunya upload variant produk
                         */
                        if(fieldVar2 === true){
                            let nama = document.querySelector('#txtNamaVar2').value;
                            let deks = document.querySelector('#capDeksVar2').innerHTML;
                            let harga = document.querySelector('#txtPriceVar2').value;
                            let stock = document.querySelector('#txtStockVar2').value;
                            let pic = $('#imgVar2 img').attr('src');
                            let dataSend = {'kdProduct':kdProduct, 'nama':nama, 'deks':deks, 'harga':harga, 'stock':stock, 'pic':pic}
                            // console.log(dataSend);
                            axios.post(rToAddVariantProduct, dataSend).then(function(res){});
                        }
                        if(fieldVar3 === true){
                            let nama = document.querySelector('#txtNamaVar3').value;
                            let deks = document.querySelector('#capDeksVar3').innerHTML;
                            let harga = document.querySelector('#txtPriceVar3').value;
                            let stock = document.querySelector('#txtStockVar3').value;
                            let pic = $('#imgVar3 img').attr('src');
                            let dataSend = {'kdProduct':kdProduct, 'nama':nama, 'deks':deks, 'harga':harga, 'stock':stock, 'pic':pic}
                            // console.log(dataSend);
                            axios.post(rToAddVariantProduct, dataSend).then(function(res){});
                        }
                        if(fieldVar4 === true){
                            let nama = document.querySelector('#txtNamaVar4').value;
                            let deks = document.querySelector('#capDeksVar4').innerHTML;
                            let harga = document.querySelector('#txtPriceVar4').value;
                            let stock = document.querySelector('#txtStockVar4').value;
                            let pic = $('#imgVar4 img').attr('src');
                            let dataSend = {'kdProduct':kdProduct, 'nama':nama, 'deks':deks, 'harga':harga, 'stock':stock, 'pic':pic}
                            // console.log(dataSend);
                            axios.post(rToAddVariantProduct, dataSend).then(function(res){});
                        }
                        pesanUmumApp('success', 'Success', 'Success add new product ...');
                        divUtama.myProductAtc();
                    }else{
                        pesanUmumApp('warning', 'Error', 'The product name already exists, please enter another product name');
                        $('#divDataProduct').show();
                        document.querySelector('#txtProductName').value = "";
                        document.querySelector('#txtProductName').focus();
                        $('#divBtnAddVariant').show();
                        $('#divLoading').hide();
                        $('#btnAddVariant').show();
                        $('#divBtnSaveProduct').hide();
                    }
                });
            }, 1500);
        }
    });
    
});

function addVariantAtc()
{
    let deksripsiProduk = CKEDITOR.instances['txtDeksripsiProduct'].getData();
    let productName = document.querySelector('#txtProductName').value;
    let kategori = document.querySelector('#txtKategori').value;
    let subKategori = document.querySelector('#txtSubKategori').value;
    let branch = document.querySelector('#txtBranch').value;
    let price = document.querySelector('#txtPrice').value;
    let stock = document.querySelector('#txtStock').value;
    let picUtama = $('#txtFotoUtama img').attr('src');
    let dataSend = {'name':productName, 'deks':deksripsiProduk, 'kategori':kategori, 'subKategori':subKategori, 'branch':branch, 'price':price, 'stock':stock, 'picUtama':picUtama}
    
    // if()
    if(productName === ''){
        divTambahProduct.messageHelp[0].productName = 'Please fill the field ...!!!';
        $('#helpProductName').show();
        divTambahProduct.stateSave[0].productName = false;
    }else{
        $('#helpProductName').hide();
        divTambahProduct.stateSave[0].productName = true;
    }

    if(kategori === 'none'){
        divTambahProduct.messageHelp[0].kategori = 'Choose kategory ...!!!';
        $('#helpKategori').show();
        divTambahProduct.stateSave[0].kategori = false;
    }else{
        divTambahProduct.stateSave[0].kategori = true;
        $('#helpKategori').hide();
    }

    if(subKategori === 'none'){
        divTambahProduct.messageHelp[0].subKategori = 'Choose sub-kategory ...!!!';
        $('#helpSubKategori').show();
        divTambahProduct.stateSave[0].subKategori = false;
    }else{
        divTambahProduct.stateSave[0].subKategori = true;
        $('#helpSubKategori').hide();
    }
    
    if(branch === 'none'){
        divTambahProduct.messageHelp[0].branch = 'Choose branch ...!!!';
        $('#helpBranch').show();
        divTambahProduct.stateSave[0].branch = false;
    }else{
        divTambahProduct.stateSave[0].branch = true;
        $('#helpBranch').hide();
    }

    if(picUtama === undefined){
        divTambahProduct.messageHelp[0].mainPhotos = 'Choose pic of main product ...!!!';
        $('#helpMainPhotos').show();
        divTambahProduct.stateSave[0].picUtama = false;
    }else{
        $('#helpMainPhotos').hide();
        divTambahProduct.stateSave[0].picUtama = true;
    }

    if(price === ''){
        divTambahProduct.messageHelp[0].price = 'Please fill the field ...!!!';
        $('#helpPrice').show();
        divTambahProduct.stateSave[0].price = false;
    }else{
        divTambahProduct.stateSave[0].price = true;
        $('#helpPrice').hide();
    }

    if(stock === ''){
        divTambahProduct.messageHelp[0].stok = 'Please fill the field ...!!!';
        $('#helpStok').show();
        divTambahProduct.stateSave[0].stok = false;
    }else{
        divTambahProduct.stateSave[0].stok = true;
        $('#helpStok').hide();
    }

    let stProductName = divTambahProduct.stateSave[0].productName;
    let stKategori = divTambahProduct.stateSave[0].kategori;
    let stSubKategori = divTambahProduct.stateSave[0].subKategori;
    let stBranch = divTambahProduct.stateSave[0].branch;
    let stPicUtama = divTambahProduct.stateSave[0].picUtama;
    let stPrice = divTambahProduct.stateSave[0].price;
    let stStock = divTambahProduct.stateSave[0].stok;

    if(stProductName === true && stKategori === true && stSubKategori === true && stBranch === true && stPicUtama === true && stPrice === true && stStock === true){
        $('#conVariant').show();
        $('#divDataProduct').hide();
        $('#divBtnAddVariant').hide();
        divTambahProduct.capTitleForm = "Add variant product";
        $('#btnAddVariant').hide();
        $('#btnSubmitNewProduct').show();
        $('#divBtnSaveProduct').show();
    }else{
       console.log("Not yet? ...");
    }
}

function submitProduct()
{
    
    
}

function kategoriPilih() {
    clearSubKategori();
    let kdKategori = document.querySelector("#txtKategori").value;
    $.get(rToGetSubKategori + kdKategori, function (data) {
        let subKategori = data.dataSubKategori;
        subKategori.forEach(renderSubKategori);
        function renderSubKategori(item, index) {
            divTambahProduct.subKategori.push({
                nama: subKategori[index].nama_kategori, idSubKategori : subKategori[index].kd_sub_kategori
            });
        }
    });
}

function clearSubKategori() {
    let jlhItem = divTambahProduct.subKategori.length;
    let i;
    for (i = 0; i < jlhItem; i++) {
        divTambahProduct.subKategori.splice(0, 1);
    }
}

function pesanUmumApp(icon, title, text)
{
  Swal.fire({
    icon : icon,
    title : title,
    text : text
  });
}