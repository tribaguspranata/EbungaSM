// Route 
var rToDashboard = server + "account/dashboard";

// Vue object 
var divUtama = new Vue({
    el : '#divUtama',
    data : {
        
    },
    methods : {
        dashboardAtc : function()
        {
            console.log("yushuu");
            renderPage(rToDashboard, 'Customer Dashboard', '');
        }
    }
});

var divBreadcumb = new Vue({
    el : '#divBreadcumb',
    data : {
        titleForm : 'Customer Dashboard'
    }
});
// Inisialisasi 
renderPage(rToDashboard, 'Customer Dashboard', '');

// Function
function renderPage(page, titleForm, subTitle){
    $('#divContainerUtama').html("");
    $('#loaderPage').show();
    setTimeout(function(){
        divBreadcumb.titleForm = titleForm;
        $('#divContainerUtama').load(page);
        $('#loaderPage').hide();
    }, 300);
    
}