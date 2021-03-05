// Route 
var rToGetCordinateVillage = "https://maps.googleapis.com/maps/api/geocode/json?address=Medan+Estate&key="+pathEbunga;
var rToCoverageArea = server + "account/seller/branch/coverage-area";
// Maps 
var mapProp = { center:new google.maps.LatLng(3.634085,98.7030042), zoom:12 };
var map = new google.maps.Map(document.getElementById("maps"),  mapProp);
// Vue Object 

// Inisialisasi 
$('#tblListCoverage').dataTable({
    "bLengthChange": false,
    "searching": false
});
axios.get(rToGetCordinateVillage).then(function (response) {
    // handle success
    // console.log(response);
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let myLatLng = { lat: lat, lng: lng };
    new google.maps.Marker({position: myLatLng, map, title: "Medan Estate"});
    // console.log(lat);
}).catch(function (error) {
    // handle error
    console.log(error);
});



document.querySelector('#btnEditCoverageArea').addEventListener('click', function(){
    renderPage(rToCoverageArea, 'Edit coverage area', '');
});